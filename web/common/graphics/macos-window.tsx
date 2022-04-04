import clsx from "clsx";
import React from "react";
import { GitWindowFooter } from "./git-window-footer";
import { macOSWindowStyles } from "./graphics-styles";
import { MacOSWindowHeader } from "./macos-window-header";
import { ClassProps } from "../class-props";

interface MacOSWindowProps extends ClassProps {
    width: number;
}

export const MacOSWindow: React.FC<MacOSWindowProps> = ({width, className, children}) => {
    const classes = macOSWindowStyles();

    return <div className={clsx(classes.root, className)}>
        <MacOSWindowHeader width={width}/>
        {children}
        <GitWindowFooter width={width}/>
    </div>
}
