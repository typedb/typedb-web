import clsx from 'clsx';
import React from 'react';
import { defaultLayoutStyles } from './layout-styles';
import { PageHeader } from "./page-header";
import { commonStyles } from "../common-styles";
import { PageFooter } from "./page-footer";

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

    return (
        <>
            <PageHeader typeDBVersion={"2.0.1"}/>
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
