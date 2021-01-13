import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {
  HOME_PAGE,
  ABOUT_PAGE
} from '../config';

import HeaderComponent from './HeaderComponent';

import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage";

const Root = () => {
  return (
    <Router>
      <HeaderComponent />
      <Switch>
        <Route exact path={HOME_PAGE} component={HomePage} />
        <Route path={ABOUT_PAGE} component={AboutPage} />
      </Switch>
    </Router>
  )
};

export default Root;
