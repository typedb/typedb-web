import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { defaultLayoutStyles } from './layout-styles';
import { PageHeader } from "./page-header";
import { commonStyles } from "../common-styles";
import { PageFooter } from "./page-footer";
import { getTypeDBVersion } from "../../../api/typedb-service";

interface DefaultLayoutProps {
    classes?: Partial<Record<'main', string>>;
    navigation?: React.ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({
    classes,
    children,
    navigation
}) => {
    const ownClasses = Object.assign({}, commonStyles(), defaultLayoutStyles());

    const [typeDBVersion, setTypeDBVersion] = useState("");
    useEffect(() => {
        getTypeDBVersion().then(version => {
            setTypeDBVersion(version);
        }, error => {
            console.error(error);
            setTypeDBVersion("TypeDB");
        });
    }, []);

    return (
        <>
            <PageHeader typeDBVersion={typeDBVersion}/>
            <main className={clsx(ownClasses.main, classes?.main)}>
                {navigation}
                <article>
                    <section className={ownClasses.sectionMarginSmall}>
                        <p className={ownClasses.underDevelopment}>
                            This site is currently under development - please use <a href="https://grakn.ai" className={ownClasses.underDevelopmentLink}>https://grakn.ai</a>
                        </p>
                    </section>
                    {children}
                </article>
            </main>
            <PageFooter/>
        </>
    );
};
