import React from "react";
import { typeQLVisualiserStyles } from "./typeql-styles";

interface TypeQLCodeProps {
    lines: string[];
}

export const TypeQLCode: React.FC<TypeQLCodeProps> = ({ }) => {
    const classes = typeQLVisualiserStyles();

    return (
        <div className={classes.codePane}>
            <p>
                define
                person sub entity;
            </p>
        </div>
    );
}
