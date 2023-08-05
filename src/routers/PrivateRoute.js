 import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
    const isAuthUser = useSelector((state) => state.user.isAuthUser);
    const { component: Component, ...rest } = props;
    return (
        <Route {...rest} render={(routeProps) => (
            isAuthUser
                ? <Component {...routeProps} />
                : <Redirect to='/' />
        )} />
    );
};

export default PrivateRoute;

