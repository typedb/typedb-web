import { makeStyles } from '@material-ui/core';
import { vaticleTheme } from "../../../styles/theme";
import { buttonPalette } from "../button/button-styles";

const headerHeight = 80;
const footerHeight = 65;
const headerBoxShadow = "2px 2px 4px -1px rgba(0,0,0,0.2),2px 4px 5px 0px rgba(0,0,0,0.14),2px 1px 10px 0px rgba(0,0,0,0.12)";

export const defaultLayoutStyles = makeStyles({
    main: {
        minHeight: `calc(100% - ${footerHeight}px)`,
        margin: `${headerHeight}px auto 0`,
        width: '100%',
        textAlign: 'center',
    },
});

export const pageHeaderStyles = makeStyles({
    appBar: {
        height: headerHeight,
        backgroundColor: vaticleTheme.palette.purple[600],
        boxShadow: headerBoxShadow,
        top: 0,
        left: "auto",
        right: 0,
        position: "fixed",
        width: "100%",
        display: "flex",
        zIndex: 1100,
    },

    toolbar: {
        margin: "auto 50px",
        flex: 1,
        display: "flex",
        alignItems: "center",

        "@media(max-width: 1199px)": {
            margin: "auto 17px auto 32px",
            justifyContent: "space-between",
        },
    },

    desktopItems: {
        flex: 1,
        display: "flex",
        alignItems: "center",
    },

    toolbarItem: {
        "@media(min-width: 1200px)": {
            marginLeft: 35,
        },
    },

    toolbarFirstItem: {},

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
        flex: 1,
    },

    linkText: {
        fontSize: "18px",
        lineHeight: 1.5,
        padding: "12px 0",
        color: "#FFF",
    },

    linkUnderline: {
        margin: 0,
        height: '1px',
        border: 0,
        backgroundColor: '#FFF',
    },

    hamburger: {
        color: "#FFF",
        fontSize: 32,
    },

    mainMenu: {
        position: "fixed",
        zIndex: 1500,
        boxShadow: headerBoxShadow,
        width: "100%",
        height: 0,
        overflow: "hidden",
        backgroundColor: vaticleTheme.palette.purple["800"],
        transition: "height 350ms ease-in-out, width 350ms ease-in-out, margin-left 250ms ease-out",

        "&.invisible": {
            visibility: "hidden",
        },

        "&.open": {
            "@media(min-width: 768px)": {
                height: 405,
            },

            "@media(max-width: 767px)": {
                marginLeft: 0,
            }
        },

        "@media(max-width: 767px)": {
            width: 195,
            height: `calc(100vh - ${headerHeight}px)`,
            marginLeft: -195,
        },
    },

    mainMenuContent: {
        margin: "24px 32px",
        display: "flex",
        justifyContent: "space-between",

        "@media(max-width: 767px)": {
            flexDirection: "column",
            justifyContent: "flex-start",
            marginRight: 10,
        },
    },

    sitemapMenu: {

    },

    linksMenu: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",

        "@media(max-width: 767px)": {
            flexDirection: "column-reverse",
            alignItems: "flex-start",
        },
    },

    externalLinksMenu: {
        marginTop: 12,
        display: "flex",
        alignItems: "center",

        "@media(max-width: 767px)": {
            flexDirection: "column-reverse",
            alignItems: "flex-start",
            marginTop: 28,
        },
    },

    externalLinksGithub: {
        "@media(min-width: 1200px)": {
            marginLeft: 35,
        },

        "@media (min-width: 768px) and (max-width: 1199px)": {
            marginLeft: 32,
        },

        "@media(max-width: 767px)": {
            marginBottom: 24,
        },
    },

    internalLinksMenu: {
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",

        "@media(max-width: 767px)": {
            marginTop: 16,
            alignItems: "flex-start",
        },
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
