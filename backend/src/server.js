const path = require("path");
const express = require("express");
const ash = require("express-async-handler");
const swapi = require("./swapi");
const utils = require("./utils");

const app = express();
const port = parseInt(process.env["PORT"] || 80);

app.use(express.static('public'));

app.get('/api/search', ash(async (req, res) => {
  var query = req.query.q;
  var characters = await swapi.search(query);
  res.json(characters);
}));

app.get('/api/character/:id', ash(async (req, res) => {
  //fetch main character data
  var character = await swapi.getCharacter(req.params.id);

  //resolve species
  character.species = await Promise.all(character.species.map(async (e) => {
    var id = utils.getID(e, "species");
    return await swapi.getSpecies(id);
  }));

  //resolve films
  character.films = await Promise.all(character.films.map(async (e) => {
    var id = utils.getID(e, "films");
    return await swapi.getFilm(id);
  }));

  //resolve starships
  character.starships = await Promise.all(character.starships.map(async (e) => {
    var id = utils.getID(e, "starships");
    return await swapi.getStarship(id);
  }));

  res.json(character);
}));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
