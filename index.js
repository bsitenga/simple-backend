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
  let finalNum = result.comparative.toFixed(1);
  res.send(finalNum);
})

app.listen(process.env.PORT || port, () => {
  console.log(`Backend listening at http://localhost:${port}`)
})