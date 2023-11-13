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

  createCharacter(charInfo){
    return "undefined";
  }
};
