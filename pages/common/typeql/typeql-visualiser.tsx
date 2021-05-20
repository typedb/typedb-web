import React, { useEffect } from "react";
import { runTypeQLForceGraph } from "./typeql-force-graph";
import { typeQLVisualiserStyles } from "./typeql-styles";
import MacOSWindowDots from "../../assets/graphics/macos-window-dots.svg";
import BranchIcon from "../../assets/icons/git-branch.svg";
import FetchIcon from "../../assets/icons/git-fetch.svg";
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
                <MacOSWindowDots/>
            </div>
            <div className={classes.codeAndGraph}>
                <TypeQLCode code={code}/>
                <div ref={graphPaneRef} className={classes.graphPane} />
            </div>
            <div className={classes.footer}>
                <div>TypeQL</div>
                <div className={classes.footerEnd}>
                    <div className={classes.footerEndIcon}><BranchIcon/></div>
                    <div className={classes.footerEndCaption}>master</div>
                    <div className={classes.footerEndIcon}><FetchIcon/></div>
                    <div className={classes.footerEndCaption}>fetch</div>
                </div>
            </div>
        </div>
    );
}
