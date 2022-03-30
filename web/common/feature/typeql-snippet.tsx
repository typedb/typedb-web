import React from "react";
import {CodePane} from "../code/code-pane";
import { CodeSnippetWindow, CodeSnippetWindowFooter, CodeSnippetWindowHeader } from "../code/snippet-window";
import {featureStyles} from "./feature-styles";
import { TypeDBVisualiserData } from "../typedb-visualiser/data";
import { TypeDBVisualiser } from "../typedb-visualiser/TypeDBVisualiser";

interface TypeQLSnippetProps {
    code: string;
    data: TypeDBVisualiserData.Graph;
}

export const TypeQLSnippet: React.FC<TypeQLSnippetProps> = ({code, data}) => {
    const classes = featureStyles();

    return (
        <CodeSnippetWindow>
            <CodeSnippetWindowHeader/>

            <div className={classes.typeQLSnippet}>
                <CodePane code={{language: "typeql", body: code}} lines={15} resizable/>
                <TypeDBVisualiser data={data} className={classes.visualiser}/>
            </div>

            <CodeSnippetWindowFooter language="TypeQL"/>
        </CodeSnippetWindow>
    );
}
