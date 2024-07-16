# User Management Microservice

This project is a NestJS microservice for managing users, featuring CRUD operations, user blocking/unblocking, and search functionality with caching using Redis.

## How to Run

To start the service, use the following command:

```bash
docker-compose up --build
```

or if you are in mac

```bash
docker compose up --build
```

# Some assumptions and points
- Due to time constraints unable to add unit tests
- Normally JWTs are distributed after a login flow, here I simply have a route to generate JWT for a specific userID
- All the APIs are documented with swagger
- JWT Token is checked only with the Search route and blocking and unblocking route
- For Users CRUD route there is no authentication
