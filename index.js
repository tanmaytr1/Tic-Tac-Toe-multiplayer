// Import required modules
const express = require('express');   // Web framework to serve files
const app = express();
const path = require('path');         // To handle file paths
const http = require('http');         // Core HTTP module

// Import and setup Socket.IO
const { Server } = require('socket.io');
const server = http.createServer(app);     // Create HTTP server from Express app
const io = new Server(server);             // Attach Socket.IO to server

// Serve static files (like index.html, JS, CSS) from the current directory
app.use(express.static(path.resolve("")));

// Arrays to manage players and games
let arr = [];            // Waiting players (queue)
let playingArray = [];   // Active games

// Handle new socket connection
io.on('connection', (socket) => {

  // Event: "find" → A player wants to find a match
  socket.on("find", (e) => {
    if (e.name != null) {
      // Add player name to waiting queue
      arr.push(e.name);
      console.log(arr);

      // If at least 2 players are waiting → start a new game
      if (arr.length >= 2) {
        // Define player 1
        let p1obj = {
          p1name: arr[0],  // First waiting player
          p1value: "X",    // Always X
          p1move: ""       // Last move position
        }

        // Define player 2
        let p2obj = {
          p2name: arr[1],  // Second waiting player
          p2value: "O",    // Always O
          p2move: ""       // Last move position
        }

        // Game object holding both players and turn counter
        let obj = {
          p1: p1obj,
          p2: p2obj,
          sum: 1           // Turn count (odd = X’s turn, even = O’s turn)
        }

        // Add this game to active games list
        playingArray.push(obj);

        // Remove these 2 players from waiting queue
        arr.splice(0, 2);

        // Notify all clients that a new game has started
        io.emit("find", { allPlayers: playingArray });
      }
    }
  });

  // Event: "playing" → A player makes a move
  socket.on("playing", (e) => {
    let objToChange;

    // If the move belongs to "X" player
    if (e.value == "X") {
      // Find the correct game where this player belongs
      objToChange = playingArray.find((game) => game.p1.p1name == e.name);
      if (objToChange) {
        objToChange.p1.p1move = e.id;   // Update last move
        objToChange.sum += 1;           // Increment turn counter
      }
    } 
    // If the move belongs to "O" player
    else if (e.value == "O") {
      objToChange = playingArray.find((game) => game.p2.p2name == e.name);
      if (objToChange) {
        objToChange.p2.p2move = e.id;   // Update last move
        objToChange.sum += 1;           // Increment turn counter
      }
    }

    // Broadcast updated game state to all clients
    io.emit("playing", { allPlayers: playingArray });
  });

});

// Serve the index.html file on root request
app.get('/', (req, res) => {
  return res.sendFile('index.html'); // Serve the game page
});

// Start server on port 3000
server.listen(3000, () => {
  console.log('Listening on port 3000');
});