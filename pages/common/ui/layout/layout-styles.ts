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
        marginTop: 80,
        backgroundColor: vaticleTheme.palette.purple["800"],
    },

    content: {
        paddingTop: 150,
        paddingBottom: 132,
    },

    newsletterSection: {
        display: "flex",
    },

    social: {
        flex: "0 0 380px",
        display: "flex",
        alignItems: "center",
    },

    socialLink: {
        "&:not(:first-child)": {
            marginLeft: 20,
        },
    },

    socialIcon: {
        width: "40px !important",
        height: 40,
        fontSize: 40,
        borderRadius: 5,
        color: vaticleTheme.palette.purple["700"],
        backgroundColor: "#FFF",
    },

    socialIconTwitter: {
        padding: "6px",
    },

    socialIconFacebook: {
        color: "#FFF",
        backgroundColor: vaticleTheme.palette.purple["700"],
        width: "46px !important",
        height: 46,
        fontSize: 44,
    },

    socialIconLinkedIn: {
        padding: "4px",
    },

    socialIconGithub: {
        padding: "4px",
    },

    subscribePanel: {
        display: "flex",
    },

    personalDataNotice: {
        width: 327,
        fontSize: 16,
        lineHeight: "24px",
        fontWeight: 400,
    },

    separator: {
        marginTop: 67,
        height: 0,
        border: `1px solid ${vaticleTheme.palette.purple["450"]}`,
    },
});
