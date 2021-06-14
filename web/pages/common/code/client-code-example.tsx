import React from "react";
import { ClassProps } from "../../../common/class-props";
import { CodeExample } from "./code-example";
import { Code } from "../../../common/code/code-sample";
import { PolyglotCodeWindow } from "../../../common/code/polyglot-code-window";

export interface ClientCodeExampleProps extends ClassProps {
    title: string;
    body: string;
    sources: Code[];
    codePosition: "left" | "right";
    buttonText: "Learn More" | "Documentation";
}

export const ClientCodeExample: React.FC<ClientCodeExampleProps> = ({className, title, body, sources, codePosition, buttonText}) => {
    return (
        <CodeExample className={className} title={title} body={body} buttonText={buttonText} diagramPosition={codePosition}>
            <PolyglotCodeWindow sources={sources}/>
        </CodeExample>
    );
}
