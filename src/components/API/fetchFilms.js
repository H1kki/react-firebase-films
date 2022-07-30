import {useContext} from "react";
import {Context} from "../../context";
import axios from "axios";


export default function PostService(){
    const {setIsLoading, setFilms, films, setPage} = useContext(Context)

    const fetchFilmById = async (id) => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=67acb27e7efd84537c777e19cd0617ae&language=ru`)
        return response
    }

    const fetchFilmsByCat = async (val, page) => {
        setIsLoading(true)
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${val}?api_key=67acb27e7efd84537c777e19cd0617ae&language=ru&page=${page}`)
        setFilms([...films, ...response.data.results])
        setPage(page + 1)
        setIsLoading(false)
    }

    return {fetchFilmById, fetchFilmsByCat}
}



