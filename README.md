# chess-Game
This project implements a multiplayer Chess Game using Node.js, Socket.IO, and the Chess.js library for managing chess game logic. Below is an overview of the functionality and how the project is structured.

# Features
Real-time Multiplayer: Supports two players (White and Black) playing against each other in real-time.
Spectator Mode: Additional connections are assigned spectator roles and can view the game.
Valid Move Enforcement: Uses the Chess.js library to ensure only valid chess moves are allowed.
Persistent Game State: The game state is synchronized across all connected clients using Socket.IO.
Role Assignment: Dynamically assigns roles (White, Black, Spectator) based on connection order.

# Technologies Used
Node.js: Backend runtime environment.
Socket.IO: Real-time bidirectional communication for multiplayer functionality.
Chess.js: Handles chess game logic and validation.
EJS: Templating engine for rendering the UI.
Express: Web framework for handling HTTP requests.
HTML/CSS/JS: Frontend for user interface

# Project Structure
.
├── public/
│   └── Static assets (e.g., CSS, JS for the frontend)
├── views/
│   └── index.ejs (HTML template for the game interface)
├── app.js (Main server-side code)
├── package.json (Dependencies and scripts)

