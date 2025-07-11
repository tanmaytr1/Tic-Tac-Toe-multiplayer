# 🎮 Multiplayer Tic-Tac-Toe Game

A real-time, web-based multiplayer Tic-Tac-Toe game built using **Node.js** and **Socket.IO**. Players can connect, find an opponent, and play classic Tic-Tac-Toe in real-time!

---

## 🚀 Technologies Used

### Frontend:
- HTML5
- CSS3
- JavaScript (Vanilla)

### Backend:
- Node.js
- Express.js
- Socket.IO (for real-time bidirectional communication)

---

## ✨ Features

- 🔁 **Real-time Gameplay** – Player moves are instantly synced across both clients.
- 🤝 **Player Pairing** – Automatic matchmaking between two waiting players.
- 🔄 **Turn Management** – Indicates whose turn it is at all times.
- 🏆 **Win/Draw Detection** – Detects winners and draw scenarios automatically.
- 📱 **Responsive Design** – Works well across different screen sizes (assuming appropriate CSS).

---

## 🛠️ How to Run Locally

### 📦 Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js)

### ⚙️ Setup Instructions

```bash
# Clone the repository
git clone <your-repo-url>
cd multiplayer-tic-tac-toe
```

### OR manually create a folder and place the following files:
 - index.html
 - style.css
 - server.js (or app.js)
 - any assets like ZZ5H.gif

### Install dependencies
```bash
npm init -y   # Run this if package.json does not exist
npm install express socket.io
```

### Start the server
```bash
node server.js
```
✅ You should see: Listening on port 3000

Access the game
### Open your browser and go to:
```bash
http://localhost:3000
```
