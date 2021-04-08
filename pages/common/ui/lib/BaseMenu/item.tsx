import React, { forwardRef } from 'react';
import { MenuItem, MenuItemProps } from '@material-ui/core';
import clsx from 'clsx';
import { useItemStyles } from './styles';

export interface BaseMenuItemProps {
    classes?: Partial<Record<'root', string>>;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler;
    value?: MenuItemProps['value'];
    width?: number | string;
    disabled?: boolean;
}

const BaseMenuItem = forwardRef<HTMLLIElement, BaseMenuItemProps>(
    ({ children, onClick, value, disabled, width, classes }, ref) => {
        const ownClasses = useItemStyles();

        return (
            <MenuItem
                onClick={onClick}
                classes={{ root: clsx(ownClasses.root, classes?.root) }}
                ref={ref}
                value={value}
                style={{ width }}
                disabled={disabled}
            >
                {children}
            </MenuItem>
        );
    }
);

BaseMenuItem.displayName = 'BaseMenuItem';

export default BaseMenuItem;
