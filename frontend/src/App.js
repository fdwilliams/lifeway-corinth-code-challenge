import {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";

import Container from "@mui/material/Container";
import Stack from '@mui/material/Stack';

import SearchBar from "./SearchBar";
import Character from "./Character";
import Navbar from "./Navbar";

export default function App() {
  var {characterID} = useParams();
  var history = useHistory();

  async function onSelect(character) {
    //navigate to character page
    history.push(`/${character.id}`);
  }

  return (
    <>
      <Navbar />
      <Container>
        <Stack spacing={4} sx={{pt:4}}>
          <SearchBar onSelect={onSelect}/>
          {characterID ? <Character characterID={characterID}/> : null}
        </Stack>
      </Container>
    </>
  );
}
