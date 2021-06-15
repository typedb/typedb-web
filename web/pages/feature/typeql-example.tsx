import React from "react";
import {TypeQLGraph} from "../../common/typeql/typeql-data";
import {CodePane} from "../../common/code/code-pane";
import {ExampleWindow, ExampleWindowFooter} from "../../common/code/example-window";
import {TypeQLVisualiser} from "../../common/typeql/typeql-visualiser";
import {featureStyles} from "./feature-styles";

interface TypeQLExampleProps {
    code: string;
    data: TypeQLGraph;
}

export const TypeQLExample: React.FC<TypeQLExampleProps> = ({code, data}) => {
    const classes = featureStyles();

    return (
        <ExampleWindow>
            <div className={classes.typeQLExample}>
                <CodePane code={{language: "typeql", body: code}} lines={15} resizable/>
                <TypeQLVisualiser data={data}/>
            </div>
            <ExampleWindowFooter language="TypeQL"/>
        </ExampleWindow>
    );
}
