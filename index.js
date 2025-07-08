const express = require('express');
const app = express();
const path = require('path');
const http = require('http');

const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server); // Initialize socket.io

app.use(express.static(path.resolve("")));

let arr = [];
let playingArray = [];

io.on('connection', (socket) => {
  socket.on("find",(e)=>{
    if(e.name != null){

      arr.push(e.name);
      console.log(arr);
      
      if(arr.length >= 2){
        let p1obj = {
          p1name: arr[0],
          p1value: "X",
          p1move: ""
        }
        let p2obj = {
          p2name: arr[1],
          p2value: "O",
          p2move: ""
        }

        let obj = {
          p1: p1obj,
          p2: p2obj,
          sum: 1
        }
        playingArray.push(obj);
        arr.splice(0,2);
        io.emit("find", {allPlayers : playingArray});
      }
    }
  })

  socket.on("playing", (e) => {
    let objToChange;
  
    if (e.value == "X") {
      objToChange = playingArray.find((game) => game.p1.p1name == e.name);
      if (objToChange) {
        objToChange.p1.p1move = e.id;
        objToChange.sum += 1;
      }
    } else if (e.value == "O") {
      objToChange = playingArray.find((game) => game.p2.p2name == e.name);
      if (objToChange) {
        objToChange.p2.p2move = e.id;
        objToChange.sum += 1;
      }
    }
  
    io.emit("playing", { allPlayers: playingArray });
  });
  
  
})




app.get('/', (req, res) => {
  return res.sendFile('index.html'); // Corrected file serving method
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
