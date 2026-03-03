import Player from "./components/Player.jsx";
import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import GameRecords from "./components/GameRecord.jsx";
import { PAZU_COMBINATIONS } from "./pazu(w)_combinations.js";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function derivedGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function derivedWinner(gameBoard, playerName) {
  let winner = null;

  for (const combo of PAZU_COMBINATIONS) {
    const i = gameBoard[combo[0].row][combo[0].col];
    const j = gameBoard[combo[1].row][combo[1].col];
    const k = gameBoard[combo[2].row][combo[2].col];

    if (i && i === j && i === k) {
      winner = playerName[i];
    }
  }
  return winner;
}

function App() {
  const [playerName, setPlayerName] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = derivedActivePlayer(gameTurns);
  const gameBoard = derivedGameBoard(gameTurns);
  const winner = derivedWinner(gameBoard, playerName);
  const draw = gameTurns.length === 9 && !winner;

  function handleActivePlayer({ rowIndex, colIndex }) {
    setGameTurns((prevTurns) => {
      const activePlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: activePlayer,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  function handleRestart() {
    setGameTurns([]);
  }
  function handlePlayerName(symbol, newName) {
    setPlayerName((prevName) => {
      return {
        ...prevName,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <h1>React Tic-Tac-Toe</h1>
      <p className="sub-topic"> &copy; Prajwal</p>
      <div id="game-container">
        <ol id="players">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerName}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerName}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner ? winner : null} restart={handleRestart} />
        )}

        <GameBoard activePlayer={handleActivePlayer} board={gameBoard} />
      </div>

      <GameRecords turns={gameTurns} />
    </main>
  );
}

export default App;
