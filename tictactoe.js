let board = Array(9).fill('');  
let currentPlayer = 'X';  
let isGameActive = true;   
const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');

// Winning combinations (rows, columns, and diagonals)
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to handle a player move
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] === '' && isGameActive) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWinner();
        switchPlayer();
    }
}

// Switches between 'X' and 'O' after each turn
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Checks if there's a winner or a draw
function checkWinner() {
    for (const [a, b, c] of winPatterns) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusDisplay.textContent = `${board[a]} Wins!`;
            isGameActive = false;
            return;
        }
    }

    if (board.includes('')) {
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    } else {
        statusDisplay.textContent = 'Draw!';
        isGameActive = false;
    }
}

// Reset the game
function resetGame() {
    board.fill('');
    isGameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}

// Add event listeners to each cell and reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initialize game status
statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
