import React from "react";
import { codeStyles, codeVisualiserFooterStyles } from "./code-styles";
import { LanguageDisplayName } from "./code";
import { vaticleStyles } from "../styles/vaticle-styles";
import MacOSWindow from "../assets/graphics/macos-window.svg";
import BranchIcon from "../assets/graphics/branch.svg";
import FetchIcon from "../assets/graphics/fetch.svg";
import clsx from "clsx";

export const CodeVisualiserWindow: React.FC = ({ children }) => <div className={codeStyles().windowContainer}>{children}</div>;

export const CodeVisualiserHeader: React.FC = () => <div className={codeStyles().windowHeader}><MacOSWindow/></div>;

interface CodeVisualiserFooterProps {
    language: LanguageDisplayName;
}

export const CodeVisualiserFooter: React.FC<CodeVisualiserFooterProps> = ({language}) => {
    const classes = Object.assign({}, vaticleStyles(), codeVisualiserFooterStyles());

    return (
        <div className={clsx(classes.root, classes.smallText)}>
            <div>{language}</div>

            <div className={classes.filler}/>

            <BranchIcon/><span>master</span>
            <FetchIcon/><span>fetch</span>
        </div>
    );
};
