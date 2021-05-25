import { makeStyles } from '@material-ui/core/styles';
import { vaticleTheme } from "./theme";

export const vaticleStyles = makeStyles({
    sectionMarginLarge: {
        marginTop: 160,

        "@media(max-width: 767px)": {
            marginTop: 120,
        },
    },

    sectionMarginSmall: {
        marginTop: 80,

        "@media(max-width: 767px)": {
            marginTop: 60,
        },
    },

    h1: vaticleTheme.h1,

    h2: vaticleTheme.h2,

    h3: vaticleTheme.h3,

    h4: vaticleTheme.h4,

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

    mediumTextUnscaled: {
        fontSize: 16,
        lineHeight: "28px",
        fontWeight: 300,
    },

    smallText: {
        fontSize: 14,
        lineHeight: "23px",
        fontWeight: 300,
    },

    buttonAfterText: {
        marginTop: 40,

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

    mainActionList: {
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fit, 224px)",
        gap: "30px 40px",
    },

    underDevelopment: {
        maxWidth: 800,
        padding: "16px",
        border: `2px solid ${vaticleTheme.palette.green["300"]}`,
        borderRadius: 5,
        margin: "0 auto",
        fontSize: 16,
    },

    underDevelopmentLink: {
        color: `${vaticleTheme.palette.green["300"]} !important`,
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
