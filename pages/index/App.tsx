import React from 'react';
import { useStyles } from './styles';
import { Router } from "./Router";

export interface AppProps {
    graknVersion: string;
}

export const App: React.FC<AppProps> = ({graknVersion}) => {
    const ownClasses = useStyles();

    return (
        <div className={ownClasses.root}>
            <Router graknVersion={graknVersion} />
        </div>
    );
};
