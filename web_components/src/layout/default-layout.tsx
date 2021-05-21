import React from 'react';
import { defaultLayoutStyles } from './layout-styles';
import { PageHeader } from "./page-header";
import { PageFooter } from "./page-footer";
import { legacySiteURL } from "../urls";
import { vaticleStyles } from "../styles/vaticle-styles";

interface DefaultLayoutProps {
    typeDBVersion?: string;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, typeDBVersion }) => {
    const ownClasses = Object.assign({}, vaticleStyles(), defaultLayoutStyles());

    return (
        <>
            <PageHeader typeDBVersion={typeDBVersion}/>
            <main className={ownClasses.main}>
                <article>
                    <section className={ownClasses.sectionMarginSmall}>
                        <p className={ownClasses.underDevelopment}>
                            This site is currently under development - please use <a href={legacySiteURL} className={ownClasses.underDevelopmentLink}>{legacySiteURL}</a>
                        </p>
                    </section>
                    {children}
                </article>
            </main>
            <PageFooter/>
        </>
    );
};
