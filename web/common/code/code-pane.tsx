import React, { useEffect } from "react";
import interact from "interactjs";
import PanelSlider from "../assets/graphics/panel-slider.svg";
import clsx from "clsx";
import Prism from "prismjs";
import { codeStyles } from "./code-styles";
import { Code } from "./code";

interface CodePaneProps {
    code: Code;
    lines: number;
    resizable?: boolean;
}

export const CodePane: React.FC<CodePaneProps> = ({ code, lines, resizable }) => {
    const classes = codeStyles();
    const lineNumbers = [...Array(lines).keys()].map(n => n + 1);

    if (resizable) {
        useEffect(() => {
            interact(`.${classes.codePane}.${classes.resizable}`)
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
                <pre className={clsx(classes.codeArea, resizable && classes.resizable)}>
                    <code className={clsx(`language-${code.language}`, classes.code)}>{code.body}</code>
                </pre>
                {resizable && <PanelSlider className={classes.panelSlider}/>}
            </div>
        </div>
    );
}
