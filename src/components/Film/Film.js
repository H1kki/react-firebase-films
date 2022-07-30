import React from 'react';
import Loader from "../UI/Loader/Loader";
import {CardMedia, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PostService from "../API/fetchFilms";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../context";
import {useParams} from "react-router-dom";

const Film = () => {
    const {isLoading, setIsLoading} = useContext(Context)
    const params = useParams()
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
    }, [])

    return (
        <>
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
        </>
    );
};

export default Film;