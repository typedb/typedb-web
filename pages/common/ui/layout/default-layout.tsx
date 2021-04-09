import clsx from 'clsx';
import React from 'react';
import PageFooter from './page-footer';
import { defaultLayoutStyles } from './layout-styles';
import { PageHeader } from "./page-header";

interface DefaultLayoutProps {
    classes?: Partial<Record<'main', string>>;
    navigation?: React.ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({
    classes,
    children,
    navigation
}) => {
    const ownClasses = defaultLayoutStyles();

    return (
        <>
            <PageHeader graknVersion={"2.0.1"} />
            <main className={clsx(ownClasses.main, classes?.main)}>
                {navigation}
                {children}
            </main>
            <PageFooter />
        </>
    );
};
