import { makeStyles } from '@material-ui/core/styles';
import { vaticleTheme } from "../styles/theme";

// TODO: Break this object down by Component
export const homePageStyles = makeStyles({
    vaticleAtomContainer: {
        width: "100%",

        "@media(min-width: 768px)": {
            marginTop: 160,
        },
    },

    vaticleTypeDB: {
        "@media(max-width: 767px)": {
            marginTop: -30,
        },

        "@media(max-width: 479px)": {
            display: "none",
        },
    },

    vaticleTypeDBMobile: {
        marginTop: -30,

        "@media(min-width: 480px)": {
            display: "none",
        },
    },

    diagramAndCaption: {
        textAlign: "start",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        "@media(max-width: 1199px)": {
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: 660,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },

    visualiserLeft: {
        "@media(min-width: 1200px)": {
            flexDirection: "row",
        },
    },

    visualiserRight: {
        "@media(min-width: 1200px)": {
            flexDirection: "row-reverse",
        },
    },

    diagramCaptionSpacingLeft: {
        "@media(min-width: 1200px)": {
            marginLeft: 40,
        },

        "@media (min-width: 768px) and (max-width: 1199px)": {
            marginTop: 40,
        },

        "@media(max-width: 767px)": {
            marginTop: 30,
        },
    },

    diagramCaptionSpacingRight: {
        "@media(min-width: 1200px)": {
            marginRight: 40,
        },

        "@media (min-width: 768px) and (max-width: 1199px)": {
            marginTop: 40,
        },

        "@media(max-width: 767px)": {
            marginTop: 30,
        },
    },

    learnMore: {
        width: 160,

        "@media(max-width: 767px)": {
            marginLeft: "auto",
            marginRight: "auto",
        },
    },

    mainLinks: {
        width: '100%',
        marginLeft: "auto",
        marginRight: "auto",
        display: 'flex',
        border: `1px solid ${vaticleTheme.palette.purple[300]}`,
        borderRadius: 11,

        "@media(max-width: 767px)": {
            width: 288,
            display: "block",
        },
    },

    firstMainLink: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '160px',
    },

    mainLink: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '160px',

        "@media(min-width: 768px)": {
            borderLeft: `1px solid ${vaticleTheme.palette.purple[300]}`,
        },

        "@media(max-width: 767px)": {
            borderTop: `1px solid ${vaticleTheme.palette.purple["300"]}`,
        },
    },

    mainLinkIcon: {
        color: '#FFF !important',
        fontSize: 66,
    },

    mainLinkIconCircle: {
        width: "60px !important",
        height: 60,
        borderRadius: "50%",
        color: vaticleTheme.palette.purple["700"],
        backgroundColor: "#FFF",
        padding: "14px 13px 14px 15px",
    },

    mainLinkCaption: {
        color: "#FFF",
        marginTop: '8px',
        fontSize: 16,
    },

    downloadGraknButton: {
        height: '72px !important',
    },

    corporateLogos: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(195px, 1fr))",
        placeItems: "center center",
        gap: "65px 40px",

        "@media(max-width: 767px)": {
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "30px 20px",
        },
    },

    berkeleyLogo: {
        width: 163,
        "@media(max-width: 767px)": { width: 145 },
    },

    aresGeneticsLogo: {
        width: 199,
        "@media(max-width: 767px)": { width: 145 },
    },

    deutscheTelekomLogo: {
        width: 185,
        "@media(max-width: 767px)": { width: 145 },
    },

    dunnhumbyLogo: {
        width: 184,
        "@media(max-width: 767px)": { width: 145 },
    },

    openCTILogo: {
        width: 186,
        "@media(max-width: 767px)": { width: 145 },
    },

    capcoLogo: {
        width: 128,
        "@media(max-width: 767px)": { width: 114 },
    },

    infosysLogo: {
        width: 167,
        "@media(max-width: 767px)": { width: 114 },
    },

    livingMatrixLogo: {
        width: 185,
        "@media(max-width: 767px)": { width: 145 },
    },

    taxfixLogo: {
        width: 150,
        "@media(max-width: 767px)": { width: 145 },
    },

    maunaLogo: {
        width: 177,
        "@media(max-width: 767px)": { width: 145 },
    },

    tnoLogo: {
        width: 185,
        "@media(max-width: 767px)": { width: 151 },
    },

    ustGlobalLogo: {
        width: 185,
        "@media(max-width: 767px)": { width: 145 },
    },

    googleLogo: {
        width: 192,
        "@media(max-width: 767px)": { width: 145 },
    },

    rasaLogo: {
        width: 112,
        "@media(max-width: 767px)": { width: 106 },
    },

    ciscoLogo: {
        width: 120,
        "@media(max-width: 767px)": { width: 94 },
    },

    chinaMerchantsBankLogo: {
        width: 185,
        "@media(max-width: 767px)": { width: 145 },
    },

    eagleGenomicsLogo: {
        width: 185,
        "@media(max-width: 767px)": { width: 145 },
    },

    flipkartLogo: {
        width: 185,
        "@media(max-width: 767px)": { width: 145 },
    },

    genentechLogo: {
        width: 185,
        "@media(max-width: 767px)": { width: 145 },
    },

    rairHealthLogo: {
        width: 185,
        "@media(max-width: 767px)": { width: 145 },
    },

    rheosMedicinesLogo: {
        width: 185,
        "@media(max-width: 767px)": { width: 145 },
    },

    nestleHealthScienceLogo: {
        width: 185,
        "@media(max-width: 767px)": { width: 145 },
    },

    rocheLogo: {
        width: 185,
        "@media(max-width: 767px)": { width: 145 },
    },

    buttonAfterText: {
        marginTop: 40,

        "@media(max-width: 767px)": {
            marginTop: 30,
        },
    },

    videoPlayer: {
        width: 760,
        height: 451,

        "@media(max-width: 800px)": {
            width: "calc(100vw - 40px)",
            height: "calc((100vw - 40px) * .6)",
        },
    },

    mainActionList: {
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fit, 224px)",
        gap: "30px 40px",
    },

    clusterAction: {
        width: 224,
    },

    industryDescription: {
        height: 136,

        "@media(max-width: 900px)": {
            height: 170,
        },

        "@media(max-width: 767px)": {
            height: 196,
        },

        "@media(max-width: 479px)": {
            height: 280,
        },
    },

    sectionToggleGroup: {
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fit, 185px)",
        rowGap: "24px",

        "@media(max-width: 767px)": {
            gridTemplateColumns: "repeat(auto-fit, 176px)",
        },
    },

    sectionToggle: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    sectionToggleIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 5,
        backgroundColor: vaticleTheme.palette.purple[600],
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid transparent",
        transition: "border-color 100ms ease",
        cursor: "pointer",

        "&:hover": {
            borderColor: vaticleTheme.palette.green[300],
        },

        "& svg": {
            width: 45,
            height: 45,

            "& g, & ellipse, & circle, & path": {
                stroke: "#FFF",
            },
        }
    },

    sectionToggleIconContainerSelected: {
        "& svg": {
            "& g, & ellipse, & circle, & path": {
                stroke: vaticleTheme.palette.green[300],
            },
        },
    },

    sectionToggleTitle: {
        marginTop: 27,
        fontSize: 16,
        lineHeight: "28px",
        fontWeight: 300,
    },

    featurePanelList: {
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fit, 360px)",
        gridTemplateRows: "repeat(auto-fit, 260px)",
        gap: 40,

        "@media(max-width: 767px)": {
            gridTemplateColumns: "repeat(auto-fit, 335px)",
            gap: 30,
        },
    },

    featurePanel: {
        backgroundColor: vaticleTheme.palette.purple["600"],
        borderRadius: 5,
        padding: "32px 40px",
        border: "1px solid transparent",
        transition: "border-color 100ms ease",
        position: "relative",

        "&:hover": {
            borderColor: vaticleTheme.palette.green[300],
        },
    },

    featurePanelBanner: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 100,
        height: 32,
        borderRadius: 5,
        backgroundColor: vaticleTheme.palette.purple["400"],
        display: "inline-flex",
        justifyContent: "center",
        fontSize: 14,
        lineHeight: "28px",
        fontWeight: 400,
    },

    testimonialsSection: {
        width: "100vw",
        maxWidth: "100vw",
    },

    carouselContainer: {
        overflow: "hidden",
        boxSizing: "border-box",
        position: "relative",
    },

    carousel: {
        display: "block",
        position: "absolute",

        "&:hover": {
            animationPlayState: "paused",
        },
    },

    testimonialCarouselContainer: {
        height: 416,
        width: "100%",
    },

    "@keyframes testimonials": {
        "0%": { left: 0 },
        "18%": { left: 0 },
        "20%": { left: -400 },
        "38%": { left: -400 },
        "40%": { left: -800 },
        "58%": { left: -800 },
        "60%": { left: -1200 },
        "78%": { left: -1200 },
        "80%": { left: -1600 },
        "98%": { left: -1600 },
        "100%": { left: -2000 },
    },

    "@keyframes testimonialsMobile": {
        "0%": { left: 0 },
        "18%": { left: 0 },
        "20%": { left: -360 },
        "38%": { left: -360 },
        "40%": { left: -720 },
        "58%": { left: -720 },
        "60%": { left: -1080 },
        "78%": { left: -1080 },
        "80%": { left: -1440 },
        "98%": { left: -1440 },
        "100%": { left: -1800 },
    },

    testimonialCarousel: {
        width: 4000, // item width * (# of items) * 2
        height: 416,
        animation: "$testimonials 15s linear infinite",

        "@media(max-width: 767px)": {
            width: 3600,
            height: 388,
            animationName: "$testimonialsMobile",
        },
    },

    carouselHalf: {
        float: "left",
        width: "50%",
        height: "100%",
        transform: "translateX(calc(-1000px + 50vw))",

        "@media(max-width: 767px)": {
            transform: "translateX(calc(-900px + 50vw))",
        },
    },

    testimonialContainer: {
        width: 400,
        height: "100%",
        padding: "0 20px",
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",

        "@media(max-width: 767px)": {
            width: 360,
        },
    },

    testimonialCompanyLogo: {
        position: "absolute",
        top: 5,
        left: 0,
        right: 0,
        margin: "0 auto",
        width: 78,
        height: 78,
        borderRadius: "50%",
        border: `5px solid ${vaticleTheme.palette.purple["700"]}`,
    },

    testimonialCompanyLogoDecoration: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        margin: "0 auto",
        width: 88,
        height: 88,
        borderRadius: "50%",
    },

    testimonial: {
        height: 372,
        backgroundColor: vaticleTheme.palette.purple["600"],
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        padding: "0 20px",
        textAlign: "start",

        "@media(max-width: 767px)": {
            height: 344,
        },
    },

    testimonialBody: {
        marginTop: 58,
        height: 196, // lineHeight * 7

        "@media(max-width: 767px)": {
            height: 168,
        },
    },

    testimonialDivider: {
        marginTop: 16,
        height: 0,
        width: "100%",
        border: `1px solid ${vaticleTheme.palette.purple["450"]}`,
    },

    testimonialPerson: {
        marginTop: 16,
        display: "flex",
    },

    testimonialAvatar: {
        height: 48,
        width: 48,
        borderRadius: 5,
    },

    testimonialPersonDetails: {
        marginLeft: 16,
    },

    testimonialPersonName: {
        fontSize: 18,
        lineHeight: "26px",
        fontWeight: 600,
    },

    testimonialPersonJob: {
        fontSize: 16,
        lineHeight: "28px",
        fontWeight: 300,

        "@media(max-width: 767px)": {
            fontSize: 14,
            lineHeight: "24px",
            fontWeight: 400,
        },
    },

    communitySection: {
        width: 1220,
    },

    vaticleWorld: {
        maxWidth: "calc(100vw - 40px)",
    },
});
