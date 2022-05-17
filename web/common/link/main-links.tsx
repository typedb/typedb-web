import clsx from "clsx";
import React from "react";
import { ClassProps } from "../class-props";
import { linkStyles } from "./link-styles";

export const MainLinks: React.FC<ClassProps> = ({className, children}) => {
    const classes = linkStyles();
    return <div className={clsx(classes.mainLinks, className)}>{children}</div>
}

export interface MainLinkProps {
    href?: string
    target?: string
}

export interface MainLinkIconProps {
    icon: JSX.Element
    caption?: string
}

export const MainLink: React.FC<MainLinkProps> = ({href, target, children}) => {
    const classes = linkStyles();
    return href ? <a className={classes.mainLink} href={href} target={target}>{children}</a> : <div className={classes.mainLink}>{children}</div>
}

export const MainLinkIcon: React.FC<MainLinkIconProps> = ({icon, caption}) => (
    <>
        {icon}
        {caption && <p>{caption}</p>}
    </>
)
