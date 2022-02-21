import {useEffect, useState} from "react";

import axios from "axios";

import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#222227",
  padding: theme.spacing(1)
}));

function AboutMe({character}) {
  return (
    <StyledPaper>
      <ul>
        <li>Name: {character.name}</li>
        <li>Height: {character.height} (cm?)</li>
        <li>Mass: {character.mass} (units?)</li>
        <li>Gender: {character.gender}</li>
        <li>Hair color: {character.hair_color}</li>
        <li>Eye color: {character.eye_color}</li>
        <li>Birth year: {character.birth_year}</li>
        <li>Species: {character.species}</li>
      </ul>
    </StyledPaper>
  )
};

function Film() {
  return (
    <Grid item xs={4}>
      <StyledPaper>Hi</StyledPaper>
    </Grid>
  );
}

function FilmList() {
  return (
    <div>films appeared in</div>
  );
}

function StarshipList() {
  return (
    <div>starships flown in</div>
  );
}

export default function Character({characterID}) {
  var [character, setCharacter] = useState();
  var [loading, setLoading] = useState(false);

  async function getCharacterData(id) {
    var character = (await axios.get(`/api/character/${id}`)).data;
    console.log(character)
    setCharacter(character);
  }

  useEffect(() => {
    if(characterID == null) {
      return
    }

    getCharacterData(characterID);

    console.log("character id updated to", characterID);
  }, [characterID]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {character ? <AboutMe character={character}/> : null}
        </Grid>
        <Grid item xs={4}>
          TODO
        </Grid>
        <Grid item xs={4}>
          TODO
        </Grid>
      </Grid>
    </Box>
  );
}
