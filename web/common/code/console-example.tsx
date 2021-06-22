import React from "react";
import { CodePane } from "./code-pane";
import { ExampleWindowHeader, ExampleWindow } from "./example-window";

export const ConsoleExample: React.FC<{ code: string }> = ({ code }) => {
    return (
        <ExampleWindow>
            <ExampleWindowHeader/>
            <CodePane code={{language: "console", body: code}} lines={16}/>
        </ExampleWindow>
    );
}
