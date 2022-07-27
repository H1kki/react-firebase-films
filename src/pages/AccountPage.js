import React, {useContext} from 'react';
import {Button} from "@mui/material";
import {Context} from "../context";

const AccountPage = () => {
    const {auth} = useContext(Context)
    return (
        <div>
            <Button variant={"outlined"} onClick={() => auth.signOut()}>Logout</Button>
        </div>
    );
};

export default AccountPage;