import { makeStyles } from '@material-ui/core';
import { vaticleTheme } from "../styles/theme";
import { buttonPalette } from "../button/button-styles";
import { standardMargins } from "../styles/vaticle-styles";

const headerBarHeight = 80;
const eventBannerHeight = 28;
const eventBannerVisible = true; // Set this to false when we aren't displaying an event banner
export const headerAreaHeight = eventBannerVisible ? headerBarHeight + eventBannerHeight : headerBarHeight;
const footerHeight = 65;
const headerBoxShadow = "2px 2px 1px -1px rgba(0,0,0,0.2),2px 2px 3px 0px rgba(0,0,0,0.14),2px 1px 5px 0px rgba(0,0,0,0.12)";
const borderBlack = vaticleTheme.palette.purple["2"];
const submenuWidthDesktop = 186;
const menuWidthTablet = 216;

export const defaultLayoutStyles = makeStyles({
    main: {
        minHeight: `calc(100% - ${footerHeight}px)`,
        margin: `${headerAreaHeight}px auto 0`,
        width: '100%',
        textAlign: 'center',
    },

    cookieConsentButton: {
        margin: "15px !important",
        height: 40,
        border: `1px solid ${buttonPalette.secondary.border} !important`,
        borderRadius: "5px !important",
        backgroundColor: `${buttonPalette.secondary.background} !important`,
        fontFamily: "Titillium Web",
        fontSize: 16,
        fontWeight: 600,
        lineHeight: "24px",
        color: `${buttonPalette.secondary.label} !important`,
        transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

        "&:hover": {
            color: `${buttonPalette.secondary.hoverLabel} !important`,
            backgroundColor: `${buttonPalette.secondary.hoverBackground} !important`,
            borderColor: `${buttonPalette.secondary.hoverBorder} !important`,
        },
    },

    underDevelopmentRibbon: {
        position: "fixed",
        top: 117,
        right: 0,
        transform: "translateX(32px) rotate(40deg)",
        zIndex: 350,
        width: 190,
        height: "2em",
        fontSize: 14,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: vaticleTheme.palette.purple["2"],
        backgroundColor: vaticleTheme.palette.green["1"],

        "@media(max-width: 767px)": {
            top: 110,
            width: 170,
            fontSize: 12,
            transform: "translateX(34px) rotate(40deg)",
        },
    },
});

