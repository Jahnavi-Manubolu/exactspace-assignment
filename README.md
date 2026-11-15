
# Exactspace Front End / UI Developer Internship Assignments

This repository contains two independent React applications developed as part of the **Front End / UI Developer Internship Assignment at Exactspace Technologies**.

## Projects

| # | Project | Directory | Description |
|---|---------|-----------|-------------|
| 1 | Chat App | `chat-app/` | Single-page chat application with random usernames, like buttons, message editing, deletion, and Enter-to-send functionality. |
| 2 | Photo Gallery | `photo-gallery/` | Responsive, one-column infinite-scroll photo gallery using the Picsum API with like functionality. |

Both applications are developed using **ReactJS, Vite, JavaScript, HTML, and CSS**.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (included with Node.js)

---

# Project 1: Chat Application

A clean, responsive, single-page chat interface.

### Features

- Message input box with a Send button.
- Press Enter to send messages.
- Random usernames assigned from Alan, Bob, Carol, Dean, and Elin.
- Like button on every message with an incrementing count.
- Edit existing messages.
- Delete messages with confirmation.
- Prevents empty messages.
- Automatically scrolls to the newest message.
- Color-coded avatars based on usernames.
- Responsive design for desktop and mobile screens.

### Setup and Run

```bash
cd chat-app
npm install
npm run dev
```

Open the local URL displayed in the terminal.

### Production Build

```bash
npm run build
```

---

# Project 2: Photo Gallery

A responsive, one-column photo gallery featuring infinite scrolling.

### Features

- Fetches photos from the Picsum API.
- Displays images using their `download_url`.
- Displays author names alongside photos.
- Font Awesome thumbs-up icons.
- Like count starts at 0 and increases with every click.
- Infinite scrolling automatically loads the next page.
- Stops fetching when an empty page is returned.
- Prevents duplicate requests while loading using a ref guard.
- Displays a loading indicator during API requests.
- Handles API errors with a retry button.
- Responsive layout for different screen sizes.

### API Used

`https://picsum.photos/v2/list?page=N`

### Setup and Run

```bash
cd photo-gallery
npm install
npm run dev
```

Open the local URL displayed in the terminal.

### Production Build

```bash
npm run build
```

---

# Running Both Applications

Each application is independent and has its own `package.json` and dependencies.

Open two separate terminals:

**Terminal 1 – Chat Application**

```bash
cd chat-app
npm install
npm run dev
```

**Terminal 2 – Photo Gallery**

```bash
cd photo-gallery
npm install
npm run dev
```

---

# Application Screenshots

Screenshots of both applications and their implemented features are available in the `screenshots/` directory.

## 1. Chat Application

The following screenshots demonstrate the chat interface, message interactions, and implemented features.

| Screenshot | Preview |
|---|---|
| Chat App 1 | ![Chat App 1](screenshots/chat-app%201.jpeg) |
| Chat App 2 | ![Chat App 2](screenshots/chat-app%202.jpeg) |
| Chat App 3 | ![Chat App 3](screenshots/chat-app%203.jpeg) |
| Chat App 4 | ![Chat App 4](screenshots/chat-app%204.jpeg) |
| Chat App 5 | ![Chat App 5](screenshots/chat-app%205.jpeg) |
| Chat App 6 | ![Chat App 6](screenshots/chat-app%206.jpeg) |
| Chat App 7 | ![Chat App 7](screenshots/chat-app%207.jpeg) |
| Chat App 8 | ![Chat App 8](screenshots/chat-app%208.jpeg) |
| Chat App 9 | ![Chat App 9](screenshots/chat-app%209.jpeg) |
| Chat App 10 | ![Chat App 10](screenshots/chat-app%2010.jpeg) |
| Chat App 11 | ![Chat App 11](screenshots/chat-app%2011.jpeg) |
| Chat App 12 | ![Chat App 12](screenshots/chat-app%2012.jpeg) |
| Chat App 13 | ![Chat App 13](screenshots/chat-app%2013.jpeg) |
| Chat App 14 | ![Chat App 14](screenshots/chat-app%2014.jpeg) |

## 2. Photo Gallery

The following screenshots demonstrate the photo gallery, loaded images, infinite scrolling, and like functionality.

| Screenshot | Preview |
|---|---|
| Photo Gallery 1 | ![Photo Gallery 1](screenshots/photo-gallery%201.jpeg) |
| Photo Gallery 2 | ![Photo Gallery 2](screenshots/photo-gallery%202.jpeg) |
| Photo Gallery 3 | ![Photo Gallery 3](screenshots/photo-gallery%203.jpeg) |
| Photo Gallery 4 | ![Photo Gallery 4](screenshots/photo-gallery%204.jpeg) |
| Photo Gallery 5 | ![Photo Gallery 5](screenshots/photo-gallery%205.jpeg) |

---

# Tech Stack

- **React 18** – UI library
- **Vite** – Build tool and development server
- **JavaScript (JSX)** – Application logic
- **HTML5** – Structure
- **CSS3** – Styling and responsive design
- **Font Awesome 6** – Icons used in the Photo Gallery
- **Picsum API** – Photo data and images

---

# Project Structure

```text
exactspace-assignment/
│
├── chat-app/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── photo-gallery/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/
│   ├── chat-app 1.jpeg
│   ├── chat-app 2.jpeg
│   ├── ...
│   ├── chat-app 14.jpeg
│   ├── photo-gallery 1.jpeg
│   ├── photo-gallery 2.jpeg
│   ├── photo-gallery 3.jpeg
│   ├── photo-gallery 4.jpeg
│   └── photo-gallery 5.jpeg
│
└── README.md
```

---

## License

This project was developed for the **Exactspace Technologies Front End / UI Developer Internship Assignment**.
