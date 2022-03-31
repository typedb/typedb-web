import React from "react";
import { CodePane } from "./code-pane";
import { CodeExampleWindowHeader, CodeExampleWindow } from "./example-window";

export const ConsoleCodeExample: React.FC<{ code: string }> = ({ code }) => {
    return (
        <CodeExampleWindow>
            <CodeExampleWindowHeader/>
            <CodePane code={{language: "console", body: code}} lines={16}/>
        </CodeExampleWindow>
    );
}