export const pageHeaderStyles = makeStyles({
    headerSection: {
        top: "28px",
        left: "auto",
        right: 0,
        position: "fixed",
        width: "100%",
        zIndex: 1100,
    },

    appBar: {
        height: headerBarHeight,
        backgroundColor: vaticleTheme.palette.purple["4"],
        boxShadow: headerBoxShadow,
        display: "flex",
    },

    toolbar: {
        margin: "0 30px",
        flex: 1,
        display: "flex",

        "@media(max-width: 1359px)": {
            margin: "auto 17px auto 32px",
            justifyContent: "space-between",
        },
    },

    desktopItems: {
        flex: 1,
        display: "flex",
    },

    showMediumDesktop: {
        "@media(max-width: 1359px)": {
            display: "none !important",
        },
    },

    hideMediumDesktop: {
        "@media(min-width: 1360px)": {
            display: "none !important",
        },
    },

    content: {
        height: headerBarHeight,
        margin: '0 auto',
    },

    logoContainer: {
        display: "flex",
        alignItems: "center",

        "@media(min-width: 1360px)": {
            padding: "0 20px",
        },
    },

    logo: {
        width: 125,
        height: 38,
        marginTop: -5,
    },

    importantLinksGithub: {
        "@media(max-width: 1359px)": {
            paddingTop: 8,
        },

        "@media(max-width: 767px)": {
            alignSelf: "flex-start",
        },
    },

    download: {
        padding: "0 20px",

        "@media(max-width: 1359px)": {
            order: 99,
            padding: "10px 24px",
        },

        "@media(max-width: 767px)": {
            alignSelf: "flex-start",
        },
    },

    menu: {
        display: "flex",

        "@media(max-width: 1359px)": {
            flexDirection: "column",
        },

        "@media (min-width: 768px) and (max-width: 1359px)": {
            position: "relative",
            borderRight: `1px solid ${borderBlack}`,
            width: menuWidthTablet,
        },

        "@media(max-width: 767px)": {
            width: "100%",
        },

        // Links in menu and submenu items
        "& a, & a:visited, & div[tabindex]": {
            color: "#FFF",
            display: "inline-block",
            padding: "0 20px",
            width: "100%",
            transition: "background-color 150ms ease",
            cursor: "pointer",

            "@media(max-width: 1359px)": {
                padding: "0 24px",
            },

            "&:hover:not($noHover)": {
                "@media(min-width: 768px)": {
                    backgroundColor: vaticleTheme.palette.purple["6"],

                    "& > ul": {
                        display: "block",

                        "@media(max-width: 767px)": {
                            transform: "translateX(0px)",
                        },
                    },
                },
            },

            "&:focus:not($noHover)": {
                "@media(max-width: 1359px)": {
                    backgroundColor: vaticleTheme.palette.purple["6"],

                    "& > ul": {
                        display: "block",

                        "@media(max-width: 767px)": {
                            transform: "translateX(0px)",
                        },
                    },
                },
            },

            // Submenus
            "& > ul": {
                zIndex: 2000,
                backgroundColor: vaticleTheme.palette.purple["4"],
                position: "absolute",
                transition: "transform 250ms ease-in-out",
                whiteSpace: "nowrap",

                "@media(min-width: 1360px)": {
                    left: -1,
                    border: `1px solid ${borderBlack}`,
                    boxShadow: headerBoxShadow,
                    width: submenuWidthDesktop,
                },

                "@media(min-width: 768px)": {
                    display: "none",
                },

                "@media(max-width: 1359px)": {
                    right: 0,
                    transform: "translateX(100%)",
                    height: "100%",
                },

                "@media (min-width: 768px) and (max-width: 1359px)": {
                    left: 0,
                    top: 0,
                    borderRight: `1px solid ${borderBlack}`,
                    width: menuWidthTablet,
                },

                "@media(max-width: 767px)": {
                    top: 0,
                    left: 0,
                },
            },
        },

        // Menu and submenu items
        "& li": {
            lineHeight: "40px",
            fontSize: 16,

            "@media(max-width: 1359px)": {
                lineHeight: "50px",
                fontSize: 18,
            },
        },

        // Menu items, top level only
        "& > li": {
            fontSize: 18,

            "@media(min-width: 1360px)": {
                lineHeight: "80px",
                position: "relative",
            },
        },
    },

    hamburger: {
        alignSelf: "center",
    },

    mobileMenu: {
        position: "fixed",
        top: headerAreaHeight,
        zIndex: 500,
        boxShadow: headerBoxShadow,
        width: "100%",
        height: 0,
        overflow: "hidden",
        backgroundColor: vaticleTheme.palette.purple["4"],
        transition: "height 350ms ease-in-out, width 350ms ease-in-out, margin-left 350ms ease-out",

        "&.invisible": {
            visibility: "hidden",
        },

        "&.open": {
            "@media(min-width: 768px)": {
                height: 295,
            },

            "@media(max-width: 767px)": {
                marginLeft: 0,
            }
        },

        "@media(max-width: 767px)": {
            width: "100vw",
            height: `calc(100vh - ${headerAreaHeight}px)`,
            marginLeft: "-100vw",
        },
    },

    mobileMenuContent: {
        height: "100%",
        display: "flex",
        justifyContent: "space-between",

        "@media(max-width: 767px)": {
            flexDirection: "column",
            justifyContent: "flex-start",
            position: "relative",
        },
    },

    linksMenu: {
        "@media(max-width: 1359px)": {
            display: "flex",
            flexDirection: "column",
        },

        "@media (min-width: 768px) and (max-width: 1359px)": {
            textAlign: "end",
        },

        "@media(max-width: 767px)": {
            marginBottom: 20,
        },
    },

    noHover: {},

    backMenuItem: {
        "@media(min-width: 768px)": {
            display: "none",
        },
    },

    backButton: {
        fontSize: 24,
    },
});

