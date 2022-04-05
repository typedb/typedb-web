import clsx from "clsx";
import React from "react";
import { GitWindowFooter } from "./git-window-footer";
import { macOSWindowStyles } from "./graphics-styles";
import { MacOSWindowHeader } from "./macos-window-header";
import { ClassProps } from "../class-props";

export interface MacOSWindowProps extends ClassProps {
    width: number;
    mobileScale: number;
    mobileVerticalMargin: number;
}

export const MacOSWindow: React.FC<MacOSWindowProps> = ({className, children, ...props}) => {
    const classes = macOSWindowStyles(props);

    return <div className={clsx(classes.graphicContainer, className)}>
        <div className={classes.graphic}>
            <MacOSWindowHeader width={props.width}/>
            {children}
            <GitWindowFooter width={props.width}/>
        </div>
    </div>
}
