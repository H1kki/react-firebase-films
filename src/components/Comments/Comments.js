import React, {useContext} from 'react';
import {Avatar, Button, Grid, TextField} from "@mui/material";
import {useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useParams} from "react-router-dom";
import {Context} from "../../context";
import firebase from "firebase";

const Comments = () => {
    const [state, setState] = useState('')
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const params = useParams()

    const [comments, loading] = useCollectionData(firestore.collection('comments').orderBy('createdAt'))
    let commentsByFilmId = []
    if(!loading) commentsByFilmId = comments.filter(comm => comm.filmId === params.id)

    const leaveComment = async () => {
            await firestore.collection('comments').add({
                uid: user.uid,
                filmId: params.id,
                displayName: user.displayName,
                photoURL: user.photoURL,
                comment: state,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            setState('')
    }
    return (
        <>
            <Grid container direction={"column"} alignItems={"flex-end"} style={{marginTop: 10}}>
                <TextField
                    variant={"outlined"}
                    fullWidth
                    maxRows={2}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <Button
                    variant={"outlined"}
                    onClick={leaveComment}
                >Send</Button>
            </Grid>
            <div style={{width: '80%', margin: '5px 0'}}>
                {commentsByFilmId.length > 0 ? commentsByFilmId.map(comment => {
                    return <div key={comment.createdAt} style={{
                        width: "fit-content",
                        padding: '10px'
                    }}>
                        <Grid container>
                            <>
                                <Avatar src={comment.photoURL}/>
                                <div>{comment.displayName}</div>
                            </>
                        </Grid>
                        <div>
                            {comment.comment}
                        </div>
                    </div>
                }) : <h2>Non comments</h2>}
            </div>
        </>
    );
};

export default Comments;