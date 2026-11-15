# Exactspace Front End / UI Developer Internship Assignments

This repository contains two independent React applications built as part of the Front End / UI Developer internship assignment at Exactspace Technologies.

## Projects

| # | Project | Directory | Description |
|---|---------|-----------|-------------|
| 1 | Chat App | `chat-app/` | Single-page chat application with random usernames, like buttons, and Enter-to-send |
| 2 | Photo Gallery | `photo-gallery/` | One-column infinite-scroll photo gallery using the Picsum API with Font Awesome like icons |

Both apps are built with **ReactJS**, **Vite**, **JavaScript**, **HTML**, and **CSS**.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

---

## Project 1: Chat App

A clean, responsive single-page chat interface.

### Features

- Message input box with a **Send** button
- Press **Enter** to send messages (Shift+Enter for newline behavior is not needed — single-line input)
- Each message is assigned a **random username** from: Alan, Bob, Carol, Dean, Elin
- A **like button** on every message — each click increases the count by one
- Empty messages are prevented (button is disabled, Enter does nothing)
- Auto-scroll to the newest message
- Color-coded avatars based on the assigned username
- Fully responsive — works on desktop and mobile

### Setup

```bash
cd chat-app
npm install
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:5173`).

### Build

```bash
npm run build
```

---

## Project 2: Photo Gallery

A responsive, one-column photo gallery with infinite scrolling.

### Features

- Fetches photos from the **Picsum API** (`https://picsum.photos/v2/list?page=N`)
- Displays each photo using its `download_url`
- Shows the **author name** beside each photo
- **Font Awesome** thumbs-up icon next to every photo
- Every like count starts at **0** and increases on each click
- **Infinite scrolling** — automatically fetches the next page when the user reaches the bottom
- Stops fetching when an **empty page** is returned
- **Prevents duplicate requests** while loading (via a ref guard)
- Shows a **loading indicator** during fetches
- Handles **API errors** with a retry button
- Fully responsive

### Setup

```bash
cd photo-gallery
npm install
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:5173`).

### Build

```bash
npm run build
```

---

## Running Both Apps

Each app is independent with its own `package.json` and dependencies. Open two terminals:

```bash
# Terminal 1
cd chat-app
npm install
npm run dev

# Terminal 2
cd photo-gallery
npm install
npm run dev
```

---

## Tech Stack

- **React 18** — UI library
- **Vite** — build tool and dev server
- **JavaScript (JSX)** — no TypeScript
- **CSS** — plain CSS (no frameworks)
- **Font Awesome 6** (CDN) — thumbs-up icons in the photo gallery

## Project Structure

```
.
├── chat-app/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       └── index.css
├── photo-gallery/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       └── index.css
└── README.md
```

## License

This project is created for internship assignment submission at Exactspace Technologies.
