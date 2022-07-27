import React, {useContext, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import {Button} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";
import {Context} from "../../context";
import {useAuthState} from "react-firebase-hooks/auth";

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));




const NavBar = () => {
    const {setIsLoading, searchItem, setSearchItem, setSearchedFilms, auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const history = useHistory()
    const searchFilms = async (value) => {
        if(value.trim()) {
            setIsLoading(true)
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=67acb27e7efd84537c777e19cd0617ae&language=ru&query=${value}`)
            setSearchedFilms(response.data.results)
            history.push('/search')
            setIsLoading(false)
        } else if(!value || value.length === 0) {
            history.push('/upcoming')
        }
    }
    const debounceSearch = useDebounce(searchFilms, 500)

    const onChange = (e) => {
        setSearchItem(e.target.value)
        debounceSearch(e.target.value)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        React Films
                    </Typography>
                    <Link to={'/upcoming'}>
                        <Button color="secondary" onClick={() => setSearchItem('')}>In Theater</Button>
                    </Link>
                    <Link to={'/top_rated'}>
                        <Button color="secondary">Top</Button>
                    </Link>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchItem}
                            onChange={onChange}
                        />
                    </Search>
                    {user
                        ?
                        <Link to={'/account'}>
                            <Button color="secondary">Account</Button>
                        </Link>
                        :
                        <Link to={'/login'}>
                            <Button color="secondary">Login</Button>
                        </Link>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;