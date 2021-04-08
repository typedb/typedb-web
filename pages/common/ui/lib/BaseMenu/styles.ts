import { makeStyles, fade } from '@material-ui/core';

const menuMaxHeight = 350;

export const useItemStyles = makeStyles({
    root: {
        width: '100%',
        height: 24,
        color: '#FFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2px',

        '& > p, & > svg': {
            fontSize: 12,
        },

        '&:hover': {
            backgroundColor: fade('#00FF00', 0.07),

            '& > p, & > svg': {
                color: `#00FF00 !important`,
            },
        },
    },
});

export const useMenuStyles = makeStyles({
    root: {
        position: 'relative',
    },
    list: {
        maxHeight: menuMaxHeight,
        minWidth: 'fit-content',
        backgroundColor: '#180E29',
        border: `1px solid #2C2349`,
        borderTop: 'none',
        borderRadius: `0 0 3px 3px`,
        boxShadow: `0 2px 20px 0 ${fade('#180E29', 0.29)}`,
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflowY: 'auto',
    },
    popper: {
        width: '100%',
        minWidth: 'fit-content',
        left: 1,
        zIndex: 1500,
    },
    openToggler: {
        transform: 'rotate(180deg)',
    },
});
