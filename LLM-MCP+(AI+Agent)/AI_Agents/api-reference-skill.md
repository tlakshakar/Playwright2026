# The backend Components

This lists the requests the app’s server accepts, which matters for API testing and for setting up test data quickly. It covers:

- **Auth**: register, log in, and check who you are.
- **Events**: list, view, create, edit and delete.
- **Bookings**: list, view, create, cancel one, or clear all.
- **Error table**: what the server should return in each failure case. For example, a wrong password gives 401, a duplicate email gives 409, and booking more seats than are available gives 400.