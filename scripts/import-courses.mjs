import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const sourceUrl =
  'https://courses.cs.northwestern.edu/394/guides/data/cs-courses-firestore.php';
const projectId = process.env.FIREBASE_PROJECT_ID;

if (!projectId) {
  throw new Error('Set FIREBASE_PROJECT_ID to your Firebase project ID.');
}

initializeApp({
  credential: applicationDefault(),
  projectId,
});

const isRecord = (value) =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const response = await fetch(sourceUrl);

if (!response.ok) {
  throw new Error(`Could not fetch course data: HTTP ${response.status}.`);
}

const data = await response.json();

if (!isRecord(data) || !isRecord(data.schedules)) {
  throw new Error('The course data source returned an invalid schedules object.');
}

const db = getFirestore();

for (const [scheduleId, schedule] of Object.entries(data.schedules)) {
  if (
    !isRecord(schedule) ||
    typeof schedule.title !== 'string' ||
    !isRecord(schedule.courses)
  ) {
    throw new Error(`Schedule "${scheduleId}" has an invalid format.`);
  }

  for (const [courseId, course] of Object.entries(schedule.courses)) {
    if (
      !isRecord(course) ||
      typeof course.term !== 'string' ||
      typeof course.number !== 'string' ||
      typeof course.meets !== 'string' ||
      typeof course.title !== 'string'
    ) {
      throw new Error(
        `Course "${courseId}" in schedule "${scheduleId}" has an invalid format.`,
      );
    }
  }

  await db.collection('schedules').doc(scheduleId).set({
    title: schedule.title,
    courses: schedule.courses,
  });

  console.log(`Imported schedule "${scheduleId}".`);
}
