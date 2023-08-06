import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = (props) => {
    const isAuthUser = useSelector(state => state.isAuthUser);
    const { component: Component, ...rest } = props;
    return (
        <Route {...rest} render={(routeProps) => (
            isAuthUser
                ? <Redirect to="/list" />
                : <Component {...routeProps} />
        )} />
    );
};

export default PublicRoute;

