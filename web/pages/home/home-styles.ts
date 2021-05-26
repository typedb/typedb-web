import { makeStyles } from '@material-ui/core/styles';
import { vaticleTheme } from "../../common/styles/theme";

const testimonialWidth = 400;
const testimonialWidthMobile = 360;

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

    downloadTypeDBButton: {
        height: '72px !important',
    },

    videoPlayer: {
        width: 760,
        height: 451,

        "@media(max-width: 800px)": {
            width: "calc(100vw - 40px)",
            height: "calc((100vw - 40px) * .6)",
        },
    },

    communitySection: {
        width: 1220,
    },

    vaticleWorld: {
        maxWidth: "calc(100vw - 40px)",
    },
});

export const homePageCorporateLogosStyles = makeStyles({
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

    corporateLogo: {
        maxWidth: 185,
        maxHeight: 70,

        "@media(max-width: 767px)": {
            maxWidth: 145,
            maxHeight: 55,
        },
    },
});

export const homePageIndustryStyles = makeStyles({
    industryDescription: {
        height: 102,

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
});

export const homePageClusterStyles = makeStyles({
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
        cursor: "default !important",

        // TODO: reintroduce this (and remove cursor: default) when the links are functional
        // "&:hover": {
        //     borderColor: vaticleTheme.palette.green[300],
        // },
    },

    featurePanelBanner: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 100,
        height: 32,
        borderRadius: 5,
        backgroundColor: vaticleTheme.palette.purple["400"], // TODO: this colour is not in the palette
        display: "inline-flex",
        justifyContent: "center",
        fontSize: 14,
        lineHeight: "28px",
        fontWeight: 400,
    },

    clusterAction: {
        width: 224,
    },
});

export const homePageTestimonialsStyles = makeStyles({
    testimonialsSection: {
        width: "100vw",
        maxWidth: "100vw",
    },

    carouselContainer: {
        overflow: "hidden",
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
        "100%": { left: -testimonialWidth * 8 },
    },

    "@keyframes testimonialsMobile": {
        "0%": { left: 0 },
        "100%": { left: -testimonialWidthMobile * 8 },
    },

    testimonialCarousel: {
        width: testimonialWidth * 24, // item width * (# of items) * 3
        height: 416,
        animation: "$testimonials 96s linear infinite", // (# of items) * 12s

        "@media(max-width: 767px)": {
            width: testimonialWidthMobile * 24,
            height: 388,
            animationName: "$testimonialsMobile",
        },
    },

    carouselHalf: {
        float: "left",
        width: "33.3334%",
        height: "100%",
    },

    testimonialContainer: {
        width: testimonialWidth,
        height: "100%",
        padding: "0 20px",
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",

        "@media(max-width: 767px)": {
            width: testimonialWidthMobile,
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
        border: `1px solid ${vaticleTheme.palette.purple["450"]}`, // TODO: this colour is not in the palette
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
        lineHeight: "24px",
        marginTop: 2,
        fontWeight: 300,

        "@media(max-width: 767px)": {
            fontSize: 14,
            lineHeight: "20px",
            marginTop: 2,
            fontWeight: 400,
        },
    },
});
