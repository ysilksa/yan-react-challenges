For the courses form, we are going to add form validation. We should have a type schema for course data using Zod and a validator function that is a resolver in the form. 

The course title must be at least two characters long, the term must be one of the strings of “Fall”, “Winter”, “Spring”, or “Summer”. The course number must be a string that is a number with an optional section number that is hyphenated to the course number. An example is “213” or “213-2”. The meeting time must be an empty string or a legal meeting time with one or more days and a non-empty timespan. The ending time cannot be earlier than the starting time. Examples of valid meeting times are “MWF 9:00-9:50” and  “TuTh 14:00-15:20”. 

Helpful messages should appear next to form fields with invalid data, ex. “Must contain days and start-end, ex. MWF 12:00-13:20” for invalid meeting times. 

Use best coding practices, and edit or add components in /src/ as you see fit. 

