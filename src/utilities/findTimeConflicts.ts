import type { Course } from './fetch';

interface FindTimeConflictsProps {
  selectedCourses: string[];
  allCourses: Record<string, Course>;
}

interface Meeting {
  days: Set<string>;
  start: number;
  end: number;
}

const DAY_TOKEN =
  /Monday|Mon|Tuesday|Tues|Tue|Wednesday|Wed|Thursday|Thurs|Thu|Friday|Fri|Saturday|Sat|Sunday|Sun|Tu|Th|Sa|Su|M|T|W|R|F|S|U/gi;

const DAY_CODES: Record<string, string> = {
  monday: 'M',
  mon: 'M',
  m: 'M',
  tuesday: 'Tu',
  tues: 'Tu',
  tue: 'Tu',
  tu: 'Tu',
  t: 'Tu',
  wednesday: 'W',
  wed: 'W',
  w: 'W',
  thursday: 'Th',
  thurs: 'Th',
  thu: 'Th',
  th: 'Th',
  r: 'Th',
  friday: 'F',
  fri: 'F',
  f: 'F',
  saturday: 'Sa',
  sat: 'Sa',
  sa: 'Sa',
  s: 'Sa',
  sunday: 'Su',
  sun: 'Su',
  su: 'Su',
  u: 'Su',
};

const MEETING_PATTERN =
  /^([A-Za-z,\s/]+?)\s+(\d{1,2}:\d{2}(?:\s*[AP]M)?)\s*[-–]\s*(\d{1,2}:\d{2}(?:\s*[AP]M)?)$/i;

const parseTime = (value: string, assumedPeriod?: string): number | null => {
  const match = /^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i.exec(value.trim());

  if (!match) {
    return null;
  }

  const hour = Number(match[1]);
  const minute = Number(match[2]);
  const period = (match[3] ?? assumedPeriod)?.toUpperCase();

  if (minute > 59) {
    return null;
  }

  if (period) {
    if (hour < 1 || hour > 12) {
      return null;
    }

    return (hour % 12) * 60 + minute + (period === 'PM' ? 12 * 60 : 0);
  }

  return hour <= 23 ? hour * 60 + minute : null;
};

const parseMeeting = (meets: string): Meeting | null => {
  const match = MEETING_PATTERN.exec(meets.trim());

  if (!match) {
    return null;
  }

  const dayString = match[1].replace(/[\s,/]/g, '');
  const tokens = dayString.match(DAY_TOKEN) ?? [];

  if (tokens.join('').toLowerCase() !== dayString.toLowerCase()) {
    return null;
  }

  const days = new Set(tokens.map((day) => DAY_CODES[day.toLowerCase()]));
  const startPeriod = /\s*(AM|PM)\s*$/i.exec(match[2])?.[1];
  const endPeriod = /\s*(AM|PM)\s*$/i.exec(match[3])?.[1];

  let start: number | null;
  let end: number | null;

  if (startPeriod && endPeriod) {
    start = parseTime(match[2]);
    end = parseTime(match[3]);
  } else if (startPeriod) {
    start = parseTime(match[2]);
    const candidates = ['AM', 'PM']
      .map((period) => parseTime(match[3], period))
      .filter((candidate): candidate is number => candidate !== null && candidate > (start ?? -1));
    end = candidates.sort((left, right) => left - right)[0] ?? null;
  } else if (endPeriod) {
    end = parseTime(match[3]);
    const candidates = ['AM', 'PM']
      .map((period) => parseTime(match[2], period))
      .filter((candidate): candidate is number => candidate !== null && candidate < (end ?? -1));
    start = candidates.sort((left, right) => right - left)[0] ?? null;
  } else {
    start = parseTime(match[2]);
    end = parseTime(match[3]);
  }

  if (start === null || end === null || start >= end) {
    return null;
  }

  return { days, start, end };
};

const checkTimeConflict = (course: Course, selectedCourse: Course): boolean => {
  if (
    course.term !== selectedCourse.term ||
    !course.meets.trim() ||
    !selectedCourse.meets.trim()
  ) {
    return false;
  }

  const courseMeeting = parseMeeting(course.meets);
  const selectedMeeting = parseMeeting(selectedCourse.meets);

  if (!courseMeeting || !selectedMeeting) {
    return false;
  }

  const sharesDay = [...courseMeeting.days].some((day) =>
    selectedMeeting.days.has(day),
  );
  const overlaps =
    courseMeeting.start < selectedMeeting.end &&
    selectedMeeting.start < courseMeeting.end;

  return sharesDay && overlaps;
};

export function findTimeConflicts({
  selectedCourses,
  allCourses,
}: FindTimeConflictsProps): string[] {
  const selected = selectedCourses.flatMap((key) => {
    const course = allCourses[key];
    return course ? [course] : [];
  });

  return Object.entries(allCourses)
    .filter(([key, course]) =>
      !selectedCourses.includes(key) &&
      selected.some((selectedCourse) => checkTimeConflict(course, selectedCourse)),
    )
    .map(([key]) => key);
}
