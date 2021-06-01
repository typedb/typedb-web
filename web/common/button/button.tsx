import React from 'react';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { SizeIndicator } from '../styles/theme';
import { buttonStyles } from './button-styles';
import { ClassProps } from "../class-props";

export interface BaseButtonProps extends ClassProps {
    href?: string;
    to?: string;
    type?: 'primary' | 'secondary';
    size?: SizeIndicator;
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
    comingSoon?: true;
    target?: string;
    download?: string;
    htmlAttrs?: {
        type?: 'submit' | 'button';
        download?: string;
    };
}

const defaultProps: Required<Pick<BaseButtonProps, 'size' | 'type' | 'htmlAttrs'>> = {
    size: 'smaller',
    type: 'secondary',
    htmlAttrs: { type: 'button' },
};

// TODO: This type structure is not necessary and should be aligned with rest of codebase
export type BaseButtonFinalProps = React.PropsWithChildren<BaseButtonProps & typeof defaultProps>;

export const VaticleButton: React.FC<BaseButtonProps> = props => {
    const { children, className, href, to, size, type, onClick, htmlAttrs, target, download, disabled, comingSoon } = props as BaseButtonFinalProps;

    const classes = buttonStyles({ size, type });

    if (to) {
        return (
            <Link to={to} className={clsx(classes.root, disabled && classes.disable, className)} title={comingSoon && "coming soon"}>
                <div className={classes.childDiv}>
                    {children}
                </div>
            </Link>
        )
    }

    return (
        <a className={clsx(classes.root, disabled && classes.disable, className)} href={href} onClick={onClick}
           target={target} download={download} title={comingSoon && "coming soon"} {...htmlAttrs}>
            <div className={classes.childDiv}>
                {children}
            </div>
        </a>
    );
};
