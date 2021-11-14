const express = require('express')
const app = express()
const port = 3000

app.get('/checkmood', (req, res) => {
  res.send("Test");
})

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`)
})