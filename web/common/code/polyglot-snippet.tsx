import React from "react";
import { CodePane } from "./code-pane";
import { CodeSnippetWindowFooter, CodeSnippetWindowHeader, CodeSnippetWindow } from "./snippet-window";
import { codeStyles } from "./code-styles";
import { VaticleTabs } from "../tabs/tabs";
import { Code, languageNames } from "./code";

interface PolyglotSnippetProps {
    id: string;
    sources: Code[];
}

interface PolyglotSnippetTab {
    id: string;
    name: string;
    content: React.FC;
}

export const PolyglotSnippet: React.FC<PolyglotSnippetProps> = ({ id, sources }) => {
    const classes = codeStyles();

    const codeTabs: PolyglotSnippetTab[] = sources.map(code => {
        return {
            id: `${id}-${code.language}`,
            name: languageNames[code.language],
            content: () => (
                    <>
                        <CodePane code={code} lines={code.language === "console" ? 14 : 13}/>
                        {code.language !== "console" && <CodeSnippetWindowFooter language={languageNames[code.language]}/>}
                    </>),
        }
    });

    return (
        <CodeSnippetWindow>
            <CodeSnippetWindowHeader/>
            <VaticleTabs items={codeTabs} classes={{root: classes.polyglotTabs, tabGroup: classes.polyglotTabGroup,
                tabItem: classes.polyglotTab, selected: classes.polyglotTabSelected, tabContent: classes.polyglotTabContent}}/>
        </CodeSnippetWindow>
    );
}
