import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/player"
import Log from "./components/Log"

function deriveActivePlayer(gameTurns) {
  let currentplayer = 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentplayer = 'O'
  }
  return currentplayer
}

function App() {

  const [gameTurns, setGameTurns] = useState([]) //gameTurns is array full of object whose intitial value is set to 0

  //  const [activePlayer, setActivePlayer] = useState('X')
  //Here I am removing the above state and trying to derive the activePlayer from gameTurns because we need the activePlayer from updateTurn
  const activePlayer = deriveActivePlayer(gameTurns)

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {


      //not setting player: activePlayer because that is from different state and hence we will not alwayes get the updated turns or latest turn
      //PrevTurn is array of object . we are taking the object at first place as that is the latest turn

      // let currentPlayer = 'X'
      // if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
      //   currentPlayer = 'O'
      // }

      //here i am deriving the current player and to minimize the duplication of code i have created a helper function
      let currentPlayer = deriveActivePlayer(prevTurns)

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
      <Log turns={gameTurns} />
    </main >
  )
}

export default App
