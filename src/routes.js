import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import AboutPage from 'pages/AboutPage';
import SlackPage from 'pages/SlackPage';
import CareersPage from 'pages/CareersPage';

const Main = () => (
  <main className="main">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/slack" component={SlackPage} />
    </Switch>
  </main>
);

export default Main;
