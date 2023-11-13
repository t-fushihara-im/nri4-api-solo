const express = require("express");
const model = require("./model");

const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.get("/characters", async (req, res) => {
    const results = await model.getAllCharacters();
    res.json(results);
  });

  app.get("/characters/:id", async (req, res) => {
    const results = await model.getCharacter(req.params.id);
    res.json(results);
  });

  return app;
};

module.exports = { setupServer };
