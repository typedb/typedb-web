import React from 'react';
import { defaultLayoutStyles } from './layout-styles';
import { PageHeader } from "./page-header";
import { PageFooter } from "./page-footer";
import { vaticleStyles } from "../styles/vaticle-styles";
import { urls } from "../urls";

interface DefaultLayoutProps {
    typeDBVersion?: string;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, typeDBVersion }) => {
    const ownClasses = Object.assign({}, vaticleStyles(), defaultLayoutStyles());

    return (
        <>
            <PageHeader typeDBVersion={typeDBVersion}/>
            <div className={ownClasses.underDevelopmentRibbon}>under development</div>
            <main className={ownClasses.main}>
                <article>
                    {children}
                </article>
            </main>
            <PageFooter/>
        </>
    );
};
