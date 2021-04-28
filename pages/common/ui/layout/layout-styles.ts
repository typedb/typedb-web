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

    pageContent: {
        width: "1160px",
        maxWidth: "calc(100vw - 40px)",
        margin: "0 auto",
    },
});

export const pageHeaderStyles = makeStyles({
    appBar: {
        position: "static",
        height: headerHeight,
        backgroundColor: vaticleTheme.palette.purple[600],
    },

    toolbar: {
        margin: "auto 50px",
    },

    content: {
        height: headerHeight,
        margin: '0 auto',
    },

    logo: {
        width: 125,
        height: 38,
        marginTop: -2,
    },

    filler: {
        flexGrow: 1,
    },

    linkText: {
        fontSize: "18px",
        color: "#FFF",
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
