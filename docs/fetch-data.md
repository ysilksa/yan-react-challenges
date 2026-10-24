# Loading course data

The app reads the `CS-2018-2019` schedule from the `schedules` collection in
Cloud Firestore. The client-side Firestore read is implemented in
`src/services/courses.ts` and used through the `useFirestoreSchedule` hook in
`src/utilities/fetch.ts`.

## Configure Firebase

Copy `.env.example` to `.env.local` and fill in the Firebase web app settings
from Firebase Console → Project settings → Your apps. These web configuration
values identify the Firebase project; they are not service-account credentials.
Do not put service-account keys in `VITE_` environment variables or commit them.

## Import the provided schedule

Enable Cloud Firestore for the selected Firebase project, then authenticate the
Firebase Admin SDK using Application Default Credentials or a service-account
file stored outside the repository. In PowerShell:

```powershell
$env:FIREBASE_PROJECT_ID = "your-project-id"
$env:GOOGLE_APPLICATION_CREDENTIALS = "C:\secure\path\to\service-account.json"
npm run import:courses
```

The importer downloads
`https://courses.cs.northwestern.edu/394/guides/data/cs-courses-firestore.php`,
validates its schedule and course data, and writes each schedule to
`schedules/{scheduleId}`. The course client reads public schedule data only;
Firestore rules deny client-side writes and access to all other collections.
