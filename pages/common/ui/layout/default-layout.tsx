import React from 'react';
import { defaultLayoutStyles } from './layout-styles';
import { PageHeader } from "./page-header";
import { PageFooter } from "./page-footer";

interface DefaultLayoutProps {
    graknVersion: string;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({children, graknVersion}) => {
    const ownClasses = defaultLayoutStyles();

    return (
        <>
            <PageHeader graknVersion={graknVersion} />
            <main className={ownClasses.main}>{children}</main>
            <PageFooter />
        </>
    );
};
