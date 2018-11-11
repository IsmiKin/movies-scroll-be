const express = require("express")
const app = express()

app.get("/", (req, res) => {
  return res.status(200).send('pika')
})

const server = app.listen(5000, () =>
  console.log("Starting server on port 5000")
)

module.exports = server
