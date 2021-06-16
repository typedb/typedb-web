import React from "react";
import { CodePane } from "./code-pane";
import { ExampleWindowFooter, ExampleWindowHeader, ExampleWindow } from "./example-window";
import { codeStyles } from "./code-styles";
import { VaticleTabs } from "../tabs/tabs";
import { Code, languageNames } from "./code";

interface PolyglotExampleProps {
    id: string;
    sources: Code[];
}

interface PolygotExampleTab {
    id: string;
    name: string;
    content: React.FC;
}

export const PolyglotExample: React.FC<PolyglotExampleProps> = ({ id, sources }) => {
    const classes = codeStyles();

    const codeTabs: PolygotExampleTab[] = sources.map(code => {
        return {
            id: `${id}-${code.language}`,
            name: languageNames[code.language],
            content: () => (
                    <>
                        <CodePane code={code} lines={code.language === "console" ? 14 : 13}/>
                        {code.language !== "console" && <ExampleWindowFooter language={languageNames[code.language]}/>}
                    </>),
        }
    });

    return (
        <ExampleWindow>
            <ExampleWindowHeader/>
            <VaticleTabs items={codeTabs} classes={{root: classes.polyglotTabs, tabGroup: classes.polyglotTabGroup,
                tabItem: classes.polyglotTab, selected: classes.polyglotTabSelected, tabContent: classes.polyglotTabContent}}/>
        </ExampleWindow>
    );
}
