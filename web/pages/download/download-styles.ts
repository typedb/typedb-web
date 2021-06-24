import {makeStyles} from '@material-ui/core/styles';
import {vaticleTheme} from "../../common/styles/theme";

export const downloadPageStyles = makeStyles({
    contactFormContainer: {
        "@media(min-width: 1200px)": {
            marginLeft: 40,
            marginRight: 40,
        },
    },
});

const tabGroupBorderRadius = 11;

export const downloadPageProductStyles = makeStyles({
    // TODO: These styles are based on homePageStyles.mainLinks - maybe we can extract a component?
    tabGroup: {
        width: '100%',
        marginLeft: "auto",
        marginRight: "auto",

        "@media(max-width: 767px)": {
            width: 288,
            display: "block !important",
        },

        "& a, & a:visited": {
            color: "#FFF",
        },
    },

    firstTabItem: {
        borderTopLeftRadius: tabGroupBorderRadius,

        "@media(min-width: 768px)": {
            borderBottomLeftRadius: tabGroupBorderRadius,
        },

        "@media(max-width: 767px)": {
            borderTopRightRadius: tabGroupBorderRadius,
        },
    },

    tabItem: {
        height: 96,
        border: `1px solid ${vaticleTheme.palette.purple["300"]}`,

        "@media(min-width: 768px)": {
            borderRightStyle: "none",
        },

        "@media(max-width: 767px)": {
            borderBottomStyle: "none",
        },
    },

    lastTabItem: {
        borderBottomRightRadius: tabGroupBorderRadius,

        "@media(min-width: 768px)": {
            borderTopRightRadius: tabGroupBorderRadius,
            borderRightStyle: "solid !important",
        },

        "@media(max-width: 767px)": {
            borderBottomLeftRadius: tabGroupBorderRadius,
            borderBottomStyle: "solid !important",
        },
    },

    tabItemSelected: {
        backgroundColor: vaticleTheme.palette.purple["300"],
    },

    tabIntro: {
        margin: "40px auto",
    },

    comparisonBlock: {
        width: "100%",
        display: "flex",
        marginTop: 80,

        "@media(max-width: 767px)": {
            marginTop: 60,
            flexDirection: "column",
        },
    },

    comparisonBlockItem: {
        flex: 1,
        display: "flex",
        flexDirection: "column",

        "@media(max-width: 767px)": {
            "&:not(:first-child)": {
                marginTop: 30,
            },
        }
    },

    comparisonBlockItemTitle: {
        height: 45,
        color: vaticleTheme.palette.purple["700"],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "@media(max-width: 767px)": {
            borderRadius: "5px 5px 0 0",
        },
    },

    comparisonBlockItem1Title: {
        borderTopLeftRadius: 5,
        backgroundColor: vaticleTheme.palette.green["300"],
    },

    comparisonBlockItem2Title: {
        borderTopRightRadius: 5,
        backgroundColor: "#8069F5",
    },

    comparisonBlockItemBody: {
        flex: 1,
        backgroundColor: vaticleTheme.palette.purple["800"],
        padding: "35px 64px 35px 30px",
        display: "flex",
        flexDirection: "column",
        textAlign: "start",
    },

    comparisonBlockHeading: {
        position: "relative",

        "&:not(:first-child)": {
            marginTop: 24,
        },
    },

    comparisonBlockHeadingCheck: {
        position: "absolute",
        top: 8,
    },

    comparisonBlockContent: {
        marginLeft: 34, // item body's (right padding) - (left padding)
    },

    comparisonBlockMainAction: {
        textAlign: "center",
    },

    selectGroup: {
        marginTop: 32,
        display: "flex",

        "& *": {
            flex: 1,
        },

        "@media(min-width: 480px)": {
            "& > :not(:first-child)": {
                marginLeft: 16,
            },
        },

        "@media(max-width: 479px)": {
            flexDirection: "column",

            "& > :not(:first-child)": {
                marginTop: 16,
            },
        }
    },
});
