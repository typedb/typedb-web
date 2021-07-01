import { makeStyles } from '@material-ui/core/styles';
import { vaticleTheme } from "./theme";

export const standardMargins = {
    firstSection: {
        desktop: 180,
        mobile: 140,
    },

    section: {
        desktop: 160,
        mobile: 120,
    },

    subsection: {
        desktop: 80,
        mobile: 60,
    },

    content: {
        desktop: 40,
        mobile: 30,
    },

    text: {
        desktop: 16,
        mobile: 8,
    },
}

export const standardTextStyles = {
    desktop: {
        fontSize: 16,
        lineHeight: "28px",
        fontWeight: 300,
    },
    mobile: {
        fontSize: 14,
        lineHeight: "23px",
        fontWeight: 300,
    },
}

export const sectionIntroMaxWidth = 800;

export const vaticleStyles = makeStyles({
    firstSectionMargin: {
        marginTop: standardMargins.firstSection.desktop,

        "@media(max-width: 767px)": {
            marginTop: standardMargins.firstSection.mobile,
        },
    },

    sectionMargin: {
        marginTop: standardMargins.section.desktop,

        "@media(max-width: 767px)": {
            marginTop: standardMargins.section.mobile,
        },
    },

    subsectionMargin: {
        marginTop: standardMargins.subsection.desktop,

        "@media(max-width: 767px)": {
            marginTop: standardMargins.subsection.mobile,
        },
    },

    contentMargin: {
        marginTop: standardMargins.content.desktop,

        "@media(max-width: 767px)": {
            marginTop: standardMargins.content.mobile,
        },
    },

    h1: vaticleTheme.h1,

    h2: vaticleTheme.h2,

    h3: vaticleTheme.h3,

    h4: vaticleTheme.h4,

    h5: vaticleTheme.h5,

    h6: vaticleTheme.h6,

    textMargin: {
        marginTop: standardMargins.text.desktop,

        "@media(max-width: 767px)": {
            marginTop: standardMargins.text.mobile,
        },
    },

    textMarginSmall: {
        marginTop: 8,
    },

    headlineText: {
        margin: '0 auto',
        marginTop: standardMargins.text.desktop,
        fontSize: 20,
        fontWeight: 300,
        lineHeight: '34px',

        "@media(max-width: 767px)": {
            fontSize: 18,
            lineHeight: "28px",
        },
    },

    sectionIntro: {
        margin: "0 auto",
        marginTop: standardMargins.text.desktop,
        maxWidth: sectionIntroMaxWidth,
        ...standardTextStyles.desktop,

        "@media(max-width: 767px)": standardTextStyles.mobile,
    },

    mediumText: {
        ...standardTextStyles.desktop,

        "@media(max-width: 767px)": standardTextStyles.mobile,
    },

    smallText: {
        fontSize: 14,
        lineHeight: "23px",
        fontWeight: 300,
    },

    learnMore: {
        width: 160,

        "@media(max-width: 767px)": {
            width: 224,
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
        borderColor: `${vaticleTheme.palette.green["1"]} !important`,
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

    pageAnchor: {
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
