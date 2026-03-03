import { useState } from "react";
export default function Player({ name, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setEditing] = useState(false);
  function handleEdit() {
    setEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }
  function nameChange(event) {
    setPlayerName(event.target.value);
  }
  return (
    <li id="players" className="highlight-player">
      <li className={isActive ? "active" : undefined}>
        <span>
          {isEditing ? (
            <input
              type="text"
              required
              value={playerName}
              onChange={nameChange}
            />
          ) : (
            <span className="player-name"> {playerName} </span>
          )}
        </span>
        <span>
          <span className="player-symbol"> {symbol} </span>
        </span>
        <li>
          <button onClick={handleEdit}>{isEditing ? "SAVE" : "Edit"} </button>
        </li>
      </li>
    </li>
  );
}
