import {useState} from "react";
import axios from "axios";

import Container from "@mui/material/Container";
import Box from '@mui/material/Box';

import SearchBar from "./SearchBar";
import Character from "./Character";

export default function App() {
  var [character, setCharacter] = useState();

  async function onSelect(character) {
    console.log(character);
    setCharacter(character);
  }

  return (
    <Container>
      <Box height="100vh">
        <SearchBar onSelect={onSelect}/>
        {character ? <Character character={character}/> : null}
      </Box>
    </Container>
  );
}
