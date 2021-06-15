import React from "react";
import { CodeSample } from "./code-sample";
import { CodeVisualiserFooter, CodeVisualiserHeader, CodeVisualiserWindow } from "./code-visualiser-window";
import { codeStyles } from "./code-styles";
import { VaticleTabs } from "../tabs/tabs";
import { Code, languageNames } from "./code";

interface MultiLanguageCodeVisualiserProps {
    id: string;
    sources: Code[];
}

interface CodeTab {
    id: string;
    name: string;
    content: React.FC;
}

export const MultiLanguageCodeVisualiser: React.FC<MultiLanguageCodeVisualiserProps> = ({ id, sources }) => {
    const classes = codeStyles();

    const codeTabs: CodeTab[] = sources.map(code => {
        return {
            id: `${id}-${code.language}`,
            name: languageNames[code.language],
            content: () => (
                    <>
                        <CodeSample code={code} lines={13}/>
                        <CodeVisualiserFooter language={languageNames[code.language]}/>
                    </>),
        }
    });

    return (
        <CodeVisualiserWindow>
            <CodeVisualiserHeader/>
            <VaticleTabs items={codeTabs} classes={{tabGroup: classes.multiLanguageTabGroup, tabItem: classes.multiLanguageTab, selected: classes.multiLanguageTabSelected}}/>
        </CodeVisualiserWindow>
    );
}
