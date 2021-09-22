import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {privateRoutes, publicRoutes, RouteNames} from "../routs";
import Books from "../pages/Books";
import {useTypedSelector} from "../hooks/useTypedSelector";

const AppRouter = () => {

    const {isAuth} = useTypedSelector(state => state.auth);

    return (

        isAuth ?
            <Switch>
                {
                    privateRoutes.map(route =>
                        <Route {...route} key={route.path}/>
                    )
                }
                <Redirect to={RouteNames.BOOKS}/>
            </Switch>
            :
            <Switch>
                {
                    publicRoutes.map(route =>
                        <Route {...route} key={route.path}/>
                    )
                }
                <Redirect to={RouteNames.LOGIN}/>
            </Switch>
    );
};

export default AppRouter;