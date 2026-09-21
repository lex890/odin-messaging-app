# Odin Messaging App 

A Fullstack Messaging App as one of the deliverables of The Odin Project.

## Core Requirements (must-have)
- [ ] **Auth** — register / login / logout, hashed passwords
- [ ] **Messaging** — send/receive messages between two users
- [ ] **Profile customization** — edit display name, avatar, bio
- [ ] **Deploy** to the web

## Real-Time Note (read this before overbuilding)
TOP explicitly says real-time methods (WebSockets, Socket.io, SSE) are **not taught and not expected**. A plain REST API is fine.

- "Live" updates = **polling**. Client re-fetches messages every few seconds via `setInterval` + `fetch` (or React Query / SWR with `refetchInterval`).
- No sockets. No pub/sub. No push infra. Don't build it.

## Data Model (minimum viable)

**User**
- id
- username
- email
- passwordHash
- displayName
- avatarUrl
- bio
- createdAt

**Message**
- id
- senderId
- recipientId
- content
- createdAt

*(Extra credit adds: `Friendship`, `GroupChat`, `GroupMessage`, `imageUrl` on Message — not yet.)*

## UI / Pages
- Login / Register
- Profile edit (display name, avatar, bio)
- Main chat view: sidebar (user list / conversations) + active conversation panel + message input

## Libraries (keep minimal)
- **Backend:** Express, Postgres/SQLite (Prisma) or PostgreSQL (supabase) + Prisma, Passport.js or JWT, bcrypt
- **Frontend:** EJS/Express views or React — whatever's comfortable
- **"Real-time":** plain `fetch` on an interval, no library required

## Build Order
1. Auth (register/login/logout)
2. Profile CRUD
3. Messaging (REST + polling)
4. Deploy (Render / Railway / Fly.io)
5. **Stop here.** Confirm it's deployed and working before touching anything below.

## Extra Credit (only after core is deployed)
- [ ] Images in chat
- [ ] Friends list + online status (or simpler: users list showing who's online)
- [ ] Group chats

## Guardrail
If a feature isn't in the checklists above, it's scope creep — skip it until core + deploy is done.