const highscore_table = document.getElementById("highscores_table");
const clear_score = document.getElementById("clear_highscores");
//event listener
clear_score.addEventListener('click', clearHighscores);
//loads score table
generateHighscoresTable()

function generateHighscoresTable () {
    let highScores = localStorage.getItem("scoreList");
    if (highScores) {
        addHighscoreTableRows (highScores);
    }
}

//table generation
function addHighscoreTableRows (highScores) {
    highScores = JSON.parse(highScores);

    highScores.forEach(function(scoreItem, index) {
        const userrank=createRank(index + 1);
        const userscore=createScore(scoreItem.score);
        const username=createName(scoreItem.name);
        const highScoreTableRow = createhighScore(userrank, userscore,username);
        highscore_table.appendChild(highScoreTableRow);
        
    });
}

function createuserRank(rank) {
    const userRank = document.createElement("td");
    userRank.textContent = '#${rank}';
    return userRank;
}

function createuserScore(score) {
    const userScore = document.createElement("td");
    userScore.textContent = score;
    return userScore;
}

function createuserName(name) {
    const userName = document.createElement("td");
    userName.textContent = name;
    return userName;
}

function createHighScoreTableRow(rank, score, name) {
    const tableRow = document.createElement('tr');
    tableRow.appendChild(rank);
    tableRow.appendChild(score);
    tableRow.appendChild(name);
    return tableRow;
}

function clearHighscores() {
    localStorage.setItem('scoreList', [] );
    while (highscore_table.children.length > 1) {
        highscore_table.removeChild(highscore_table.lastChild)
    }
}