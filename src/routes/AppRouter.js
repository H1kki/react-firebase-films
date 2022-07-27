import {Switch, Route, Redirect,} from "react-router-dom";

import React, {useContext} from 'react';
import {privateRoutes, publicRoutes} from "./routes";
import {Context} from "../context";
import {useAuthState} from "react-firebase-hooks/auth";


const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    return user ?
        (
        <Switch>
            {privateRoutes.map(route => <Route path={route.path} exact={route.exact} component={route.component} key={route.path}/>)
            })}
            <Redirect to={'/upcoming'}/>
        </Switch>
        )
        :
        (
            <Switch>
                {publicRoutes.map(route => <Route path={route.path} exact={route.exact} component={route.component} key={route.path}/>)
                })}
                <Redirect to={'/upcoming'}/>
            </Switch>
        )
};

export default AppRouter;