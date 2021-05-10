import React, { useEffect } from "react";
import interact from "interactjs";
import { typeQLVisualiserStyles } from "./typeql-styles";
import PanelSlider from "../../../assets/images/panel-slider.svg";

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
                        if (width < 52) width = 52;
                        if (width > 620) width = 620;
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

    return (
        <div className={classes.codePane}>
            <div className={classes.lineNumbersSection}>
                <ol className={classes.lineNumbers}>
                    {lineNumbers.map(n => <li>{n}</li>)}
                </ol>
            </div>
            <div className={classes.codeSection}>
                <pre className={classes.codeArea}>
                    <code className={classes.code}>{code}</code>
                </pre>
                <PanelSlider className={classes.panelSlider}/>
            </div>
        </div>
    );
}
