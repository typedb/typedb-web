import React from "react";
import MacOSWindow from "../assets/graphics/macos-window.svg";
import TypeQLVisualiserFooter from "../assets/graphics/typeql-visualiser-footer.svg";
import { codeStyles } from "./code-styles";

export const CodeWindow: React.FC = ({ children }) => {
    const classes = codeStyles();

    return (
        <div className={classes.windowContainer}>
            <div className={classes.windowHeader}>
                <MacOSWindow/>
            </div>
            {children}
            <div>
                <TypeQLVisualiserFooter/>
            </div>
        </div>
    );
}
