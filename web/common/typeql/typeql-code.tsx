import React, { useEffect } from "react";
import interact from "interactjs";
import { typeQLVisualiserStyles } from "./typeql-styles";
import PanelSlider from "../assets/graphics/panel-slider.svg";
import clsx from "clsx";
import Prism from "prismjs";

interface TypeQLCodeProps {
    code: string;
}

const lineNumbers = [...Array(14).keys()].map(n => n + 1);

export const TypeQLCode: React.FC<TypeQLCodeProps> = ({ code }) => {
    const classes = typeQLVisualiserStyles();

    useEffect(() => {
        interact(`.${classes.codePane}`)
            .resizable({
                edges: { right: true },
                listeners: {
                    move: (event) => {
                        let width = event.rect.width;
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

        Prism.highlightAll();
    }, []);

    return (
        <div className={classes.codePane}>
            <div className={classes.lineNumbersSection}>
                <ol className={classes.lineNumbers}>
                    {lineNumbers.map(n => <li>{n}</li>)}
                </ol>
            </div>
            <div className={classes.codeSection}>
                <pre className={classes.codeArea}>
                    <code className={clsx("language-typeql", classes.code)}>{code}</code>
                </pre>
                <PanelSlider className={classes.panelSlider}/>
            </div>
        </div>
    );
}
