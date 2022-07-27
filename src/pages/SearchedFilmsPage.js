import React, {useContext} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Context} from "../context";

const SearchedFilmsPage = () => {
    const {searchedFilms} = useContext(Context)
    return (
        <Container width={'70vw'}>
            <Grid container spacing={2} justifyContent={"center"} >
                {searchedFilms.map(film =>
                    <Grid item xs={2} maxHeight={'500px'} key={film.id}>
                        <Link to={`/film/${film.id}`}>
                            <Card container justifyContent={"center"} maxHeight={'500px'}>
                                <CardActionArea maxHeight={'500px'}>
                                    <CardMedia
                                        width={'auto'}
                                        component="img"
                                        image={`https://www.themoviedb.org/t/p/w220_and_h330_face/${film.backdrop_path}`}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {film.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" style={{overflowY: 'auto'}} height={'140px'} maxHeight={'140px'}>
                                            {/*{film.plot}*/}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>)}
            </Grid>
        </Container>
    );
};

export default SearchedFilmsPage;