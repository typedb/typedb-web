import { makeStyles } from '@material-ui/core';
import { vaticleTheme } from "../../../styles/theme";

const headerHeight = 80;
const footerHeight = 65;

export const defaultLayoutStyles = makeStyles({
    main: {
        minHeight: `calc(100% - ${headerHeight}px - ${footerHeight}px)`,
        margin: '0 auto',
        width: '100%',
        textAlign: 'center',
    },
});

export const pageHeaderStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: '100%',
        height: headerHeight,
        backgroundColor: '#100718'
        // backgroundColor: vaticleTheme.palette.purple[700],
    },

    appBar: {
        position: "static",
        backgroundColor: vaticleTheme.palette.purple[500],
    },

    toolbar: {
        paddingLeft: 50,
        paddingRight: 50,
    },

    content: {
        height: headerHeight,
        margin: '0 auto',
    },

    logo: {
        width: 128,
        height: 37,
    },

    filler: {
        flexGrow: 1,
    },

    linkText: {
        fontSize: 16,
    },

    linkUnderline: {
        margin: 0,
        height: '1px',
        border: 0,
        backgroundColor: '#FFF',
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

export const pageFooterStyles = makeStyles({
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
