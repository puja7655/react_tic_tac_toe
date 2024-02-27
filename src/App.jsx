import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/player"

function App() {

  const [gameTurns, setGameTurns] = useState([]) //gameTurns is array full of object whose intitial value is set to 0
  const [activePlayer, setActivePlayer] = useState('X')
  
  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns((prevTurns) => {

      let currentPlayer = 'X'
      //not setting player: activePlayer because that is from different state and hence we will not alwayes get the updated turns or latest turn
      //PrevTurn is array of object . we are taking the object at first place as that is the latest turn
      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O'
      }

      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex
          },
          player: currentPlayer
        },
        ...prevTurns
      ]

      return updatedTurns
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
    </main >
  )
}

export default App
