const https = require("https");
const fetch = require("node-fetch");
const utils = require("./utils.js");

//WARNING: allowing invlid certs as swapi's HSTS is currently broken (2/20/2022)
const agent = new https.Agent({
  rejectUnauthorized: false
});

const SWAPI = "https://swapi.dev/api";

//naive in-memory cache to reduce hits on swapi :)
//NOTE: assumes character, film, starship, and species data are never updated
var characters = {};
var films = {};
var starships = {};
var species = {};

/** search for characters, returns up to the first top 10 results in {id, name} format */
async function search(query) {
  var data = await fetch(`${SWAPI}/people/?search=${query}`, {agent});
  data = await data.json();
  data = data.results.map((e) => ({
    //extract "person id" from url
    id: utils.getID(e.url, "people"),
    name: e.name
  }));

  return data.slice(0, 10);
}

/** fetch a single character by their id */
async function getCharacter(id) {
  if(!(id in characters)) {
    var data = await fetch(`${SWAPI}/people/${id}`, {agent});
    data = await data.json();
    characters[id] = data;
  }

  //object.assign to avoid modifying cached data
  return Object.assign({}, characters[id]);
}

/** fetch a single film by its id */
async function getFilm(id) {
  if(!(id in films)) {
    var data = await fetch(`${SWAPI}/films/${id}`, {agent});
    data = await data.json();
    films[id] = data.title;
  }

  return films[id];
}

/** fetch a single species by its id */
async function getSpecies(id) {
  if(!(id in species)) {
    var data = await fetch(`${SWAPI}/species/${id}`, {agent});
    data = await data.json();
    species[id] = data.name;
  }

  return species[id];
}

/** fetch a single starship by its id */
async function getStarship(id) {
  if(!(id in starships)) {
    var data = await fetch(`${SWAPI}/starships/${id}`, {agent});
    data = await data.json();
    starships[id] = {
      name: data.name,
      model: data.model,
      starship_class: data.starship_class,
      length: data.length
    };
  }

  //object.assign to avoid modifying cached data
  return Object.assign({}, starships[id]);
}

module.exports = {
  search,
  getCharacter,
  getFilm,
  getSpecies,
  getStarship
}
