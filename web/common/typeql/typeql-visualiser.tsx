import React, { useEffect } from "react";
import { runTypeQLForceGraph } from "./typeql-force-graph";
import { typeQLVisualiserStyles } from "./typeql-styles";
import MacOSWindow from "../assets/graphics/macos-window.svg";
import TypeQLVisualiserFooter from "../assets/graphics/typeql-visualiser-footer.svg";
import { TypeQLGraph } from "./typeql-data";
import { CodeSample } from "../code/code-sample";

interface VisualiserProps {
    code: string;
    data: TypeQLGraph;
}

export const TypeQLVisualiser: React.FC<VisualiserProps> = ({ code, data }) => {
    const graphPaneRef: React.MutableRefObject<any> = React.useRef(null);
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
        <div className={classes.container}>
            <div className={classes.header}>
                <MacOSWindow/>
            </div>
            <div className={classes.codeAndGraph}>
                <CodeSample source={{language: "typeql", body: code}} resizable/>
                <div className={classes.graphPaneBG} />
                <div ref={graphPaneRef} className={classes.graphPane} />
            </div>
            <div>
                <TypeQLVisualiserFooter/>
            </div>
        </div>
    );
}
