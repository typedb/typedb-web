import React from "react";
import { TypeDBVisualiserData } from "./data";
import { defaultTypeDBVisualiserTheme } from "./styles";
import { renderGraph } from "./renderer";

interface VisualiserProps {
    data: TypeDBVisualiserData.Graph;
    className?: string;
}

export const TypeDBVisualiser: React.FC<VisualiserProps> = ({data, className}) => {
    const graphPaneRef: React.MutableRefObject<any> = React.useRef(null);

    React.useEffect(() => {
        let destroyFn;

        if (graphPaneRef.current) {
            const { destroy } = renderGraph(graphPaneRef.current, data, defaultTypeDBVisualiserTheme);
            destroyFn = destroy;
        }

        return destroyFn;
    }, [data]);

    return <div ref={graphPaneRef} className={className}/>;
};