export const pageFooterStyles = makeStyles({
    root: {
        backgroundColor: vaticleTheme.palette.purple["2"],
    },

    content: {
        paddingTop: standardMargins.subsection.desktop,
        paddingBottom: standardMargins.content.desktop,

        "@media(max-width: 767px)": {
            paddingTop: standardMargins.subsection.mobile,
            paddingBottom: standardMargins.content.mobile,
        },
    },

    newsletterSection: {
        display: "flex",

        "@media(max-width: 767px)": {
            flexDirection: "column-reverse",
            alignItems: "center",
        },
    },

    social: {
        display: "flex",
        alignItems: "center",

        "@media(min-width: 768px)": {
            flex: "0 0 380px",
        },

        "@media(max-width: 767px)": {
            marginTop: 44,
        },
    },

    socialLinkFacebook: {
        marginLeft: 22,
    },

    socialLinkLinkedIn: {
        marginLeft: 19,
    },

    socialLinkYoutube: {
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
        color: vaticleTheme.palette.purple["3"],
        backgroundColor: "#FFF",
    },

    socialIconTwitter: {
        padding: "6px",
    },

    socialIconFacebook: {
        color: "#FFF",
        backgroundColor: vaticleTheme.palette.purple["3"],
        width: "46px !important",
        height: 46,
        fontSize: 44,
    },

    socialIconLinkedIn: {
        color: "#FFF",
        backgroundColor: vaticleTheme.palette.purple["3"],
        width: "46px !important",
        height: 46,
        fontSize: 44,
    },

    socialIconYoutube: {
        color: "#FFF",
        backgroundColor: vaticleTheme.palette.purple["3"],
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
        justifyContent: "flex-end",
        alignItems: "center",
    },

    separator: {
        marginTop: 67,
        height: 0,
        border: `1px solid ${vaticleTheme.palette.purple["5"]}`,
    },

    linksSection: {
        display: "flex",

        "@media(max-width: 767px)": {
            flexDirection: "column",
        },
    },

    linkList: {
        marginTop: 32,

        "@media(max-width: 767px)": {
            marginTop: 30,
        },
    },

    contactLink: {
        margin: "5px 0",
        height: 40,
        padding: "5px 0",
        display: "inline-flex",
        alignItems: "center",
    },

    sitemapLink: {
        margin: "5px 0",
        height: 40,
        padding: "5px 0",
        display: "inline-flex",
        alignItems: "center",

        "@media(max-width: 767px)": {
            margin: 0,
        },
    },

    linkTwoLine: {
        margin: "19px 0",
    },

    linkIconContainer: {
        width: 30,
        marginRight: 30,
        flexShrink: 0,
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
        flex: "0 0 360px",

        "@media (min-width: 768px) and (max-width: 1359px)": {
            flex: "1 1 180px",
        },

        "@media(max-width: 767px)": {
            flex: .5,
        },
    },

    allOtherLinks: {
        flex: 1,

        "@media(min-width: 768px)": {
            marginLeft: 20,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
        },

        "@media (min-width: 768px) and (max-width: 1359px)": {
            flex: "1 1 360px",
        },

        "@media(max-width: 767px)": {
            marginTop: 30,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            rowGap: 25,
        },
    },

    linkBlock: {
        "@media(min-width: 1360px)": {
            "&:not(:first-child)": {
                marginLeft: 104,
            },
        },

        "@media (min-width: 768px) and (max-width: 1359px)": {
            flex: 1,
        },
    },

    linkBlockList: {
        marginTop: 32,

        "@media(max-width: 767px)": {
            marginTop: 14,
        },
    },
});

export const siteBannerStyles = makeStyles({
    root: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1030,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 28,
        boxShadow: headerBoxShadow,
        backgroundColor: vaticleTheme.palette.purple["6"],
        fontSize: 12,
        lineHeight: "24px",
    },

    spacer: {
        width: 4,
    },

    link: {
        color: vaticleTheme.palette.green["1"],
    },
});

export const cosmosBannerStyles = makeStyles({
    root: {
        height: 64,
        padding: "0 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(../../assets/images/banner-cosmos-bg-left.svg), url(../../assets/images/banner-cosmos-bg-right.svg), linear-gradient(#0F0A32, #2F1D77)`,
        backgroundPosition: "left top, right top, center",
        backgroundRepeat: "no-repeat, no-repeat, repeat",
        borderBottom: `1px solid ${borderBlack}`,
        fontSize: 17,
        position: "relative",

        "& > * + *": {
            marginLeft: 20,
        }
    },

    backgroundLeft: {

    },

    backgroundRight: {

    },

    closeButton: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 20,
        margin: "auto",
        fontSize: 28,
        color: vaticleTheme.palette.green["1"],
    },
});
