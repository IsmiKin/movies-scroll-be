const express = require('express')

const app = express()

app.get('/', (req, resp) =>  {
    console.log('pika')
})

const server = app.listen(5000, () =>
  console.log('Starting server on port 5000')
)
