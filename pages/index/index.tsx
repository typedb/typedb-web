import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';
import { vaticleMuiTheme } from '../styles/theme';
import App from './App';
import "../styles/prism.scss";
import '../styles/reset.css';
import '../styles/base.scss';
import { installPrismTypeQL } from "../common/ui/typeql/prism-typeql";

installPrismTypeQL();

ReactDOM.render(
    <ThemeProvider theme={vaticleMuiTheme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);
