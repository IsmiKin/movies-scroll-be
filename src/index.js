const express = require("express")
const cors = require('cors')
const morgan = require('morgan')

const firebaseAdmin = require('firebase-admin')

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

// now-env loads env variables from now-secrets.json , just for development!
require('now-env')

let firebaseAccount = require('../firebase-key.json')

const PORT = process.env.PORT || 5000

firebaseAccount = {
  ...firebaseAccount,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: Buffer.from(process.env.FIREBASE_PRIVATE_KEY, 'base64').toString('ascii'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  client_x509_cert_url: process.env.FIREBASE_CERT_URL
}

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseAccount)
})

const db = firebaseAdmin.firestore()

const app = express()

const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN_AUTH0}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.SPA_UI_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN_AUTH0}/`,
  algorithms: ['RS256']
})

app.use(cors())
app.use(morgan('combined'))

app.get("/", (req, res) => {
  return res.status(200).send('pika')
})

app.get("/scrolls", checkJwt, (req, res) => {
  db.collection('scrolls').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data())
      })
      return res
        .status(200)
        .json({ scrolls: snapshot.docs.map(doc => doc.data()) })
    })
    .catch((err) => {
      return res.status(500).send(`Error getting documents ${err}`)
    })
})

const server = app.listen(PORT, () =>
  console.log(`Starting server on port ${PORT}`)
)

module.exports = server
