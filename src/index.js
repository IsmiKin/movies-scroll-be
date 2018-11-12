const express = require("express")
const app = express()
const admin = require('firebase-admin')

const firebaseAccount = require('../movies-scroll-04b543d840f6.json')

admin.initializeApp({
  credential: admin.credential.cert(firebaseAccount)
})

const db = admin.firestore()


app.get("/", (req, res) => {
  return res.status(200).send('pika')
})

app.get("/scrolls", (req, res) => {
  db.collection('scrolls').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data())
      })
      return res
        .status(200)
        .json({scrolls: snapshot.docs.map(doc => doc.data()) })
    })
    .catch((err) => {
      return res.status(500).send(`Error getting documents ${err}`)
    })
})

const server = app.listen(5000, () =>
  console.log("Starting server on port 5000")
)

module.exports = server
