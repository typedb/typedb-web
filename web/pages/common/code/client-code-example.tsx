import React from "react";
import { ClassProps } from "../../../common/class-props";
import { CodeExample } from "./code-example";
import { MultiLanguageCodeVisualiser } from "../../../common/code/multi-language-code-visualiser";
import { Code } from "../../../common/code/code";

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
            <MultiLanguageCodeVisualiser id={id} sources={sources}/>
        </CodeExample>
    );
}
