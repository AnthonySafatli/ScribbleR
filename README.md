# ScribbleR — Real-Time Collaborative Drawing & Chat in the Browser

![ScribbleR Screenshot](https://anthonysafatli.ca/projects/screenshots/scribbler.png)

> A modern, web-based reimagining of the classic Nintendo DS **PictoChat**, with real-time drawing, chatrooms, and a friends system, all running in the browser. Built from scratch as my first full-stack application.

🔗 **[Live Demo](https://scribbler.anthonysafatli.ca)**

🌐 **[More Information](https://anthonysafatli.ca/Project/scribbler)**

## Features

- **Real-time drawing & chat** — powered by SignalR; changes appear instantly for everyone in the room
- **Unlimited chatrooms** — join or create any room with an alphanumeric ID, no setup required
- **Persistent accounts** — sign up with email & username; your profile and friends carry across sessions
- **Friends system** — add friends for easy reconnection without sharing room codes
- **Fully containerized** — Docker-based deployment for consistent environments across dev and prod

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React |
| Backend | ASP.NET Core Web API |
| Real-time | SignalR |
| Database | PostgreSQL |
| Deployment | Docker, VPS |

*Note: the site was originally hosted using docker but this is no longer the case*

## Running Locally

```bash
# 1. Clone the repo
git clone https://github.com/AnthonySafatli/ScribbleR.git
cd scribbler

# 2. Start all services with Docker
docker compose up --build
```

The app will be available at `http://localhost:3000`.

**Environment variables required:**

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `ASPNETCORE_ENVIRONMENT` | `Development` or `Production` |

> Or just visit **[scribbler.anthonysafatli.ca](https://scribbler.anthonysafatli.ca)**, create an account, and enter any alphanumeric Room ID to start drawing.

## What I Learned

This was my first full-stack app — the goal was to touch every layer of the stack and ship something real.

- **SignalR connection lifecycle** — managing reconnections and dropped clients gracefully so the canvas stays in sync was trickier than expected; solved with connection event handlers and a server-side room state model
- **Drawing synchronization** — broadcasting raw mouse events was too noisy; throttling updates and only syncing deltas significantly reduced WebSocket traffic
- **Docker Compose for multi-service apps** — learned how networking between containers works (service names as hostnames) and how to sequence startup with `depends_on`
- **Cookie-based auth trade-offs** — chose cookies for simplicity on a first project, but learned why stateless JWT becomes important at scale (horizontal scaling, microservices)

## Roadmap

- [ ] **JWT Authentication** — replace cookie sessions for better scalability and security
- [ ] **Private rooms** — password-protected or invite-only rooms
- [ ] **Admin dashboard** — monitor active users, sessions, and rooms
- [ ] **Enhanced friends system** — friend requests, online status, direct room invites
- [ ] **Chatroom moderation** — owner controls, kick/ban, room settings

## License

[GNU GPL v3](LICENSE)
