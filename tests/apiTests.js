const request = require("supertest")
const app = require("../src/index")

describe("GET /", () => {
  it("respond with somethin", done => {
    request(app)
      .get("/")
      .expect(200, done)
  })
})
