import React from 'react';
import {Container} from "@mui/material";
import FilmList from "../components/FilmList/FilmList";

const TopFilms = () => {

    return (
        <Container width={'70vw'}>
            <FilmList/>
        </Container>
    );
};

export default TopFilms;