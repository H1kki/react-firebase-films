import React, {useContext, useState} from 'react';
import {useParams} from "react-router-dom";
import PostService from "../components/API/fetchFilms";
import {useEffect} from "react";
import {Context} from "../context";
import Loader from "../components/UI/Loader/Loader";
import {CardMedia, Container, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const FilmPage = () => {
    const params = useParams()
    const {isLoading, setIsLoading, page} = useContext(Context)
    const [film, setFilm] = useState({})
    const {fetchFilmById} = PostService()
    const fetchFilm = async () => {
        setIsLoading(true)
        const response = await fetchFilmById(params.id)
        setFilm(response.data)
        console.log(film)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchFilm()
    }, [page])
    return (
        <Container>
        {isLoading
            ? <Loader/>
            :
                <div style={{display: "flex"}}>
                    <CardMedia
                        style={{width: 300, height: 430}}
                        component="img"
                        image={`https://www.themoviedb.org/t/p/w220_and_h330_face/${film.backdrop_path}`}
                        alt="green iguana"
                    />
                    <Grid container>
                        <h2>{film.title}</h2>
                        <Box>
                            <h3>Release date:</h3>
                            <p></p>
                        </Box>
                        <Typography>{film.overview}</Typography>
                    </Grid>
                </div>

        }
        </Container>
    );
};

export default FilmPage;