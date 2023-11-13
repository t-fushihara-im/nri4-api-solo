const { expect, assert } = require("chai");
const { setupServer } = require("../src/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

const app = setupServer();

describe("The express server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(app);
  });

  describe("GET methods", () => {
    describe("GET /characters",() => {
        it("should all characters", async () => {
            const res = await request.get("/characters");
            const actual = JSON.parse(res.text);
            expect(actual.length).to.equal(2);
        });
    });
    describe("GET /characters/:id",() => {
        it("should the character having id 4703", async () => {
            const res = await request.get("/characters/4703");
            expect(res.body.id).to.equal(4703);
        });
    });
  });
});
