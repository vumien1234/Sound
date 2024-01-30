// PrivateRoute.js
import React from "react";
import LayoutPage from "./Layout";

export const PrivateRoute = ({ component, ...rest }) => {
  return <LayoutPage title={rest.title} value={rest.value}>{component({ ...rest })}</LayoutPage>;
};
