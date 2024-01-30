import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/layouts/PrivateRoute";
import { routes } from "./routes/router";
import Loading from "./components/common/Loading";
import {useSelector } from "react-redux";
import LoadingOverlay from "./components/common/Overlay";

export default function Routing() {
  const { loadingStatus } = useSelector(
    (state) => state.global
  );

  const routerComponent = Object.values(routes).map((value, index) => (
    <Route
      key={index.toString()}
      path={value.path}
      element={<PrivateRoute title={value.title} component={value.component} />}
    />
  ));

  return (
    <>
      {loadingStatus && <Loading />}
      {loadingStatus && <LoadingOverlay />}
      <Router>
        <Routes>{routerComponent}</Routes>
      </Router>
    </>
  );
}
