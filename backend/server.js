const express = require("express");
const {createProxyMiddleware} = require("http-proxy-middleware");

//temporary proxy to dodge swapi.dev's current invalid HTTPS cert

const app = express();
const port = 3001;

var swapiProxy = createProxyMiddleware("/", {target: "http://swapi.dev"});

app.use(swapiProxy);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
