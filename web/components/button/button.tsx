import * as React from 'react';
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
    target?: string;
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

export type BaseButtonFinalProps = React.PropsWithChildren<BaseButtonProps & typeof defaultProps>;

export const VaticleButton: React.FC<BaseButtonProps> = props => {
    const { children, className, href, to, size, type, onClick, htmlAttrs, target } = props as BaseButtonFinalProps;

    const ownClasses = buttonStyles({ size, type });

    const linkProps = to ? { component: Link, to } : {};

    return (
        <a className={clsx(ownClasses.root, className)} href={href} onClick={onClick} target={target} {...linkProps} {...htmlAttrs}>
            <div className={ownClasses.childDiv}>
                {children}
            </div>
        </a>
    );
};
