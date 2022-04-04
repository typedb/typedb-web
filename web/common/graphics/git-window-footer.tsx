import clsx from "clsx";
import React from "react";
import BranchIcon from "../assets/graphics/branch.svg";
import FetchIcon from "../assets/graphics/fetch.svg";
import { vaticleStyles } from "../styles/vaticle-styles";
import { gitWindowFooterStyles } from "./graphics-styles";

interface GitWindowFooterProps {
    language?: string;
    width: number;
}

export const GitWindowFooter: React.FC<GitWindowFooterProps> = ({language, width}) => {
    const classes = Object.assign({}, vaticleStyles(), gitWindowFooterStyles());

    return (
        <div className={clsx(classes.root)} style={{width: width}}>
            <div>{language || "TypeQL"}</div>

            <div className={classes.filler}/>

            <BranchIcon className={classes.icon}/><span className={classes.iconLabel}>master</span>
            <FetchIcon className={classes.icon}/><span className={classes.iconLabel}>fetch</span>
        </div>
    );
};
