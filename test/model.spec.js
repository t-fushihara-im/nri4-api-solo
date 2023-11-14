const { expect, assert } = require("chai");
const config = require("../knexfile");
const knex = require("knex")(config);
const fixtures = require("./fixtures");
const domain = require("../src/domain");
const model = require("../src/model");
const DISNEY_TABLE = domain.DISNEY_TABLE;

describe("disney", () => {
  // before(async () => {
  //   disneyFixture = fixtures.getCharacter();
  //   await knex(DISNEY_TABLE)
  //     .insert(disneyFixture)
  //     .returning("id")
  //     .then((result) => {
  //       console.log("inserted test disneyCharacter");
  //     })
  //     .catch(console.error);
  // });

  // after(async () => {
  //   await knex(DISNEY_TABLE)
  //     .where("id", disneyFixture.id)
  //     .returning("id")
  //     .del()
  //     .then((result) => {
  //       console.log("removed test customer");
  //     })
  //     .catch(console.error);
  // });

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
      const character = await model.getCharacter(2);
      expect(character).to.exist;
      expect(character.id).to.equal(2);
    });
  });
});

describe("post method tests", () => {
  const disneyFixture = fixtures.getCharacter();
  const newId = disneyFixture.id;
  after(async () => {
    await knex.from(DISNEY_TABLE).where("id", newId).del().catch(console.error);
  });

  describe("post one character", () => {
    it("should return a created character", async () => {
      const actual = await model.createCharacter(disneyFixture);
      expect(actual[0].id).to.deep.equal(newId);
    });
  });
});

describe("patch method tests", () => {
  const fixture = fixtures.getCharacter();
  before(async () => {
    await knex(DISNEY_TABLE)
      .insert(fixture)
      .returning("id")
      .then((result) => {
        console.log("insert test character");
      })
      .catch(console.error);
  });

  after(async () => {
    await knex(DISNEY_TABLE)
      .where("id", "=", fixture.id)
      .returning("id")
      .del()
      .then((result) => {
        console.log("removed test character");
      })
      .catch(console.error);
  });

  describe("patch a character", () => {
    it("should return id", async () => {
      const updatedCharacter = {
        name: "Mickey",
      };
      const actual = await model.updateCharacter(fixture.id, updatedCharacter);
      expect(actual[0].id).to.deep.equal(fixture.id);
    });
  });
});

describe("delete method tests", () => {
  const fixture = fixtures.getCharacter();
  beforeEach(async () => {
    await knex(DISNEY_TABLE)
      .insert(fixture)
      .returning("id")
      .then((result) => {
        console.log("insert test character");
      })
      .catch(console.error);
  });
  describe("delete a character", () => {
    it("should return id", async () => {
      const actual = await model.deleteCharacter(fixture.id);
      expect(actual[0].id).to.deep.equal(fixture.id);
    });
  });
});
