import {useEffect, useState} from "react";
import axios from "axios";

import logo from './logo.svg';
import './App.css';

function SearchBar({query, setQuery, onSearch}) {
  function onSubmit(e) {
    onSearch();

    e.preventDefault();
    e.stopPropagation();
  }

  function onChange(text) {
    //TODO: delay
    setQuery(text);
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={query}
        placeholder="Luke Skywalker"
        onInput={e => onChange(e.target.value)}
      />
      <button>Go!</button>
    </form>
  )
}

function App() {
  var [query, setQuery] = useState("");

  async function search(query) {
    var data = (await axios.get(`https://swapi.dev/api/people/?search=${query}`)).data;
    console.log(data);
  }

  function onSearch() {
    if(query.trim() == "") {
      //TODO: display message
      return;
    }

    console.log(query);
    search(query);
  }

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar query={query} setQuery={setQuery} onSearch={onSearch}/>
      </header>
    </div>
  );
}

export default App;
