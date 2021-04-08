import clsx from 'clsx';
import React from 'react';
import PageHeader from './Header';
import PageFooter from './Footer';
import { useStyles } from './styles';

interface LayoutPageProps {
    classes?: Partial<Record<'main', string>>;
    navigation?: React.ReactNode;
}

const LayoutPage: React.FC<LayoutPageProps> = ({
    classes,
    children,
    navigation
}) => {
    const ownClasses = useStyles();

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

export default LayoutPage;
