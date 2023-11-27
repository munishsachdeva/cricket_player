const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('Cricket_Player'))
// Sample data (you can replace this with a database)
let players = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/addPlayer', (req, res) => {
    const player = {
        name: req.body.name,
        dob: req.body.dob,
        photoUrl: req.body.photoUrl,
        birthplace: req.body.birthplace,
        career: req.body.career,
        matches: req.body.matches,
        score: req.body.score,
        fifties: req.body.fifties,
        centuries: req.body.centuries,
        wickets: req.body.wickets,
        average: req.body.average,
    };

    players.push(player);
    res.redirect('/');
});

app.post('/searchPlayer', (req, res) => {
    const playerName = req.body.search;

    const player = players.find((p) => p.name === playerName);

    if (player) {
        res.send(`
            <h2>Player Information</h2>
            <p>Name: ${player.name}</p>
            <p>Date of Birth: ${player.dob}</p>
            <img src="${player.photoUrl}" alt="Player Photo" style="max-width: 300px; max-height: 300px;">
            <p>Birthplace: ${player.birthplace}</p>
            <p>Career: ${player.career}</p>
            <p>Number of Matches: ${player.matches}</p>
            <p>Score: ${player.score}</p>
            <p>Fifties: ${player.fifties}</p>
            <p>Centuries: ${player.centuries}</p>
            <p>Wickets: ${player.wickets}</p>
            <p>Average: ${player.average}</p>
        `);
    } else {
        res.send('Player not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
