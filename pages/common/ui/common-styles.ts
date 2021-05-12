import { makeStyles } from '@material-ui/core/styles';
import { vaticleTheme } from "../../styles/theme";

export const commonStyles = makeStyles({
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
    },

    smallText: {
        fontSize: 14,
        lineHeight: "21px",
        fontWeight: 400,
    },

    underDevelopment: {
        maxWidth: 800,
        padding: "16px",
        border: `2px solid ${vaticleTheme.palette.green["200"]}`,
        borderRadius: 5,
        margin: "0 auto",
        fontSize: 16,
    },

    underDevelopmentLink: {
        color: `${vaticleTheme.palette.green["200"]} !important`,
    },

    hideDesktop: {
        "@media(min-width: 1200px)": {
            display: "none",
        },
    },

    showDesktop: {
        "@media(max-width: 1199px)": {
            display: "none",
        },
    },

    hideMobile: {
        "@media(max-width: 767px)": {
            display: "none",
        },
    },

    showMobile: {
        "@media(min-width: 768px)": {
            display: "none",
        },
    },
});
