import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = props => {
    const usuario = window.sessionStorage.getItem("credenciais-usuario");
    const isLogged = !!usuario
    if (isLogged) {
        return (<Route {...props} />)
    } else {
        return (<Redirect to="/"/>)
    }
}

export default PrivateRoute;