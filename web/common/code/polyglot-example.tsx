import React from "react";
import { CodePane } from "./code-pane";
import { CodeExampleWindowFooter, CodeExampleWindowHeader, CodeExampleWindow } from "./example-window";
import { codeStyles } from "./code-styles";
import { VaticleTabs } from "../tabs/tabs";
import { Code, languageNames } from "./code";

interface PolyglotCodeExampleProps {
    id: string;
    sources: Code[];
}

interface PolyglotCodeExampleTab {
    id: string;
    name: string;
    content: React.FC;
}

export const PolyglotCodeExample: React.FC<PolyglotCodeExampleProps> = ({ id, sources }) => {
    const classes = codeStyles();

    const codeTabs: PolyglotCodeExampleTab[] = sources.map(code => {
        return {
            id: `${id}-${code.language}`,
            name: languageNames[code.language],
            content: () => (
                    <>
                        <CodePane code={code} lines={code.language === "console" ? 14 : 13}/>
                        {code.language !== "console" && <CodeExampleWindowFooter language={languageNames[code.language]}/>}
                    </>),
        }
    });

    return (
        <CodeExampleWindow>
            <CodeExampleWindowHeader/>
            <VaticleTabs items={codeTabs} classes={{root: classes.polyglotTabs, tabGroup: classes.polyglotTabGroup,
                tabItem: classes.polyglotTab, selected: classes.polyglotTabSelected, tabContent: classes.polyglotTabContent}}/>
        </CodeExampleWindow>
    );
}
