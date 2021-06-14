import React, { useEffect } from "react";
import interact from "interactjs";
import PanelSlider from "../assets/graphics/panel-slider.svg";
import clsx from "clsx";
import Prism from "prismjs";
import { codeStyles } from "./code-styles";

export interface Code {
    language: string;
    body: string;
}

interface CodeSampleProps {
    source?: Code;
    sources?: Code[];
    resizable?: boolean;
}

export const CodeSample: React.FC<CodeSampleProps> = ({ source, sources, resizable }) => {
    const classes = codeStyles();

    const lineNumbers = [...Array(sources ? 13 : 15).keys()].map(n => n + 1);

    if (resizable) {
        useEffect(() => {
            interact(`.${classes.codePane}`)
                .resizable({
                    edges: { right: true },
                    listeners: {
                        move: (event) => {
                            const scale = event.target.getBoundingClientRect().width / event.target.offsetWidth;
                            let width = event.rect.width / scale;
                            if (width < 110) width = 110;
                            if (width > 600) width = 600;
                            event.target.style.width = `${width}px`;
                        }
                    }
                })
                .on("resizestart", (event) => {
                    event.target.style["user-select"] = "none";
                })
                .on("resizeend", (event) => {
                    event.target.style["user-select"] = "text";
                });
        }, []);
    }

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className={clsx(classes.codePane, resizable && classes.resizable)}>
            <div className={classes.lineNumbersSection}>
                <ol className={classes.lineNumbers}>
                    {lineNumbers.map(n => <li>{n}</li>)}
                </ol>
            </div>
            <div className={classes.codeSection}>
                <pre className={classes.codeArea}>
                    <code className={clsx(`language-${source.language}`, classes.code)}>{source.body}</code>
                </pre>
                {resizable && <PanelSlider className={classes.panelSlider}/>}
            </div>
        </div>
    );
}
