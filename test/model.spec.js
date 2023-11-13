const { expect, assert } = require("chai");
const config = require("../knexfile");
const knex = require("knex")(config);
const fixtures = require("./fixtures");
const domain = require("../src/domain");
const model = require("../src/model");
const DISNEY_TABLE = domain.DISNEY_TABLE;

describe("disney", () => {
  let disneyFixture;

  before(async () => {
    disneyFixture = fixtures.getCharacter();
    await knex(DISNEY_TABLE)
      .insert(disneyFixture)
      .returning("id")
      .then((result) => {
        console.log("inserted test disneyCharacter");
      })
      .catch(console.error);
  });

  after(async () => {
    await knex(DISNEY_TABLE)
      .where("id", disneyFixture.id)
      .returning("id")
      .del()
      .then((result) => {
        console.log("removed test customer");
      })
      .catch(console.error);
  });

  describe("setup", () => {
    it("should connect to database", () => {
      knex.raw("select 1 as result").catch(() => {
        assert.fail("unable to connect to database");
      });
    });

    it("has run the initial migration", () => {
      knex(DISNEY_TABLE)
        .select()
        .catch(() => assert.fail("customer table is not found."));
    });
  });
});

describe("get method tests", () => {
  describe("get all characters", () => {
    it("should return an array of 2 characters", async () => {
      const characters = await model.getAllCharacters();
      expect(characters.length).to.equal(2);
    });
  });

  describe("get character by id", () => {
    it("should return one character", async () => {
      const character = await model.getCharacter(4703);
      expect(character).to.exist;
      expect(character.id).to.equal(4703);
    });
  });
});

describe("post method tests", () => {
  describe("post one character", () => {
    it("should return a created character", async () => {
      const expected = {};
      const actual = model.createCharacter(expected);
      expect(actual).to.deep.equal(expected);

    });
  });
});
