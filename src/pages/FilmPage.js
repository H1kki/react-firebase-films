import React from 'react';
import {Container} from "@mui/material";

import Film from "../components/Film/Film";
import Comments from "../components/Comments/Comments";

const FilmPage = () => {
    return (
        <Container>
            <Film/>
            <Comments/>
        </Container>
    );
};

export default FilmPage;