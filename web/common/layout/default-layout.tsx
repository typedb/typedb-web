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
            <main className={ownClasses.main}>
                <article>
                    <section className={ownClasses.sectionMarginSmall}>
                        <p className={ownClasses.underDevelopment}>
                            This site is currently under development - please use <a href={urls.legacySite} className={ownClasses.underDevelopmentLink}>{urls.legacySite}</a>
                        </p>
                    </section>
                    {children}
                </article>
            </main>
            <PageFooter/>
        </>
    );
};
