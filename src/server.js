const express = require("express");
const model = require("./model");
const cors = require("cors");

const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.text());
  app.use(cors());

  app.get("/characters", async (req, res) => {
    const results = await model.getAllCharacters();
    res.json(results);
  });

  app.get("/characters/:id", async (req, res) => {
    const results = await model.getCharacter(req.params.id);
    res.json(results);
  });

  app.post("/characters", async (req, res) => {
    const results = await model.createCharacter(req.body);
    res.json(results[0]);
  });

  app.patch("/characters/:id", async (req, res) => {
    const results = await model.updateCharacter(req.params.id, req.body);
    res.json(results[0]);
  });

  app.delete("/characters/:id", async (req, res) => {
    const results = await model.deleteCharacter(req.params.id);
    res.json(results[0]);
  });

  return app;
};

module.exports = { setupServer };
