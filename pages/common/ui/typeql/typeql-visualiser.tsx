/*
 Source: https://levelup.gitconnected.com/creating-a-force-graph-using-react-d3-and-pixijs-95616051aba
 */

import React from "react";
import { runTypeQLForceGraph } from "./typeql-force-graph";
import { typeQLVisualiserStyles } from "./typeql-styles";

interface VisualiserProps {
    data: Graph;
}

interface Graph {
    edges: any[];
    vertices: any[];
}

export const TypeQLVisualiser: React.FC<VisualiserProps> = ({ data }) => {
    const containerRef: React.MutableRefObject<any> = React.useRef(null);
    const classes = typeQLVisualiserStyles();

    React.useEffect(() => {
        let destroyFn;

        if (containerRef.current) {
            const { destroy } = runTypeQLForceGraph(containerRef.current, data.edges, data.vertices);
            destroyFn = destroy;
        }

        return destroyFn;
    }, [data.edges, data.vertices]);

    return <div ref={containerRef} className={classes.container} />;
}
