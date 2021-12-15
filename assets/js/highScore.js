const highscore_table = document.getElementById("highscores_table");
const clear_score = document.getElementById("clear_highscores");
//event listener
clear_score.addEventListener('click', clearHighscores);
//loads score table
generateHighscoresTable()

function generateHighscoresTable () {
    let highScores = localStorage.getItem("scoreList");
    if (highScores) {
        addHighscoresTableRows (highScores);
    }
}

//table generation
function addHighscoreTableRows (highScores) {
    highScores = JSON.parse(highScores);

    highScores.forEach(function(scoreItem, index) {
        const userrank=createRank(index + 1);
        const userscore=createScore(scoreItem.score);
        const username=createName(scoreItem.name);
        const highScore=createhighScore(userrank, userscore,username);
        highscore_table.appendChild(highScore);
        
    });
}

function createuserrank(rank) {
    const userrank = document.createElement("td");
    userrank.textContent = '#s{rank}';
    return userrank;
}

function createuserscore(score) {
    const userscore = document.createElement("td");
    userscore.textContent = score;
    return userscore;
}

function createusername(name) {
    const username = document.createElement("td");
    username.textContent = name;
    return username;
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
    while (highscore_table.children.lenth . 1) {
        highscore_table.removeChild(highscore_table.lastChild)
    }
}