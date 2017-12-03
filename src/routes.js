import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import AboutPage from 'pages/AboutPage';
import SlackPage from 'pages/SlackPage';
import CareersPage from 'pages/CareersPage';
import CommunityPage from 'pages/CommunityPage';

const Main = () => (
  <main className="main">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/slack" component={SlackPage} />
      <Route exact path="/careers" component={CareersPage} />
      <Route exact path="/community" component={CommunityPage} />
    </Switch>
  </main>
);

export default Main;
