import React from 'react';
import { pageFooterStyles } from "./layout-styles";

const PageFooter: React.FC = () => {
    const styles = pageFooterStyles();
    return (
        <footer className={styles.root}>
            Made with &lt;3 by Vaticle
        </footer>
    );
};

export default PageFooter;
