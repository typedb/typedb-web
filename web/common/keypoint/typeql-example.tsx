import React from "react";
import {CodePane} from "../code/code-pane";
import { CodeExampleWindow, CodeExampleWindowFooter, CodeExampleWindowHeader } from "../code/example-window";
import {keyPointStyles} from "./key-point-styles";
import { TypeDBVisualiserData } from "../typedb-visualiser/data";
import { TypeDBVisualiser } from "../typedb-visualiser/TypeDBVisualiser";

interface TypeQLSnippetProps {
    code: string;
    data: TypeDBVisualiserData.Graph;
}

export const TypeQLSnippet: React.FC<TypeQLSnippetProps> = ({code, data}) => {
    const classes = keyPointStyles();

    return (
        <CodeExampleWindow>
            <CodeExampleWindowHeader/>

            <div className={classes.typeQLExample}>
                <CodePane code={{language: "typeql", body: code}} lines={15} resizable/>
                <TypeDBVisualiser data={data} className={classes.visualiser}/>
            </div>

            <CodeExampleWindowFooter language="TypeQL"/>
        </CodeExampleWindow>
    );
}
