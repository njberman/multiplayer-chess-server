const express = require('express');
const helmet = require('helmet');
const Game = require('./game');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;
const CODE_LENGTH = 5;

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const games = [];
games.map((val) => console.log(val.code));

function checkIfGameExists(code) {
  let game;
  for (let _game of games) {
    if (_game.code === code) {
      game = _game;
      break;
    }
  }
  return game || -1;
}

app.post('/get-game', (req, res) => {
  const sentCode = req.body.code;
  const game = checkIfGameExists(sentCode);
  if (game !== -1) {
    res.json({
      game,
    });
  } else {
    res.json({
      message: 'No game exists with that code',
    });
  }
});

app.post('/set-game', (req, res) => {
  const sentCode = req.body.code;
  const game = checkIfGameExists(sentCode);
  if (game !== -1) {
    game.boardFen = req.body.newFen;
    res.json({
      message: 'Updated game',
      game,
    });
    console.log(games);
  } else {
    res.json({
      message: 'No game exists with that code',
    });
  }
});

app.post('/new-game', (req, res) => {
  const code = req.body.code;
  while (true) {
    const newGame = new Game(CODE_LENGTH, code);
    if (checkIfGameExists(newGame) === -1) {
      games.push(newGame);
      res.json({
        message: 'Created new game',
        game: newGame,
      });
      console.log(games);
      break;
    }
  }
});

app.delete('/delete-game', (req, res) => {
  const sentCode = req.body.code;
  const sentGame = checkIfGameExists(sentCode);
  if (sentGame !== -1) {
    games.splice(games.indexOf(sentGame, 1));
    res.json({
      message: 'Deleted Game',
    });
  } else {
    res.json({
      message: 'No game exists with that code',
    });
  }
});

app.get('/all-games', (req, res) => {
  res.json({
    games,
  });
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

module.exports = app;
