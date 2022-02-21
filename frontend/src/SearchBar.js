import {useEffect, useState} from "react";

import axios from "axios";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import StyledPaper from "./StyledPaper";
import LoadingCircle from "./LoadingCircle";

export default function SearchBar({onSelect}) {
  var [typingTimeout, setTypingTimeout] = useState();
  var [query, setQuery] = useState("");
  var [characters, setCharacters] = useState([]);
  var [loading, setLoading] = useState(false);

  function onSubmit(e) {
    //select first result
    if(characters.length > 0)
    {
      onSelect(characters[0]);
    }

    //clear field
    setQuery("");

    e.preventDefault();
    e.stopPropagation();
  }

  async function doSearch() {
    var characters = (await axios.get(`/api/search/?q=${query}`)).data;
    setCharacters(characters);
    setLoading(false);
  }

  useEffect(() => {
    doSearch();
  }, [])

  //update options based on query (backend search)
  useEffect(() => {
    setLoading(true);
    //clear characters to prevent user from selecting something while typing
    setCharacters([]);

    if(typingTimeout != null) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(setTimeout(doSearch, 250));
  }, [query])

  return (
    <StyledPaper variant="outlined">
      <form onSubmit={onSubmit}>
        <Box sx={{ m: 1, pb: 2 }}><Typography>Search for a character</Typography></Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              options={characters}
              loading={loading}
              autoHighlight
              onChange={(e, value) => {
                onSelect(value);
              }}
              disableClearable
              renderInput={(params) => <TextField {...params}
                label="Character name"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />}
              getOptionLabel={(option) => option.name}
            />
          </Grid>
        </Grid>
      </form>
    </StyledPaper>
  );
}
