import React from 'react';
import { iconButtonStyles } from './button-styles';
import clsx from "clsx";
import { ClassProps } from "../../class-props";

export interface VaticleIconButtonProps extends ClassProps {
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
}

export const VaticleIconButton: React.FC<VaticleIconButtonProps> = ({children, className, onClick, disabled}) => {
    const classes = iconButtonStyles();

    return (
        <a className={clsx(className, classes.root, disabled ? classes.disabled : undefined)} onClick={onClick}>
            {children}
        </a>
    );
};
