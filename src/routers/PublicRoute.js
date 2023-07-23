import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect, useSelector } from "react-redux";

const PublicRoute = (props) => {
    const isAuthUser = useSelector(state => state.user.isAuthUser);
    // const { component: Component, isAuthUser, ...rest } = props;
    const { component: Component, ...rest } = props;
    return (
        <Route {...rest} render={(routeProps) => (
            isAuthUser
                ? <Redirect to="/list" />
                : <Component {...routeProps} />
        )} />
    );
};

// const mapStateToProps = (state) => {
//     return {
//         isAuthUser: state.user.isAuthUser
//     }
// };

// export default connect(mapStateToProps)(PublicRoute);
export default PublicRoute;

