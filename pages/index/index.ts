import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';
import { vaticleMuiTheme } from '../styles/theme';
import initIconLibrary from '../assets/icons';
import { App } from './App';
import '../styles/reset.css';
import '../styles/base.scss';

initIconLibrary();

ReactDOM.render(
    React.createElement(ThemeProvider, {theme: vaticleMuiTheme, children: React.createElement(App, {graknVersion: "2.0.1"})}),
    document.getElementById('root')
);
