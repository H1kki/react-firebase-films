import React, {useContext, useEffect} from 'react';
import {Box, Button, Container, Grid} from "@mui/material";
import firebase from 'firebase'
import {Context} from "../context";
import {useAuthState} from "react-firebase-hooks/auth";
import {useHistory} from "react-router-dom";



const LoginPage = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const history = useHistory()

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const {user} = await auth.signInWithPopup(provider)
        console.log(user)
    }

    useEffect(() => {
        if(user) history.push('/upcoming')
    })
    return (
        <Container>
            <Grid container style={{height: window.innerHeight - 50}} justifyContent={"center"} alignItems={"center"}>
                <Grid container alignItems={"center"} flexDirection={"column"} style={{width: 400, border: '2px solid teal', background: "lightgray"}}>
                    <Box p={5}>
                        <Button variant={"outlined"} onClick={login}>Enter with google</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default LoginPage;