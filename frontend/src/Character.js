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

import LoadingCircle from "./LoadingCircle";
import StyledPaper from "./StyledPaper";

function AboutMe({character}) {
  var species = character.species.length > 0 ? (
    <ul>
      {character.species.map((e) => (<li key={e}>{e}</li>))}
    </ul>
  ) : "None";

  return (
    <StyledPaper variant="outlined">
      <Box sx={{ m: 1 }}><Typography variant="h5" sx={{ color: 'primary.main' }}>About Me</Typography></Box>
      <ul>
        <li>Height: {character.height} cm</li>
        <li>Mass: {character.mass} kg</li>
        <li>Gender: {character.gender}</li>
        <li>Hair color: {character.hair_color}</li>
        <li>Eye color: {character.eye_color}</li>
        <li>Birth year: {character.birth_year}</li>
        <li>Species: {species}</li>
      </ul>
    </StyledPaper>
  )
};

function Film({name}) {
  return (
    <Grid item sm={3}>
      <StyledPaper>{name}</StyledPaper>
    </Grid>
  );
}

function FilmList({character}) {
  return (
    <>
      {character.films.length > 0 ? (
        <StyledPaper variant="outlined">
          <Box sx={{ m: 1 }}><Typography variant="h5" sx={{ color: 'primary.main' }}>Films Appeared In</Typography></Box>
          <Grid container spacing={2}>
            {character.films.map((e) => <Film key={e} name={e}/>)}
          </Grid>
        </StyledPaper>
      ) : "None"}
    </>
  );
}

function Starship({starship}) {
  return (
    <Grid item sm={4}>
      <StyledPaper>
        <Box sx={{ m: 1}}>{starship.name}</Box>
        <ul>
          <li>Model: {starship.model}</li>
          <li>Class: {starship.starship_class}</li>
          <li>Length: {starship.length} meters</li>
        </ul>
      </StyledPaper>
    </Grid>
  );
}

function StarshipList({character}) {
  return (
    <StyledPaper variant="outlined">
      <Box sx={{ m: 1 }}><Typography variant="h5" sx={{ color: 'primary.main' }}>Starships Flown</Typography></Box>
      {character.starships.length > 0 ? (
        <Grid container spacing={2}>
          {character.starships.map((e) => <Starship key={e.name} starship={e}/>)}
        </Grid>
      ) : "None"}
    </StyledPaper>
  );
}

export default function Character({characterID}) {
  var [character, setCharacter] = useState();
  var [loading, setLoading] = useState(false);

  async function getCharacterData(id) {
    var character = (await axios.get(`/api/character/${id}`)).data;
    setCharacter(character);
  }

  useEffect(() => {
    if(characterID == null) {
      return
    }

    (async () => {
      setLoading(true);
      await getCharacterData(characterID);
      setLoading(false);
    })();
  }, [characterID]);

  return (
    <>
      {loading ? <LoadingCircle/> : character ? (
        <Stack spacing={2}>
          <Box sx={{ m: 1 }}><Typography variant="h4" sx={{ color: 'primary.main' }}>{character.name}</Typography></Box>
          <AboutMe character={character}/>
          <FilmList character={character} />
          <StarshipList character={character} />
        </Stack>
      ) : null}
    </>
  );
}
