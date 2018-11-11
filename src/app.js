const express = require("express")
const app = express()

app.get("/", (req, res) => {
  return res.status(200).send('pika')
})

const server = app.listen(443, () =>
  console.log("Starting server on port 443")
)

module.exports = server
