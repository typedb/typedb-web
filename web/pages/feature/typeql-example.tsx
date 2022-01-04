import React from "react";
import {CodePane} from "../../common/code/code-pane";
import { ExampleWindow, ExampleWindowFooter, ExampleWindowHeader } from "../../common/code/example-window";
import {featureStyles} from "./feature-styles";
import { TypeDBVisualiserData } from "../../common/typedb-visualiser/data";
import { TypeDBVisualiser } from "../../common/typedb-visualiser/TypeDBVisualiser";

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
                <TypeDBVisualiser data={data} className={classes.visualiser}/>
            </div>

            <ExampleWindowFooter language="TypeQL"/>
        </ExampleWindow>
    );
}
