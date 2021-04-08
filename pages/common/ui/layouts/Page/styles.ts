import { makeStyles } from '@material-ui/core';

const headerHeight = 50;
const footerHeight = 65;

export const useStyles = makeStyles({
    main: {
        minHeight: `calc(100% - ${headerHeight}px - ${footerHeight}px)`,
        margin: '0 auto',
        width: 1600,
    },
});

export const useHeaderStyles = makeStyles({
    root: {
        width: '100%',
        height: headerHeight,
        backgroundColor: '#100718'
        // backgroundColor: vaticleTheme.palette.purple[700],
    },

    content: {
        width: 1000,
        height: headerHeight,
        margin: '0 auto',
    },

    logo: {
        width: 27,
        height: 27,
        display: 'block',
    },

    menuToggler: {
        minWidth: 110,
        height: headerHeight,
        padding: 0,
        justifyContent: 'flex-end',
    },

    profileMenuItem: {
        height: 27,
    },
});

export const useFooterStyles = makeStyles({
    root: {
        height: footerHeight,
        width: '100%',
        padding: '5px 0',
        // padding: vaticleTheme.spacing(5, 0),
    },
    image: {
        width: 165,
        display: 'block',
        margin: '0 auto',
    }
});
