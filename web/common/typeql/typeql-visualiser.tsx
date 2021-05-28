import React, { useEffect } from "react";
import { runTypeQLForceGraph } from "./typeql-force-graph";
import { typeQLVisualiserStyles } from "./typeql-styles";
import MacOSWindow from "../assets/graphics/macos-window.svg";
import TypeQLVisualiserFooter from "../assets/graphics/typeql-visualiser-footer.svg";
import { TypeQLCode } from "./typeql-code";
import { TypeQLGraph } from "./typeql-data";

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
                <TypeQLCode code={code}/>
                <div className={classes.graphPaneBG} />
                <div ref={graphPaneRef} className={classes.graphPane} />
            </div>
            <div>
                <TypeQLVisualiserFooter/>
            </div>
        </div>
    );
}
