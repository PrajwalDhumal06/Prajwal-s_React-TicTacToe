export default function GameOver({ winner, restart }) {
  return (
    <div id="game-over">
      <h2>GAME OVER!</h2>
      {winner && <p> {winner} Won!</p>}
      {!winner && (
        <p>
          {` "sabko X-O khelna toh atta hei hoga" `}
          <br></br>
          {`>.<`}{" "}
        </p>
      )}
      <button onClick={restart}> REMATCH </button>
    </div>
  );
}
