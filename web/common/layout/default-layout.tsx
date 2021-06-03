import React from 'react';
import { defaultLayoutStyles } from './layout-styles';
import { PageHeader } from "./page-header";
import { PageFooter } from "./page-footer";
import { vaticleStyles } from "../styles/vaticle-styles";
import { urls } from "../urls";

export const DefaultLayout: React.FC = ({ children }) => {
    const ownClasses = Object.assign({}, vaticleStyles(), defaultLayoutStyles());

    return (
        <>
            <PageHeader/>
            <div className={ownClasses.underDevelopmentRibbon}>site under development</div>
            <main className={ownClasses.main}>
                <article>
                    {children}
                </article>
            </main>
            <PageFooter/>
        </>
    );
};
