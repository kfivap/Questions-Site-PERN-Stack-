// import React, {useContext} from 'react';
// import {Switch, Route, Redirect} from 'react-router-dom'
// import {authRoutes, publicRoutes} from "../Routes";
// import {MAIN_ROUTE} from "../utils/consts";
// import {Context} from "../index";

import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import { publicRoutes} from "../Routes";
import {MAIN_ROUTE} from "../utils/consts";


const AppRouter = () => {

    // const {user} = useContext(Context)


    return (
        <Switch>
            {/*{user.isAuth && authRoutes.map(({path, Component})=>*/}
            {/*    <Route key={path} path={path} component={Component} exact />*/}
            {/*)}*/}
            {publicRoutes.map(({path, Component})=>{

                return <Route key={path} path={path} component={Component} exact />}
            )}
            <Redirect to={MAIN_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;