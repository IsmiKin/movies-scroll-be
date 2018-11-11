FROM mhart/alpine-node

# Create app directory
WORKDIR /usr/src/app

# Install yarn
RUN npm install -g yarn -y

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn install
RUN yarn build
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source

COPY . .

# Run tests
RUN yarn test

EXPOSE 5000
CMD [ "yarn", "start" ]
