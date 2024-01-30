import React from "react";
import { Provider } from "react-redux";
import Routing from "./routing";
import store from "./config/store";
import './asset/styles/app.scss';
import './asset/styles/app.css';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routing/>
      </Provider>
    </>
  );
}

export default App;
