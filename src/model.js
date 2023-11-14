const config = require("../knexfile");
const knex = require("knex")(config);
const domain = require("./domain");

module.exports = {
  getAllCharacters() {
    return knex.select().from(domain.DISNEY_TABLE);
  },

  getCharacter(id) {
    return knex.select().from(domain.DISNEY_TABLE).where({ id: id }).first();
  },

  createCharacter(character) {
    return knex(domain.DISNEY_TABLE).insert(character).returning("*");
  },

  updateCharacter(id, character) {
    character["updatedAt"] = new Date();
    return knex(domain.DISNEY_TABLE)
      .where("id", "=", id)
      .update(character)
      .returning("*");
  },

  deleteCharacter(id) {
    return knex(domain.DISNEY_TABLE).where("id", "=", id).returning("*").del();
  },
};
