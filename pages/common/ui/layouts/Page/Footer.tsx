import React from 'react';
import { useFooterStyles } from './styles';

const PageFooter: React.FC = () => {
    const ownClasses = useFooterStyles();
    return (
        <footer className={ownClasses.root}>
            Made with &lt;3 by Vaticle
        </footer>
    );
};

export default PageFooter;
