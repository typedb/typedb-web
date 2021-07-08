import React from "react";
import {CodePane} from "../../common/code/code-pane";
import { ExampleWindow, ExampleWindowFooter, ExampleWindowHeader } from "../../common/code/example-window";
import {featureStyles} from "./feature-styles";
import { TypeDBStaticVisualiser, TypeDBVisualiserData } from "typedb-visualiser";

interface TypeQLExampleProps {
    code: string;
    data: TypeDBVisualiserData.Graph;
}

export const TypeQLExample: React.FC<TypeQLExampleProps> = ({code, data}) => {
    const classes = featureStyles();

    return (
        <ExampleWindow>
            <ExampleWindowHeader/>

            <div className={classes.typeQLExample}>
                <CodePane code={{language: "typeql", body: code}} lines={15} resizable/>
                <TypeDBStaticVisualiser data={data} className={classes.visualiser}/>
            </div>

            <ExampleWindowFooter language="TypeQL"/>
        </ExampleWindow>
    );
}
