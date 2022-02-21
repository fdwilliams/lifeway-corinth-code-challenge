import {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";

import Container from "@mui/material/Container";
import Box from '@mui/material/Box';

import SearchBar from "./SearchBar";
import Character from "./Character";

export default function App() {
  var {characterID} = useParams();
  var history = useHistory();

  async function onSelect(character) {
    console.log(character);
    //navigate to character page
    history.push(`/${character.id}`);
  }

  return (
    <Container>
      <Box height="100vh">
        <SearchBar onSelect={onSelect}/>
        {characterID ? <Character characterID={characterID}/> : null}
      </Box>
    </Container>
  );
}
