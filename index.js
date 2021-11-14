const express = require('express')
const Sentiment = require('sentiment')
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Test");
})

//does sentiment analysis on user text (0-5) and returns general moood
//-5 is really bad, 0 is neutral, 5 is really good
app.post('/checkmood', (req, res) => {
  let userText = req.body.userText;
  let sentiment = new Sentiment();
  let result = sentiment.analyze(userText);
  let moodScore = result.comparative;
  if (moodScore < -1.5) {
    res.send("Horrible")
  } else if (moodScore < -.5) {
    res.send("Not Great")
  } else if (moodScore < .5) {
    res.send("Neutral")
  } else if (moodScore < 1.5) {
    res.send("Pretty Good")
  } else {
    res.send("Awesome!")
  }

  res.send("Doing Okay"); // should never hit this
})

//checks for words in emotions and returns phrases
app.post('/emotions', (req, res) => {
  let emotionText = req.body.emotionText.toLowerCase();
  if (emotionText.includes("suicidal") || emotionText.includes("depressed")) {
    res.send("Please go get help. Here's the suicide hotlines: 323 go fuck yourself.");
  } else if (emotionText.includes("happy") || emotionText.includes("excited")) {
    res.send("Lot's of positive vibes going around. Hope you appreciate these joyful moments in life.")
  } else {
    res.send("No significant data on these emotions yet.")
  }
})

app.listen(process.env.PORT || port, () => {
  console.log(`Backend listening at http://localhost:${port}`)
})
