import React from 'react';
import {Container} from "@mui/material";

import FilmList from "../components/FilmList/FilmList";

const MainPage = () => {

    return (
        <Container width={'70vw'}>
             <FilmList/>
        </Container>
    );
};

export default MainPage;