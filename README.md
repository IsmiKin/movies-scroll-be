# movies-scroll-be
API to serve a very simple app to make movie lists and share them

Initial api for learning and having from scratch.

## Build
```
docker build . -t movies-scroll-be
```

## Run

### Pre requisites
Before run the project you have to configure the FIREBASE and AUTH0 credentials. 

### Zeit NOW
If you want to deploy the app with Zeit Now, just copy the `now-secrets-template.json` and create yours called `now-secrets.json`.
```
{
  "@model-scrolls-be-private_key_id": "<firebase_private_key_id>",
  "@model-scrolls-be-private_key": "<firebase_private_key>",
  "@model-scrolls-be-client_id": "<firebase_client_id>",
  "@model-scrolls-be-cert_url": "<firebase_cert_url>",
  "@domain-auth0": "<domain_auth0>",
  "@spa-ui-client-id-auth0": "<spa-ui-client-id-auth0>"
}
```

### Local

Export your FIREBASE and AUTH0 config and credentials to the following environment variables:
```
FIREBASE_PRIVATE_KEY_ID=<firebase_private_key_id>
FIREBASE_PRIVATE_KEY=<firebase_private_key>
FIREBASE_CLIENT_ID=<firebase_client_id>
FIREBASE_CLIENT_EMAIL=<firebase_client_email>
FIREBASE_CERT_URL=<firebase_cert_url>
AUTH0_DOMAIN_AUTH0=<domain-auth0>
AUTH0_SPA_UI_ID_CLIENT_ID=<@spa-ui-client-id-auth0>
```

### Docker

```
docker run -it -p 5000:5000 movies-scroll-be
```

### Local
```
yarn install
yarn start-dev
``` 

## Deploy

### With now

```
yarn install now
now
```
