import {useEffect, useState} from "react";

import axios from "axios";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function SearchBar({onSelect}) {
  var [typingTimeout, setTypingTimeout] = useState();
  var [query, setQuery] = useState("");
  var [characters, setCharacters] = useState([]);

  function onSubmit(e) {
    //select first result
    if(characters.length > 0)
    {
      onSelect(characters[0]);
    }
    //TODO: else, show error

    e.preventDefault();
    e.stopPropagation();
  }

  async function doSearch() {
    //TODO: search here and update character list
    var data = (await axios.get(`/api/people/?search=${query}`)).data;
    console.log(data.results)
    setCharacters(data.results);
  }

  function onChange(text) {
    setQuery(text);

    if(typingTimeout != null) {
      clearTimeout(typingTimeout);
    }

    console.log("hi")
    setTypingTimeout(setTimeout(doSearch, 250));
  }

  useEffect(() => {
    doSearch();
  }, [])

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Autocomplete
            options={characters}
            onChange={(e, value) => {
              onSelect(value);
            }}
            disableClearable
            renderInput={(params) => <TextField {...params}
              label="Character name"
              value={query}
              onInput={e => onChange(e.target.value)}
            />}
            getOptionLabel={(option) => option.name}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" style={{width:"100%", height:"100%"}}>Go!</Button>
        </Grid>
      </Grid>
    </form>
  );
}