import React, { useRef } from 'react';
import { ClickAwayListener, MenuList, Paper, Popper } from '@material-ui/core';
import clsx from 'clsx';
import { useMenuStyles } from './styles';

export interface BaseMenuProps {
    children: React.ReactNode;
    toggler: React.ReactNode;
    preventTogglerRotate?: boolean;
}

const BaseMenu: React.FC<BaseMenuProps> = ({ children, toggler: Toggler, preventTogglerRotate }) => {
    const ownClasses = useMenuStyles();
    const anchorRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);

    const handleToggle = () => setIsOpen(prevIsOpen => !prevIsOpen);

    const handleClose = () => setIsOpen(false);

    return (
        <div className={ownClasses.root}>
            <div
                ref={anchorRef}
                onClick={handleToggle}
                className={clsx({ [ownClasses.openToggler]: isOpen && !preventTogglerRotate })}
            >
                {Toggler}
            </div>
            <Popper
                className={ownClasses.popper}
                open={isOpen}
                anchorEl={anchorRef.current}
                disablePortal
                placement="bottom-end"
            >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList classes={{ root: ownClasses.list }} onClick={handleClose}>
                            {children}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </div>
    );
};

export default BaseMenu;
