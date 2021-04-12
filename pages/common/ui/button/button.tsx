import * as React from 'react';
import Button, { ButtonClassKey } from '@material-ui/core/Button';
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
    const { children, classes, href, to, size, type, startIcon, endIcon, onClick, disabled, htmlAttrs } = props as BaseButtonFinalProps;

    const ownClasses = buttonStyles({ size, type });

    const linkProps = Boolean(to) ? { component: Link, to } : {};

    return (
        <Button
            classes={{
                root: clsx(ownClasses.root, classes?.root),
                label: clsx(ownClasses.label, classes?.label),
                startIcon: classes?.startIcon,
                endIcon: classes?.endIcon,
            }}
            disabled={disabled}
            href={href}
            startIcon={startIcon}
            endIcon={endIcon}
            disableElevation
            onClick={onClick}
            {...linkProps}
            {...htmlAttrs}
        >
            {children}
        </Button>
    );
};
