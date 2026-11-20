# How the app is supposed to behave

This is the rulebook that tests check against. The main rules:

- **Booking flow**: a user signs in, browses events, picks one and books tickets. Seats drop immediately, and a booking reference is created.
- **Reference code rule**: the first letter must match the event title’s first letter. “Tech Summit” gives a reference like `T-A3B2C1`.
- **Sandbox isolation**: each user sees only their own events and bookings. Trying to open someone else’s booking gives “Access Denied” (403).
- **Limits**: at most 6 user-created events and 9 bookings per account. When the limit is hit, the oldest one is deleted automatically.
- **Seeded events**: the pre-loaded events are shared by everyone and can’t be edited or deleted.
- **Refund check**: a single-ticket booking is refundable and a multi-ticket booking is not. The page shows a 4-second spinner first, and this logic lives only in the front end.
- **Price**: total price is the ticket price times the quantity.
- **Warning banners**: they appear when a user is near the sandbox limits.