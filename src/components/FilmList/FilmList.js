import React, {useContext, useEffect, useRef} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import {Context} from "../../context";
import useScroll from "../../hooks/useScroll";
import PostService from "../API/fetchFilms";
import Loader from "../UI/Loader/Loader";

const FilmList = () => {
    const {films, page, setPage, isLoading, setFilms} = useContext(Context)
    const parentRef = useRef()
    const childRef = useRef()
    const {fetchFilmsByCat} = PostService()
    const path = useHistory().location.pathname.replace('/', '')
    useEffect(() => {
        setPage(1)
        setFilms([])
    }, [path])

    useScroll(childRef, () => {
        fetchFilmsByCat(path, page)
    })


    return (
        <Grid ref={parentRef} container spacing={2} justifyContent={"center"} >
        {films.map(film =>
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
                {isLoading && <Loader/>}
                <div style={{height: '40px', backgroundColor: "red", width: '100vw'}} ref={childRef}>jjj</div>
            </Grid>
    );
};

export default FilmList;