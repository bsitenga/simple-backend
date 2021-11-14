const express = require('express')
const Sentiment = require('sentiment')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send("Test");
})

//-5 is really bad, 0 is neutral, 5 is really good
app.post('/checkmood', (req, res) => {
  let userText = req.body.userText;
  let sentiment = new Sentiment();
  let result = sentiment.analyze(userText);
  res.send(result.comparative);
})

app.listen(process.env.PORT || port, () => {
  console.log(`Backend listening at http://localhost:${port}`)
})