const express=require('express');
const socket=require('socket.io');
const http=require("http");
const {Chess}=require("chess.js");
const path=require('path');
const { title } = require('process');

const app=express();

const server=http.createServer(app);
const io=socket(server);

const chess=new Chess();
let players={};
let currentPlayer="W";

app.set('view engine',"ejs");
app.use(express.static(path.join(__dirname,"public")))

app.get('/',(req,res)=>{
    res.render("index",{title:"Chess Game"})
})


io.on("connection", (uniquesocket) => {
    console.log("Connected");

    if (!players.white) {
        players.white = uniquesocket.id;
        uniquesocket.emit("PlayerRole", "w");
    } else if (!players.black) {
        players.black = uniquesocket.id;
        uniquesocket.emit("PlayerRole", "b");
    } else {
        uniquesocket.emit("spectatorRole");
    }

    uniquesocket.on("disconnect", () => {
        if (uniquesocket.id === players.white) {
            delete players.white;
        } else if (uniquesocket.id === players.black) {
            delete players.black;
        }
    });

    uniquesocket.on("move", (move) => {
        try {
            // Validate that only the current player can make a move
            if (chess.turn() === "w" && uniquesocket.id !== players.white) return;
            if (chess.turn() === "b" && uniquesocket.id !== players.black) return;

            const result = chess.move(move);

            if (result) {
                // Emit the move to all clients
                io.emit("move", result); // Emit the move result, not just the move string
                io.emit("boardState", chess.fen()); // Send the updated FEN (board state) to all clients
            } else {
                console.log("Invalid Move:", move);
                uniquesocket.emit("Invalid Move", move);
            }
        } catch (error) {
            console.log(error);
            uniquesocket.emit("Invalid Move", move);
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


