import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { LOGOUT } from './actions/types';
import BottomNavbar from "./components/layout/BottomNavbar";


import {Provider} from 'react-redux';
import store from "./store";
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Routes from "./components/routing/Routes";

const App = () => {
  //run only once and only update if properties change
  useEffect(() => {
    // check for token in localstorage
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route component={Routes} />
            </Switch>
            <BottomNavbar/>
          </Fragment>
        </Router>
      </Provider>
  );
};
export default App;
