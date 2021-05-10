import React from 'react';
import { indexStyles } from './index-styles';
import Router from './router';

const App: React.FC = () => {
    const classes = indexStyles();

    return (
        <div className={classes.root}>
            <Router />
        </div>
    );
};

export default App;
