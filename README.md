# Tic Tac Toe

A simple Tic Tac Toe game built with Vue 3 and Vuetify.
Play against a basic AI that chooses moves randomly. The board size is configurable, and the game supports restarting and detecting wins/draws.

## 🎮 Features

- Select your pawn (X or O) before starting - pawns are configurable from the data (pawns array)..
- Play against a computer that makes random moves.
- Win detection for rows, columns, and diagonals.
- Detects draws when the board is full and no winner.
- Highlight winning cells.
- Restart game at the end.
- Responsive design and scalable board (3x3 by default, can be increased).

## 🛠 Technology Stack

- Vue 3 (Options API + TypeScript)
- Vuetify 3 for UI components
- TypeScript for type safety
## 🚀 Getting Started

- Clone the repository
- Install dependencies using your preferred package manager (yarn, npm, pnpm, or bun)
```bash
npm install 
```
- Start the development server with your package manager's dev command 
```bash
npm run dev 
```
- Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal)

## ⚙️ Usage

- Choose your pawn (X or O).
- Click on an empty cell to make your move.
- The computer will play after a short delay.
- The game highlights the winning cells when someone wins.
- Press Restart Game to play again.


## 🔧 Configuration

- Board size: Change the size prop in Home.vue to adjust the board size.
- Pawns: Player and computer pawns are defined in the data property (pawns), by default ['mdi-close', 'mdi-circle-outline']. You can replace them with other Material Design icons to customize the look of the pawns.
- AI speed: Adjust the setTimeout delay in computerPlay() to make the computer faster or slower.