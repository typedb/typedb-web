import * as React from 'react';
import { Link as Anchor, ButtonClassKey } from '@material-ui/core';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { SizeIndicator } from '../../../styles/theme';
import { buttonStyles } from './button-styles';

export interface BaseButtonProps {
    classes?: Partial<Record<Extract<'root' | 'startIcon' | 'endIcon' | 'label', ButtonClassKey>, string>>;
    href?: string;
    to?: string;
    type?: 'primary' | 'secondary';
    size?: SizeIndicator;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
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
    const { children, classes, href, to, size, type, onClick, htmlAttrs, target } = props as BaseButtonFinalProps;

    const ownClasses = buttonStyles({ size, type });

    const linkProps = Boolean(to) ? { component: Link, to } : {};

    return (
        <Anchor classes={{ root: clsx(ownClasses.root, classes?.root) }} href={href} onClick={onClick} target={target} {...linkProps} {...htmlAttrs}>
            {children}
        </Anchor>
    );
};
