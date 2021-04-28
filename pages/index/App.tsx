import React from 'react';
import { useStyles } from './styles';
import Router from './router';

const App: React.FC = () => {
    const ownClasses = useStyles();

    return (
        <div className={ownClasses.root}>
            <Router />
        </div>
    );
};

export default App;
