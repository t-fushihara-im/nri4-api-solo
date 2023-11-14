const { expect, assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const config = require("../knexfile");
const knex = require("knex")(config);

const fixtures = require("./fixtures");
const domain = require("../src/domain");
const { setupServer } = require("../src/server");

chai.use(chaiHttp);
chai.should();

const app = setupServer();

describe("The express server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(app);
  });

  describe("GET methods", () => {
    describe("GET /characters", () => {
      it("should return all characters", async () => {
        const res = await request.get("/characters");
        const actual = JSON.parse(res.text);
        expect(actual.length).to.equal(2);
      });
    });
    describe("GET /characters/:id", () => {
      it("should return the character having id 2", async () => {
        const res = await request.get("/characters/2");
        expect(res.body.id).to.equal(2);
      });
    });
  });

  describe("POST methods", () => {
    const disneyFixture = fixtures.getCharacter();
    const newId = disneyFixture.id;
    after(async () => {
      await knex
        .from(domain.DISNEY_TABLE)
        .where("id", newId)
        .del()
        .catch(console.error);
    });
    describe("POST /characters", () => {
      it("should create a character", async () => {
        const res = await request.post("/characters").send(disneyFixture);
        expect(res.body.id).to.equal(disneyFixture.id);
      });
    });
  });

  describe("PATCH methods", () => {
    const fixture = fixtures.getCharacter();
    before(async () => {
      await knex(domain.DISNEY_TABLE)
        .insert(fixture)
        .then((result) => {
          console.log("insert test character");
        })
        .catch(console.error);
    });

    after(async () => {
      await knex(domain.DISNEY_TABLE)
        .where("id", "=", fixture.id)
        .del()
        .then((result) => {
          console.log("removed test character");
        })
        .catch(console.error);
    });
    describe("PATCH /characters", () => {
      it("should update a character", async () => {
        const updatedCharacter = {
          name: "Mickey",
        };
        const res = await request
          .patch(`/characters/${fixture.id}`)
          .send(updatedCharacter);
        expect(res.body.id).to.equal(fixture.id);
      });
    });
  });

  describe("DELETE methods", () => {
    const fixture = fixtures.getCharacter();
    before(async () => {
      await knex(domain.DISNEY_TABLE)
        .insert(fixture)
        .then((result) => {
          console.log("insert test character");
        })
        .catch(console.error);
    });

    describe("DELETE /characters/:id", () => {
      it("should delete a character", async () => {
        const res = await request.delete(`/characters/${fixture.id}`);
        expect(res.body.id).to.equal(fixture.id);
      });
    });
  });
});
