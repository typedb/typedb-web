import React from "react";
import { ClassProps } from "../../../common/class-props";
import { CodeExample } from "./code-example";
import { Code } from "../../../common/code/code-sample";
import { MultiLanguageCodeWindow } from "../../../common/code/multi-language-code-window";

export interface ClientCodeExampleProps extends ClassProps {
    id: string;
    title: string;
    body: string;
    sources: Code[];
    codePosition: "left" | "right";
    buttonText: "Learn More" | "Documentation";
}

export const ClientCodeExample: React.FC<ClientCodeExampleProps> = ({className, id, title, body, sources, codePosition, buttonText}) => {
    return (
        <CodeExample className={className} title={title} body={body} buttonText={buttonText} diagramPosition={codePosition}>
            <MultiLanguageCodeWindow id={id} sources={sources}/>
        </CodeExample>
    );
}
