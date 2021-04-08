import * as React from 'react';
import Button, { ButtonClassKey } from '@material-ui/core/Button';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { SizeIndicator } from '../../styles/theme';
import { useStyles } from './styles';

export interface BaseButtonProps {
    classes?: Partial<Record<Extract<'root' | 'startIcon' | 'endIcon' | 'label', ButtonClassKey>, string>>;
    href?: string;
    to?: string;
    variant?: 'contained' | 'text';
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

const defaultProps: Required<Pick<BaseButtonProps, 'size' | 'variant' | 'type' | 'htmlAttrs'>> = {
    variant: 'contained',
    size: 'smaller',
    type: 'secondary',
    htmlAttrs: { type: 'button' },
};

export const displayName = 'BaseButton';

export type BaseButtonFinalProps = React.PropsWithChildren<BaseButtonProps & typeof defaultProps>;

const BaseButton: React.FC<BaseButtonProps> = props => {
    const {
        children,
        classes,
        href,
        to,
        variant,
        size,
        type,
        startIcon,
        endIcon,
        onClick,
        disabled,
        htmlAttrs,
    } = props as BaseButtonFinalProps;

    const ownClasses = useStyles({ size, type });

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
            variant={variant}
            startIcon={startIcon}
            endIcon={endIcon}
            disableFocusRipple
            disableElevation
            onClick={onClick}
            {...linkProps}
            {...htmlAttrs}
        >
            {children}
        </Button>
    );
};

BaseButton.defaultProps = defaultProps;

BaseButton.displayName = displayName;

export default BaseButton;
