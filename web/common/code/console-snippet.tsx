import React from "react";
import { CodePane } from "./code-pane";
import { CodeSnippetWindowHeader, CodeSnippetWindow } from "./snippet-window";

export const ConsoleSnippet: React.FC<{ code: string }> = ({ code }) => {
    return (
        <CodeSnippetWindow>
            <CodeSnippetWindowHeader/>
            <CodePane code={{language: "console", body: code}} lines={16}/>
        </CodeSnippetWindow>
    );
}
