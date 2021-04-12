import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';
import { vaticleMuiTheme } from '../styles/theme';
import initIconLibrary from '../assets/icons';
import App from './App';
import '../styles/reset.css';
import '../styles/base.scss';

initIconLibrary();

ReactDOM.render(
    <ThemeProvider theme={vaticleMuiTheme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);
