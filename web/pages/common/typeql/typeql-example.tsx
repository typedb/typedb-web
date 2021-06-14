import React from "react";
import { TypeQLVisualiser } from "../../../common/typeql/typeql-visualiser";
import { TypeQLGraph } from "../../../common/typeql/typeql-data";
import { ClassProps } from "../../../common/class-props";
import { CodeExample } from "../code/code-example";

export interface TypeQLExampleProps extends ClassProps {
    title: string;
    body: string;
    code: string;
    graphData: TypeQLGraph;
    visualiserPosition: "left" | "right";
    buttonText: "Learn More" | "Documentation";
}

export const TypeQLExample: React.FC<TypeQLExampleProps> = ({className, title, body, code, graphData, visualiserPosition, buttonText}) => {
    return (
        <CodeExample className={className} title={title} body={body} buttonText={buttonText} diagramPosition={visualiserPosition}>
            <TypeQLVisualiser code={code} data={graphData} />
        </CodeExample>
    );
}
