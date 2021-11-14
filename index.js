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
  if (moodScore < -1) {
    res.send("Horrible")
  } else if (moodScore < -.25) {
    res.send("Not Great")
  } else if (moodScore < .25) {
    res.send("Neutral")
  } else if (moodScore < 1) {
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
    res.send("Remember that you're not alone. Keep pushing on and talk to someone if ready to do so!");
  } else if (emotionText.includes("sad") || emotionText.includes("horrible")) {
    res.send("Good days can't exist without the bad ones. Focus on you and push through the rest of the day!")
  } else if (emotionText.includes("happy") || emotionText.includes("excited") || emotionText.includes("delight") || emotionText.includes("joy")) {
    res.send("There's always room for positive energy! Hope you appreciate these joyful moments in life.")
  } else if (emotionText.includes("scared") || emotionText.includes("panic")) {
    res.send("Remember to take deep, controlled breaths. Try to keep yourself distracted if you can until you can sort out your thoughts.")
  } else if (emotionText.includes("caring") || emotionText.includes("love")) {
    res.send("That's great to hear! Having someone like that around you can go a long way.")
  } else if (emotionText.includes("guilt") || emotionText.includes("regret")) {
    res.send("We're only human. Let's learn from our mistakes and keep moving forward.")
  } else {
    res.send("No significant data on these emotions yet.")
  }
})

app.listen(process.env.PORT || port, () => {
  console.log(`Backend listening at http://localhost:${port}`)
})
