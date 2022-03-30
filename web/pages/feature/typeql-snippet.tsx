import React from "react";
import {CodePane} from "../../common/code/code-pane";
import { CodeSnippetWindow, CodeSnippetWindowFooter, CodeSnippetWindowHeader } from "../../common/code/snippet-window";
import {featureStyles} from "./feature-styles";
import { TypeDBVisualiserData } from "../../common/typedb-visualiser/data";
import { TypeDBVisualiser } from "../../common/typedb-visualiser/TypeDBVisualiser";

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
