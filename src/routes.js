import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage';
import AboutPage from 'containers/AboutPage';

const Main = () => (
  <main className="main">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={AboutPage} />
    </Switch>
  </main>
);

export default Main;
