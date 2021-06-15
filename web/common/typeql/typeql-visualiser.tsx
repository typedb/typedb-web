import React, { useEffect, useRef } from "react";
import { runTypeQLForceGraph } from "./typeql-force-graph";
import { typeQLVisualiserStyles } from "./typeql-styles";
import { TypeQLGraph } from "./typeql-data";
import { CodeSample } from "../code/code-sample";
import { CodeVisualiserFooter, CodeVisualiserWindow } from "../code/code-visualiser-window";

interface VisualiserProps {
    code: string;
    data: TypeQLGraph;
}

export const TypeQLVisualiser: React.FC<VisualiserProps> = ({ code, data }) => {
    const graphPaneRef: React.MutableRefObject<any> = useRef(null);
    const classes = typeQLVisualiserStyles();

    useEffect(() => {
        let destroyFn;

        if (graphPaneRef.current) {
            const { destroy } = runTypeQLForceGraph(graphPaneRef.current, data);
            destroyFn = destroy;
        }

        return destroyFn;
    }, [data]);

    return (
        <CodeVisualiserWindow>
            <div className={classes.codeAndGraph}>
                <CodeSample code={{language: "typeql", body: code}} lines={15} resizable/>
                <div className={classes.graphPaneBG} />
                <div ref={graphPaneRef} className={classes.graphPane} />
            </div>
            <CodeVisualiserFooter language="TypeQL"/>
        </CodeVisualiserWindow>
    );
}
