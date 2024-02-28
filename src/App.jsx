import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./Winning-combinations"
import GameOver from "./components/GameOver"

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurns) {
  let currentplayer = 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentplayer = 'O'
  }
  return currentplayer
}

function deriveGameBoard(gameTurns) {
  // It is not advisable to mutate the original array in javascript so i am making a deep copy of that
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  //here we are traversing through the turns which is array of object then destructuring it .
  // i.e deriving the values to update the gameboard
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymboal = gameBoard[combination[0].row][combination[0].col]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col]

    if (firstSquareSymboal &&
      firstSquareSymboal === secondSquareSymbol &&
      firstSquareSymboal === thirdSquareSymbol) {
      winner = players[firstSquareSymboal];
    }
  }
  return winner;
}

function App() {

  const [gameTurns, setGameTurns] = useState([]) //gameTurns is array full of object whose intitial value is set to 0
  const [players, setPlayers] = useState(PLAYERS)
  //const [activePlayer, setActivePlayer] = useState('X')
  //Here I am removing the above state and trying to derive the activePlayer from gameTurns because we need the activePlayer from updateTurn
  const activePlayer = deriveActivePlayer(gameTurns)

  let gameBoard = deriveGameBoard(gameTurns)
  let winner = deriveWinner(gameBoard, players)

  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {


    /** not setting player: activePlayer because that is from different state and hence we will not alwayes get the updated turns or latest turn
      * PrevTurn is array of object . we are taking the object at first place as that is the latest turn
      * let currentPlayer = 'X'
      * if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
      * currentPlayer = 'O'}
     */

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

  function handleStart() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onNameChange={handlePlayerNameChange} />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onNameChange={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <p><GameOver winner={winner} onRematch={handleStart} /></p>}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main >
  )
}

export default App
