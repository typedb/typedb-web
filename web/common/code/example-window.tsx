import React from "react";
import { codeStyles, codeVisualiserFooterStyles } from "./code-styles";
import { LanguageDisplayName } from "./code";
import { vaticleStyles } from "../styles/vaticle-styles";
import MacOSWindow from "../assets/graphics/macos-window.svg";
import BranchIcon from "../assets/graphics/branch.svg";
import FetchIcon from "../assets/graphics/fetch.svg";
import clsx from "clsx";

export const ExampleWindow: React.FC = ({ children }) => <div className={codeStyles().windowContainer}>{children}</div>;

export const ExampleWindowHeader: React.FC = () => <div className={codeStyles().windowHeader}><MacOSWindow/></div>;

interface ExampleWindowFooterProps {
    language: LanguageDisplayName;
}

export const ExampleWindowFooter: React.FC<ExampleWindowFooterProps> = ({language}) => {
    const classes = Object.assign({}, vaticleStyles(), codeVisualiserFooterStyles());

    return (
        <div className={clsx(classes.root)}>
            <div>{language}</div>

            <div className={classes.filler}/>

            <BranchIcon className={classes.icon}/><span className={classes.iconLabel}>master</span>
            <FetchIcon className={classes.icon}/><span className={classes.iconLabel}>fetch</span>
        </div>
    );
};
