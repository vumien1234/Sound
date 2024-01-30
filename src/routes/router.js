import React from "react";
import Login from "../modules/auth/Login";
import Home from "../modules/home/Home";

const injectProps = (props, Component) => {
    return <Component {...props} />;
};

export const routes = {
    login: {
        exact: false,
        path: "/login",
        component: (props) => injectProps(props, Login),
        title: "login",
    },
    home: {
        exact: false,
        path: "/",
        component: (props) => injectProps(props, Home),
        title: "home",
    },
};
