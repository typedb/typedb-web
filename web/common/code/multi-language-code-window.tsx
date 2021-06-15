import React from "react";
import { Code, CodeSample } from "./code-sample";
import { CodeWindow } from "./code-window";
import { codeStyles } from "./code-styles";
import { VaticleTabs } from "../tabs/tabs";

interface MultiLanguageCodeWindowProps {
    id: string;
    sources: Code[];
}

interface CodeTab {
    id: string;
    name: string;
    content: React.FC;
}

export const MultiLanguageCodeWindow: React.FC<MultiLanguageCodeWindowProps> = ({ id, sources }) => {
    const classes = codeStyles();

    // TODO: strengthen typing
    const languageDisplayNames: {[key: string]: string} = {
        "java": "Java",
        "python": "Python",
        "nodejs": "Node.js",
        "console": "Console",
    };

    const codeTabs: CodeTab[] = sources.map(code => {
        return {
            id: `${id}-${code.language}`,
            name: languageDisplayNames[code.language],
            content: () => <CodeSample code={code} lines={13}/>
        }
    });

    return (
        <CodeWindow>
            <VaticleTabs items={codeTabs} classes={{tabGroup: classes.multiLanguageTabGroup, tabItem: classes.multiLanguageTab, selected: classes.multiLanguageTabSelected}}/>
        </CodeWindow>
    );
}
