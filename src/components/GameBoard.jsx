import { useState } from "react"

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

//updatedBoard contains the present state of the game board.we are doing the operation on a copied array 
//as it is not advisable to mutate the original array injavascript
export default function GameBoard({onSelectSquare,activePlayerSysmbol}) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard)

    const handleSelectSquare = (rowIndex, colIndex) => {
        setGameBoard((prevGameBoard) => {
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedBoard[rowIndex][colIndex] = activePlayerSysmbol;
            return updatedBoard
        })
        onSelectSquare();
    }
    return (
        <ol id="game-board">
            {
                gameBoard.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <ol>
                            {
                                row.map((playerSymbol, colIndex) => (
                                    <li key={colIndex}>
                                        <button onClick={()=>handleSelectSquare(rowIndex,colIndex)}>{playerSymbol}</button>
                                    </li>
                                ))
                            }
                        </ol>
                    </li>
                ))
            }
        </ol>
    )
}