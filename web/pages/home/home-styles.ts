import {makeStyles} from '@material-ui/core/styles';
import {vaticleTheme} from "../../common/styles/theme";

export const vaticleGalaxyStyles = makeStyles({
    root: {
        "@media(max-width: 767px)": {
            position: "absolute",
            transform: "translateX(-50%) scale(.667)",
        },
    },

    winkWink: {
        transformOrigin: "40px 40px",
        animation: "$winkWink 20s ease-in-out infinite",
    },

    green: {
        animation: "$spin 320s linear infinite",
        transformOrigin: "center",
    },

    yellow: {
        animation: "$spin 200s linear infinite",
        transformOrigin: "center",
    },

    red: {
        animation: "$spin 120s linear infinite",
        transformOrigin: "center",
    },

    pink: {
        animation: "$spin 260s linear infinite",
        transformOrigin: "center",
    },

    "@keyframes spin": {
        from: {
            transform: "rotate(0deg)",
        },
        to: {
            transform: "rotate(360deg)",
        },
    },

    "@keyframes winkWink": {
        "0%": { transform: "scaleY(1)" },
        "99%": { transform: "scaleY(1)" },
        "99.2%": { transform: "scaleY(0.1)" },
        "99.8%": { transform: "scaleY(0.1)" },
        "100%": { transform: "scaleY(1)" },
    },
});

export const homePageStyles = makeStyles({
    vaticleGalaxyContainer: {
        width: "100%",

        "@media(max-width: 767px)": {
            marginTop: -60,
            position: "relative",
            height: 1, // This forces the element to take up space on the screen, so the header text gets a top margin.
        },
    },

    typeDBIntro: {
        "@media(max-width: 767px)": {
            marginTop: 450,
        },

        "@media(max-width: 479px)": {
            display: "none",
        },
    },

    typeDBIntroMobile: {
        marginTop: 450,

        "@media(min-width: 480px)": {
            display: "none",
        },
    },

    typeDBIntroBody: {
        maxWidth: "650px !important",
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
        "@media(min-width: 768px)": {
            borderLeftStyle: "none !important",
        },

        "@media(max-width: 767px)": {
            borderTopStyle: "none !important",
        },
    },

    mainLink: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 160,

        "@media(min-width: 768px)": {
            borderLeft: `1px solid ${vaticleTheme.palette.purple["300"]}`,
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
});

export const corporateLogosStyleVars = {
    cellWidth: {
        desktop: 195,
        mobile: 150,
    },

    rowSpacing: {
        desktop: 40,
        mobile: 20,
    },

    columnSpacing: {
        desktop: 65,
        mobile: 30,
    },
};

export const corporateLogosStyles = makeStyles({
    corporateLogos: {
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${corporateLogosStyleVars.cellWidth.desktop}px, 1fr))`,
        placeItems: "center center",
        gap: `${corporateLogosStyleVars.columnSpacing.desktop}px ${corporateLogosStyleVars.rowSpacing.desktop}px`,

        "@media(max-width: 767px)": {
            gridTemplateColumns: `repeat(auto-fit, minmax(${corporateLogosStyleVars.cellWidth.mobile}px, 1fr))`,
            gap: `${corporateLogosStyleVars.columnSpacing.mobile}px ${corporateLogosStyleVars.rowSpacing.mobile}px`,
        },
    },

    corporateLogoContainer: {
        width: 185,
        height: 70,
        display: "flex",

        "@media(max-width: 767px)": {
            width: 145,
            height: 55,
        },
    },

    corporateLogo: {
        maxWidth: 185,
        maxHeight: 70,
        margin: "auto",

        "@media(max-width: 767px)": {
            maxWidth: 145,
            maxHeight: 55,
        },
    },

    corporateLogoFadeIn: {
        animation: "$fadeIn ease-in-out .7s",
        animationFillMode: "both",
    },

    corporateLogoFadeOut: {
        animation: "$fadeOut ease-in-out .7s",
        animationFillMode: "both",
    },

    "@keyframes fadeIn": {
        "0%": {opacity: 0},
        "100%": {opacity: 1},
    },

    "@keyframes fadeOut": {
        "0%": {opacity: 1},
        "100%": {opacity: 0},
    },
});

export const homePageIndustryStyles = makeStyles({
    industryDescription: {
        height: 102,

        "@media(max-width: 900px)": {
            height: 170,
        },

        "@media(max-width: 479px)": {
            height: 252,
        },
    },

    sectionToggleGroupContainer: {
        "@media(max-width: 767px)": {
            display: "flex",
            justifyContent: "center",
        },
    },

    sectionToggleGroup: {
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fit, 185px)",
        rowGap: "24px",

        "@media(max-width: 767px)": {
            display: "flex",
            borderRadius: 5,
            backgroundColor: vaticleTheme.palette.purple["600"],
        },
    },

    sectionToggle: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 5,

        "@media(max-width: 767px)": {
            backgroundColor: vaticleTheme.palette.purple[600],
        },
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
            "& g, & ellipse, & circle, & path": {
                stroke: "#FFF",
            },
        },

        "@media(max-width: 767px)": {
            width: "17vw",
            height: "17vw",
        },

        "@media(max-width: 479px)": {
            "& svg": {
                transform: "scale(.85)",
            },
        },
    },

    sectionToggleIconContainerSelected: {
        borderColor: vaticleTheme.palette.green["300"],

        "& svg": {
            "& g, & ellipse, & circle, & path": {
                stroke: `${vaticleTheme.palette.green[300]} !important`,
            },
        },
    },

    sectionToggleTitle: {
        marginTop: 27,
        fontSize: 16,
        lineHeight: "28px",
        fontWeight: 300,

        "@media(max-width: 767px)": {
            display: "none !important",
        },
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
            gridTemplateRows: "repeat(auto-fit, 192px)",
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

        "@media(max-width: 767px)": {
            padding: "24px 10px",
            height: 192,

            "& svg": {
                transform: "scale(.8)",
                marginTop: -5,
                marginBottom: -5,
            },
        },

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

const testimonialWidth = 400;
const testimonialWidthMobile = 360;
const testimonialCount = 14;

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
        "0%": {left: 0},
        "100%": {left: -testimonialWidth * testimonialCount},
    },

    "@keyframes testimonialsMobile": {
        "0%": {left: 0},
        "100%": {left: -testimonialWidthMobile * testimonialCount},
    },

    testimonialCarousel: {
        width: testimonialWidth * testimonialCount * 3,
        height: 416,
        animation: `$testimonials ${testimonialCount * 12}s linear infinite`,

        "@media(max-width: 767px)": {
            width: testimonialWidthMobile * testimonialCount * 3,
            height: 388,
            animationName: "$testimonialsMobile",
        },
    },

    carouselHalf: {
        float: "left",
        width: testimonialWidth * testimonialCount,
        height: "100%",

        "@media(max-width: 767px)": {
            width: testimonialWidthMobile * testimonialCount,
        },
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
        marginTop: 4,
        display: "flex",
        alignItems: "center",

        "@media(max-width: 767px)": {
            marginTop: 6,
        },
    },

    testimonialAvatar: {
        height: 64,
        width: 64,
        borderRadius: 5,

        "@media(max-width: 767px)": {
            marginTop: 2,
        },
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
        fontWeight: 300,

        "@media(max-width: 767px)": {
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: 400,
        },
    },
});
