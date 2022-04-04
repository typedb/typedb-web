import React from "react";
import { GitWindowFooter } from "../graphics/git-window-footer";
import { codeStyles } from "./code-styles";
import { LanguageDisplayName } from "./code";
import { vaticleStyles } from "../styles/vaticle-styles";
import { MacOSWindowHeader } from "../graphics/macos-window-header";
import clsx from "clsx";

export const CodeExampleWindow: React.FC = ({ children }) => {
    const classes = Object.assign({}, vaticleStyles(), codeStyles());

    return (
        <div className={clsx(classes.window, classes.contentMargin)}>
            <div className={classes.windowContent}>{children}</div>
        </div>
    );
}

export const CodeExampleWindowHeader: React.FC = () => <MacOSWindowHeader width={660}/>;

interface CodeSnippetWindowFooterProps {
    language?: LanguageDisplayName;
}

export const CodeExampleWindowFooter: React.FC<CodeSnippetWindowFooterProps> = ({language}) => <GitWindowFooter language={language} width={660}/>;
