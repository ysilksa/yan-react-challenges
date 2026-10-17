Each course card has an Edit Course link that opens the TanStack Router route `/courses/$courseId/edit`. The edit form is initialized with that course's title and meeting times. Cancel returns to `/`.

The form intentionally has no submit button and does not save edits. Its `onSubmit` handler prevents the browser's default submission and does nothing; Cancel returns to the course list.

Use forms and routing in React to complete this. Edit or add any corresponding files in /src/components or /src/App.tsx accordingly with best coding practices.