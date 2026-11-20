# Purpose: it’s a cheat sheet that teaches Claude how EventHub works.

## What it holds:

- **What the app is:** a site where users browse events like concerts, conferences and sports, book tickets, and manage their bookings. Each user works in their own sandbox with limits on how many events and bookings they can have.

- **The tech it’s built with:** `Next.js` for the front end, `Express.js` and `MySQL` for the back end, and `Playwright` for tests.

- **How the code is organised:** which folders hold the <u>pages, the business logic and the database access</u>.

- **The data:** what a User, Event and Booking contain. For example, a booking has a customer name, email, phone, a quantity of 1 to 10 tickets, and a unique reference code.

- Pointers to four other files, which Claude opens only when the task needs them:
    - **business-rules.md:** the rules and validation, such as “event dates must be in the future”.
    - **api-reference.md:** the back-end endpoints and their error codes.
    - **ui-selectors.md:** how to locate buttons and fields on the screen for test scripts.
    - **user-flows.md:** step-by-step user journeys and test data.

It’s marked `user-invocable: false`, so you don’t run it yourself. Claude reads it in the background as reference.