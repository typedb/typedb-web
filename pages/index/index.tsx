import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';
import createVaticleTheme from '../common/ui/styles/theme';
import initIconLibrary from '../common/ui/assets/icons';
import App from './App';
import '../common/ui/styles/reset.css';
import '../common/ui/styles/base.scss';

initIconLibrary();

ReactDOM.render(
    <ThemeProvider theme={createVaticleTheme({})}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);
