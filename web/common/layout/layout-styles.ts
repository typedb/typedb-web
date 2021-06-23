import { makeStyles } from '@material-ui/core';
import { vaticleTheme } from "../styles/theme";

export const headerHeight = 80;
const footerHeight = 65;
const headerBoxShadow = "2px 2px 1px -1px rgba(0,0,0,0.2),2px 2px 3px 0px rgba(0,0,0,0.14),2px 1px 5px 0px rgba(0,0,0,0.12)";

export const defaultLayoutStyles = makeStyles({
    main: {
        minHeight: `calc(100% - ${footerHeight}px)`,
        margin: `${headerHeight}px auto 0`,
        width: '100%',
        textAlign: 'center',
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
        color: vaticleTheme.palette.purple["800"],
        backgroundColor: vaticleTheme.palette.green["300"],

        "@media(max-width: 767px)": {
            top: 110,
            width: 170,
            fontSize: 12,
            transform: "translateX(34px) rotate(40deg)",
        },
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
        margin: "0 30px",
        flex: 1,
        display: "flex",

        "@media(max-width: 1199px)": {
            margin: "auto 17px auto 32px",
            justifyContent: "space-between",
        },
    },

    desktopItems: {
        flex: 1,
        display: "flex",
    },

    content: {
        height: headerHeight,
        margin: '0 auto',
    },

    logoContainer: {
        display: "flex",
        alignItems: "center",

        "&:hover": {
            backgroundColor: vaticleTheme.palette.purple["400"],
        },

        "@media(min-width: 1200px)": {
            padding: "0 20px",
        },
    },

    logo: {
        width: 125,
        height: 38,
        marginTop: -5,
    },

    externalLinksGithub: {
        "@media(max-width: 1199px)": {
            paddingTop: 8,
        },

        "@media(max-width: 767px)": {
            alignSelf: "flex-start",
        },
    },

    download: {
        padding: "0 20px",

        "@media(max-width: 1199px)": {
            order: 99,
            padding: "10px 30px",
        },

        "@media(max-width: 767px)": {
            alignSelf: "flex-start",
        },
    },

    menu: {
        display: "flex",

        "@media(max-width: 1199px)": {
            flexDirection: "column",
        },

        "@media (min-width: 768px) and (max-width: 1199px)": {
            position: "relative",

            "&:not($flat)": {
                boxShadow: headerBoxShadow,
            },
        },

        "@media(max-width: 767px)": {
            width: "100%",
        },

        "& a": {
            color: "#FFF",
            display: "inline-block",
            padding: "0 20px",
            width: "100%",

            "@media(max-width: 1199px)": {
                padding: "0 32px",
            },
        },

        "& li": {
            lineHeight: "40px",
            fontSize: 16,

            "& > a$standardMenuLink > span": {
                position: "relative",
                padding: "8px 0",
                lineHeight: "24px",

                "&:after": {
                    content: "''",
                    position: "absolute",
                    left: 0, // horizontal padding
                    right: 0,
                    top: 31, // top padding + line height - element height
                    height: 1,
                    backgroundColor: "#FFF",
                    transform: "scaleX(0)",
                    transition: "transform 300ms linear",

                    "@media(max-width: 1199px)": {
                        top: 34,
                    },
                },
            },

            "@media(min-width: 1200px)": {
                "& a:hover:not($noHover)": {
                    backgroundColor: vaticleTheme.palette.purple["400"],

                    "&$standardMenuLink > span:after": {
                        transform: "scaleX(1)",
                    },

                    "& > ul": {
                        display: "block",

                        "@media(max-width: 767px)": {
                            transform: "translateX(0px)",
                        },
                    },
                },
            },

            "@media(max-width: 1199px)": {
                lineHeight: "50px",
                fontSize: 18,

                "& a:focus:not($noHover)": {
                    backgroundColor: vaticleTheme.palette.purple["400"],

                    "&$standardMenuLink > span:after": {
                        transform: "scaleX(1)",
                    },
                },

                "& a:focus > ul": {
                    display: "block",

                    "@media(max-width: 767px)": {
                        transform: "translateX(0px)",
                    },
                },

                "@media(min-width: 768px)": {
                    "& a:hover:not($noHover)": {
                        backgroundColor: vaticleTheme.palette.purple["400"],

                        "&$standardMenuLink > span:after": {
                            transform: "scaleX(1)",
                        },
                    },

                    "& a:hover > ul": {
                        display: "block",

                        "@media(max-width: 767px)": {
                            transform: "translateX(0px)",
                        },
                    },
                },
            },

            "& a > ul": {
                zIndex: 2000,
                backgroundColor: vaticleTheme.palette.purple["600"],
                position: "absolute",
                transition: "transform 250ms ease-in-out",
                whiteSpace: "nowrap",

                "@media(min-width: 1200px)": {
                    left: 0,
                },

                "@media(min-width: 768px)": {
                    display: "none",
                    boxShadow: headerBoxShadow,
                },

                "@media(max-width: 1199px)": {
                    top: 0,
                    right: 0,
                    transform: "translateX(100%)",
                },

                "@media(max-width: 767px)": {
                    left: 0,
                    height: "100%",
                },
            },
        },

        "& > li": {
            fontSize: 18,

            "@media(min-width: 1200px)": {
                lineHeight: "80px",
                position: "relative",
            },

            "& > a$standardMenuLink > span": {
                "&:after": {
                    top: "34px !important",
                },
            },
        },
    },

    flat: {},

    standardMenuLink: {},

    hamburger: {
        alignSelf: "center",
    },

    mobileMenu: {
        position: "fixed",
        top: headerHeight,
        zIndex: 500,
        boxShadow: headerBoxShadow,
        width: "100%",
        height: 0,
        overflow: "hidden",
        backgroundColor: vaticleTheme.palette.purple["600"],
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
            height: `calc(100vh - ${headerHeight}px)`,
            marginLeft: "-100vw",
        },
    },

    mobileMenuContent: {
        margin: "11px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",

        "@media(max-width: 767px)": {
            height: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            position: "relative",
        },
    },

    linksMenu: {
        "@media(max-width: 1199px)": {
            display: "flex",
            flexDirection: "column",
        },

        "@media (min-width: 768px) and (max-width: 1199px)": {
            alignItems: "flex-end",
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
        backgroundColor: vaticleTheme.palette.purple["800"],
    },

    content: {
        paddingTop: 80,
        paddingBottom: 80,

        "@media(max-width: 767px)": {
            paddingTop: 60,
            paddingBottom: 60,
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
        justifyContent: "flex-end",
        alignItems: "center",
    },

    separator: {
        marginTop: 67,
        height: 0,
        border: `1px solid ${vaticleTheme.palette.purple["450"]}`,
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

        "@media (min-width: 768px) and (max-width: 1199px)": {
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

        "@media (min-width: 768px) and (max-width: 1199px)": {
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
        "@media(min-width: 1200px)": {
            "&:not(:first-child)": {
                marginLeft: 104,
            },
        },

        "@media (min-width: 768px) and (max-width: 1199px)": {
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
