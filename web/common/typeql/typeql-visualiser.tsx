import React, {useEffect, useRef} from "react";
import {TypeQLGraph} from "./typeql-data";
import {runTypeQLForceGraph} from "./typeql-force-graph";
import {typeQLVisualiserStyles} from "./typeql-styles";

interface VisualiserProps {
    data: TypeQLGraph;
}

export const TypeQLVisualiser: React.FC<VisualiserProps> = ({data}) => {
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

    return <div ref={graphPaneRef} className={classes.graphPane} />;
}