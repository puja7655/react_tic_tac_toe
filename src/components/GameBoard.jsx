const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

// It is not advisable to mutate the original array in javascript
export default function GameBoard({ onSelectSquare, turns }) {

    let gameBoard = initialGameBoard;
    //here we are traversing through the turns which is array of object then destructuring it .
    // basically deriving the values to update the gameboard
    for (const turn of turns) {
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player
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
                                        <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
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