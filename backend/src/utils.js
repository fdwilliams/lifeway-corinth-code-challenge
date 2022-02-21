/** utility method for extracting numeric ids from swapi urls.
  eg: getID("https://swapi.dev/api/films/2/", "films") => 2
*/
function getID(url, entity) {
  var re = new RegExp(`${entity}\/(\\d+)/`);
  return url.match(re)[1];
}

module.exports = {
  getID
}
