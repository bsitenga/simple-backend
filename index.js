const express = require('express')
var bodyParser = require('body-parser')
const Sentiment = require('sentiment')
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Test");
})

//-5 is really bad, 0 is neutral, 5 is really good
app.post('/checkmood', (req, res) => {
  let userText = req.body.userText;
  let sentiment = new Sentiment();
  let result = sentiment.analyze(userText);
  let moodScore = result.comparative;
  if (moodScore < -3) {
    res.send("Horrible")
  } else if (moodScore < -1) {
    res.send("Not Great")
  } else if (moodScore < 1) {
    res.send("Neutral")
  } else if (moodScore < 3) {
    res.send("Pretty Good")
  } else {
    res.send("Awesome!")
  }

  res.send("Doing Okay"); // should never hit this
})

app.post('/moodranking', (req, res) => {
  let moodScore = Number(req.body.moodScore);
  if (moodScore < -3) {
    res.send("Horrible")
  } else if (moodScore < -1) {
    res.send("Not Great")
  } else if (moodScore < 1) {
    res.send("Neutral")
  } else if (moodScore < 3) {
    res.send("Pretty Good")
  } else {
    res.send("Awesome!")
  }
})

app.listen(process.env.PORT || port, () => {
  console.log(`Backend listening at http://localhost:${port}`)
})
