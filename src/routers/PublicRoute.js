import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const PublicRoute = (props) => {
    const { component: Component, isAuthUser, ...rest } = props;
    return (
        <Route {...rest} render={() => (
            isAuthUser
                ? <Redirect to="/list" />
                : <Component />
        )} />
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthUser: state.user.isAuthUser
    }
};

export default connect(mapStateToProps)(PublicRoute);

