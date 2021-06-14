import React, { useEffect } from "react";
import { Code, CodeSample } from "./code-sample";
import { CodeWindow } from "./code-window";
import { codeStyles } from "./code-styles";
import { VaticleTabs } from "../tabs/tabs";

interface PolyglotCodeWindowProps {
    sources: Code[];
}

interface CodeTab {
    id: string;
    name: string;
    content: React.FC;
}

export const PolyglotCodeWindow: React.FC<PolyglotCodeWindowProps> = ({ sources }) => {
    const classes = codeStyles();

    // TODO: strengthen typing
    const languageDisplayNames: {[key: string]: string} = {
        "java": "Java",
        "python": "Python",
        "nodejs": "Node.js",
        "console": "Console",
    };

    const codeTabs: CodeTab[] = sources.map(source => {
        return {
            id: source.language,
            name: languageDisplayNames[source.language],
            content: () => <CodeSample source={source}/>
        }
    });

    return (
        <CodeWindow>
            <VaticleTabs items={codeTabs} classes={{tabItem: classes.polyglotTabItem}}/>
        </CodeWindow>
    );
}
