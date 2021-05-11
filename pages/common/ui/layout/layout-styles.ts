import { makeStyles } from '@material-ui/core';
import { vaticleTheme } from "../../../styles/theme";
import { buttonPalette } from "../button/button-styles";

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

    socialLinkFacebook: {
        marginLeft: 22,
    },

    socialLinkLinkedIn: {
        marginLeft: 19,
    },

    socialLinkGithub: {
        marginLeft: 22,
    },

    socialIcon: {
        width: "40px !important",
        height: 40,
        fontSize: 40,
        borderRadius: 4,
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
        color: "#FFF",
        backgroundColor: vaticleTheme.palette.purple["700"],
        width: "46px !important",
        height: 46,
        fontSize: 44,
    },

    socialIconGithub: {
        padding: "4px",
    },

    subscribe: {
        flex: 1,
        display: "flex",
        alignItems: "center",
    },

    personalDataNotice: {
        width: 430,
        fontSize: 16,
        lineHeight: "24px",
        fontWeight: 400,
    },

    subscribeEmail: {
        marginLeft: 20,
        flex: 2,
        height: 40,
        border: `1px solid ${buttonPalette.secondary.border}`,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: "transparent",
        color: buttonPalette.secondary.label,
        fontSize: vaticleTheme.typography.fontSize.small,
        fontWeight: 300
    },

    subscribeButton: {
        flex: 1,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },

    separator: {
        marginTop: 67,
        height: 0,
        border: `1px solid ${vaticleTheme.palette.purple["450"]}`,
    },

    linksSection: {
        display: "flex",
    },

    linkList: {
        marginTop: 32,
    },

    link: {
        margin: "5px 0",
        height: 40,
        padding: "5px 0",
        display: "inline-flex",
        alignItems: "center",
    },

    linkTwoLine: {
        margin: "19px 0",
    },

    linkIconContainer: {
        width: 30,
        marginRight: 30,
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
    },

    linkIcon: {
        color: '#FFF !important',
        fontSize: 30,
    },

    linkText: {
        maxWidth: 240,
        fontSize: 16,
        lineHeight: "28px",
        fontWeight: 400,
    },

    contact: {
        flex: "0 0 380px",
    },

    siteMap: {
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
});
