const express = require("express")
const firebaseAdmin = require('firebase-admin')

let firebaseAccount = require('../firebase-key.json')

firebaseAccount = {
  ...firebaseAccount,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  client_x509_cert_url: process.env.FIREBASE_CERT_URL
}

const app = express()

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseAccount)
})

const db = firebaseAdmin.firestore()

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
