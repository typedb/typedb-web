import React, { useEffect, useState } from 'react';
import { defaultLayoutStyles } from './layout-styles';
import { PageHeader } from "./page-header";
import { commonStyles } from "../common-styles";
import { PageFooter } from "./page-footer";
import { getTypeDBVersion } from "../../api/typedb-service";
import { legacySiteURL } from "../urls";

export const DefaultLayout: React.FC = ({ children }) => {
    const ownClasses = Object.assign({}, commonStyles(), defaultLayoutStyles());

    const [typeDBVersion, setTypeDBVersion] = useState("");
    useEffect(() => {
        getTypeDBVersion().then(version => {
            setTypeDBVersion(version);
        }, _error => {
            setTypeDBVersion("TypeDB");
        });
    }, []);

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
