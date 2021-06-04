import { makeStyles } from '@material-ui/core/styles';
import { vaticleTheme } from "./theme";

export const vaticleStyles = makeStyles({
    firstSection: {
        marginTop: 180,

        "@media(max-width: 767px)": {
            marginTop: 140,
        },
    },

    sectionMargin: {
        marginTop: 160,

        "@media(max-width: 767px)": {
            marginTop: 120,
        },
    },

    subsectionMargin: {
        marginTop: 80,

        "@media(max-width: 767px)": {
            marginTop: 60,
        },
    },

    contentMargin: {
        marginTop: 40,

        "@media(max-width: 767px)": {
            marginTop: 30,
        },
    },

    h1: vaticleTheme.h1,

    h2: vaticleTheme.h2,

    h3: vaticleTheme.h3,

    h4: vaticleTheme.h4,

    h5: vaticleTheme.h5,

    h6: vaticleTheme.h6,

    textMarginLarge: {
        marginTop: 16,

        "@media(max-width: 767px)": {
            marginTop: 8,
        },
    },

    textMarginSmall: {
        marginTop: 8,
    },

    largeText: {
        margin: '0 auto',
        marginTop: 16,
        fontSize: 20,
        fontWeight: 300,
        lineHeight: '34px',
        maxWidth: '960px',

        "@media(max-width: 767px)": {
            fontSize: 18,
            lineHeight: "28px",
        },
    },

    mediumText: {
        fontSize: 16,
        lineHeight: "28px",
        fontWeight: 300,

        "@media(max-width: 767px)": {
            fontSize: 14,
            lineHeight: "23px",
        },
    },

    smallText: {
        fontSize: 14,
        lineHeight: "23px",
        fontWeight: 300,
    },

    learnMore: {
        width: 160,

        "@media(max-width: 767px)": {
            marginLeft: "auto",
            marginRight: "auto",
        },
    },

    mainActionList: {
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fit, 224px)",
        gap: "30px 40px",
    },

    buttonCaption: {
        marginTop: 24,
    },

    check: {
        height: 16,
        width: 8,
        borderRight: "2px solid #FFF",
        borderBottom: "2px solid #FFF",
        transform: "rotate(45deg)",
    },

    checkGreen: {
        borderColor: `${vaticleTheme.palette.green["300"]} !important`,
    },

    checkPurple: {
        borderColor: "#8069F5 !important",
    },

    horizontalBulletedList: {
        display: "flex",

        "& li": {
            position: "relative",
            margin: "0 1.25em 0 .75em",

            "&:before": {
                content: "'•'",
                position: "absolute",
                left: "-.75em",
                top: ".1em",
                fontSize: "1em",
                fontFamily: "Arial",
            },
        }
    },

    // TODO: This may prevent nearby elements from being clickable
    pageAnchor: {
        paddingTop: 80,
        marginTop: -80,
    },

    filler: {
        flex: 1,
    },

    fullWidth: {
        width: "100%",
    },

    hideDesktop: {
        "@media(min-width: 1200px)": {
            display: "none !important",
        },
    },

    showDesktop: {
        "@media(max-width: 1199px)": {
            display: "none !important",
        },
    },

    hideMobile: {
        "@media(max-width: 767px)": {
            display: "none !important",
        },
    },

    showMobile: {
        "@media(min-width: 768px)": {
            display: "none !important",
        },
    },
});
