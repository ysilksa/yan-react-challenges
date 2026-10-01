export interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

export interface Schedule {
  title: string;
  courses: Record<string, Course>;
}

const COURSES_URL =
  'https://courses.cs.northwestern.edu/394/guides/data/cs-courses-firestore.php';

export const fetchSchedules = async (): Promise<Record<string, Schedule>> => {
  const response = await fetch(COURSES_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.status}`);
  }

  return response.json() as Promise<Record<string, Schedule>>;
};