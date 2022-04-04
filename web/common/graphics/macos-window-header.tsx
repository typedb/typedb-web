import clsx from "clsx";
import React from "react";
import { ClassProps } from "../class-props";
import { macOSWindowHeaderStyles } from "./graphics-styles";

interface MacOSWindowProps extends ClassProps {
    width: number;
}

export const MacOSWindowHeader: React.FC<MacOSWindowProps> = ({width, className, ...props}) => {
    const classes = macOSWindowHeaderStyles();

    return <div className={clsx(classes.root, className)} style={{display: "inline-block", width: width, background: "#140B44", borderRadius: "5px 5px 0 0", textAlign: "left"}}>
        <svg width={56} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
            <g fill="none" fillRule="evenodd">
                <g transform="translate(10 10)">
                    <circle fill="#44A461" cx={36} cy={4} r={4} />
                    <circle fill="#C0A851" cx={20} cy={4} r={4} />
                    <circle fill="#F66B65" cx={4} cy={4} r={4} />
                </g>
            </g>
        </svg>
    </div>
}
