/*
 Source: https://levelup.gitconnected.com/creating-a-force-graph-using-react-d3-and-pixijs-95616051aba
 */

import React from "react";
import { runForceGraphPixi } from "./force-graph-generator-pixi";
import { forceGraphStyles } from "./typeql-styles";

interface ForceGraphProps {
    linksData: any;
    nodesData: any;
    nodeHoverTooltip: any;
}

export const ForceGraph: React.FC<ForceGraphProps> = ({ linksData, nodesData, nodeHoverTooltip }) => {
    const containerRef: React.MutableRefObject<any> = React.useRef(null);
    const classes = forceGraphStyles();

    React.useEffect(() => {
        let destroyFn;

        if (containerRef.current) {
            const { destroy } = runForceGraphPixi(containerRef.current, linksData, nodesData, nodeHoverTooltip);
            destroyFn = destroy;
        }

        return destroyFn;
    }, [linksData, nodesData]);

    return <div ref={containerRef} className={classes.container} />;
}
