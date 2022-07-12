import {makeStyles} from '@material-ui/core/styles';
import {vaticleTheme} from "../../common/styles/theme";
import { sectionIntroMaxWidth, standardMargins, standardTextStyles } from "../../common/styles/vaticle-styles";

export const vaticleGalaxyStyles = makeStyles({
    root: {
        "@media (min-width: 768px) and (max-width: 1920px)": {
            position: "absolute",
            transform: "translateX(-50%) scale(.75)",
        },

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
    homePageFirstSection: {
        marginTop: 160,

        "@media(min-width: 1921px)": {
            marginTop: standardMargins.firstSection.desktop,
        },
    },

    vaticleGalaxyContainer: {
        width: "100%",

        "@media(max-width: 1920px)": {
            marginTop: -60,
            position: "relative",
            height: 1, // This forces the element to take up space on the screen, so the header text gets a top margin.
        },
    },

    typeDBIntro: {
        "@media(max-width: 1920px)": {
            marginTop: 470,
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
        maxWidth: 650,
    },

    mainLinkIconCircle: {
        width: "60px !important", // overrides style set by FontAwesome
        height: 60,
        borderRadius: "50%",
        color: `${vaticleTheme.palette.purple["3"]} !important`, // overrides style set by MainLink
        backgroundColor: "#FFF",
        padding: "14px 13px 14px 15px",
    },

    downloadTypeDBButton: {
        height: "72px !important",
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
    useCaseDescription: {
        ...standardTextStyles.desktop,
        maxWidth: sectionIntroMaxWidth,
        margin: "0 auto",
        height: parseInt(standardTextStyles.desktop.lineHeight) * 3,
        marginTop: standardMargins.text.desktop,

        "@media(max-width: 767px)": {
            ...standardTextStyles.mobile,
            marginTop: standardMargins.text.mobile,
            height: parseInt(standardTextStyles.mobile.lineHeight) * 4,
        },

        "@media(max-width: 479px)": {
            height: parseInt(standardTextStyles.mobile.lineHeight) * 7,
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
            backgroundColor: vaticleTheme.palette.purple["4"],
        },
    },

    sectionToggle: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 5,

        "@media(max-width: 767px)": {
            backgroundColor: vaticleTheme.palette.purple["4"],
        },
    },

    sectionToggleIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 5,
        backgroundColor: vaticleTheme.palette.purple["4"],
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid transparent",
        transition: "border-color 100ms ease",
        cursor: "pointer",

        "&:hover": {
            borderColor: vaticleTheme.palette.green["1"],
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
        borderColor: vaticleTheme.palette.green["1"],

        "& svg": {
            "& g, & ellipse, & circle, & path": {
                stroke: `${vaticleTheme.palette.green["1"]} !important`,
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

export const homePageTypeDBStyles = makeStyles({
    intro: {
        maxWidth: "850px !important",
    },

    actions: {
        marginTop: standardMargins.subsection.desktop,

        "@media(max-width: 767px)": {
            marginTop: standardMargins.content.mobile,
        },
    },
});

export const homePageClusterStyles = makeStyles({
    clusterAction: {
        width: 224,
    },
});
