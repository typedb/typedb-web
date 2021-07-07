import React from "react";
import {CodePane} from "../../common/code/code-pane";
import { ExampleWindow, ExampleWindowFooter, ExampleWindowHeader } from "../../common/code/example-window";
import {featureStyles} from "./feature-styles";
import { TypeQLGraph, TypeQLVisualiserPixiJSLegacy as TypeQLVisualiser } from "typedb-visualiser";

interface TypeQLExampleProps {
    code: string;
    data: TypeQLGraph;
}

export const TypeQLExample: React.FC<TypeQLExampleProps> = ({code, data}) => {
    const classes = featureStyles();

    return (
        <ExampleWindow>
            <ExampleWindowHeader/>

            <div className={classes.typeQLExample}>
                <CodePane code={{language: "typeql", body: code}} lines={15} resizable/>
                <TypeQLVisualiser data={data}/>
            </div>

            <ExampleWindowFooter language="TypeQL"/>
        </ExampleWindow>
    );
}
