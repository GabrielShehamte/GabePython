// Fun coding project making the infamous game 2048!! Taught by Kenny Yip Coding via Youtube - With my own edits and modifications

//Initialize all variables at the top to keep the code clean
var board;
var score = 0;
var rows = 4;
var columns = 4;
var gameOver = false;
var topScores = []

window.onload = function () {
    setGame();

    document.getElementById("restart").addEventListener("click", function (){
        restartGame();
    });
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    for (let r = 0; r < rows; r++) { //looping through the rows
        for (let c = 0; c < columns; c++) { // looping through the columns
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}
function hasEmptyTile() {// simply checks if there is any space on the board
    for (r = 0; r < rows; r++) {
        for (c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
}

function setTwo() {
    if (gameOver) {
        return true;

    }
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            numbGenerator(r, c);
            // board[r][c] = 2;

            //Enter the code in between here to randomize whether a 2 or 4 is spawned into the game

            // let randomNum = Math.random();
            // if (score >= 1000) {
            //     if (randomNum <= 0.5) {
            //         baord[r][c] = 2;
            //     } else if (randomNum > 0.5 && randomNum < 0.85) {
            //         board[r][c] = 4;
            //     } else {
            //         board[r][c] = 8;
            //     }
            // } else if (score >= 500) {
            //     if (randomNum < 0.75) {
            //         board[r][c] = 2;
            //     } else {
            //         board[r][c] = 4;
            //     }
            // } else {
            //     board[r][c] = 2;
            // }

            //End of section for randomizer
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            // tile.innerText = "2"
            // tile.classList.add("x2");
            updateTile(tile, board[r][c]);
            found = true;
        }

    }
}
function numbGenerator(r, c) {
    let randomNum = Math.random();
    if (score >= 1000) {
        if (randomNum <= 0.5) {
            baord[r][c] = 2;
        } else if (randomNum > 0.5 && randomNum < 0.85) {
            board[r][c] = 4;
        } else {
            board[r][c] = 8;
        }
    } else if (score >= 500) {
        if (randomNum < 0.75) {
            board[r][c] = 2;
        } else {
            board[r][c] = 4;
        }
    } else {
        board[r][c] = 2;
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the classlist tile x2 x4 x8
    tile.classList.add('tile');
    if (num > 0) {
        tile.innerText = num;
        if (num <= 1024) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x2048");
        }
    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    } else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();

    } else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();
    } else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
    checkGameOver();
    //setTwo();
})

function filterZero(row) {
    return row.filter(num => num != 0); // creates a new array without zeroes
}
function slide(row) {
    row = filterZero(row);

    for (let i = 0; i < row.length; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2 // doubling the value to the right by combining the two blocks
            row[i + 1] = 0;
            score += row[i];
        }
        if (row[i] == 2048) {
            gameOver = true;
            alert("Congrats You Won!!");
        }
    }
    row = filterZero(row);
    while (row.length < columns) {
        row.push(0)
    }
    return row;
}



function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c]
            updateTile(tile, num);
        }

    }
    // document.getElementById("score").innerText = score;
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c]
            updateTile(tile, num);
        }

    }
    // document.getElementById("score").innerText = score;
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < columns; r++) {
            board[r][c] = row[r]
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c]
            updateTile(tile, num);
        }
    }
}
function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < columns; r++) {
            board[r][c] = row[r]
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c]
            updateTile(tile, num);
        }
    }
}

function checkGameOver() {
    if (!hasEmptyTile()) {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                if (c < columns - 1 && board[r][c] == board[r][c + 1]) {
                    return;
                }
                if (r < rows - 1 && board[r][c] == board[r + 1][c]) {
                    return;
                }
            }
        }
        gameOver = true;
        alert("GameOver you lose!")
    }
}


//Implement the topscore function along with the function to update it

function updateTopScores(newScore) {
    let position = topScores.findIndex(score => newScore > score);

    if(position != -1){
        topScores.splice(position,0, newScore)
    }else if(top.Scores.length() < 5){
        topScores.push(newScore);
    }

    if(topScores.length() > 5){
        topScores.pop();
    }

    displayTopScores();
    // topScores.push(newScore);
    // topScores.sort((a, b) => b - a)//checks the scores and places them in order of highest to lowest
    // if (topScores.length > 5) {
    //     topScores.pop // I don't think this does what i want it to do and will need to check it out
    // }
}

function displayTopScores() {
    let scoreBoard = document.getElementById("highscore");
    scoreBoard.innerHTML = "<h3>LeaderBoard</h3>"
    topScores.forEach((score,index)=>{
        let scoreElement = document.createElement("div");
        scoreElement.innerText = (index +1)+". " + score;
        scoreBoard.appendChild(scoreElement);
    });

    // if (!scoreBoard) {
    //     scoreBoard = document.createElement("div");
    //     scoreBoard.id = "top-Scores";
    //     document.body.appendChild(score)

    // }
}

function restartGame(){

    score = 0;
    gameOver = false;
    document.getElementById("board").innerHTML = ""; // This line clears the gameboard
    document.getElementById("score").innerText = score; // this line resets the current games score.
    setGame();
}