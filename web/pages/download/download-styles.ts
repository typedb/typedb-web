import { makeStyles } from '@material-ui/core/styles';
import { vaticleTheme } from "../../common/styles/theme";

export const downloadPageStyles = makeStyles({
});

const tabGroupBorderRadius = 11;

export const downloadPageProductStyles = makeStyles({
    // TODO: These styles are based on homePageStyles.mainLinks - maybe we can extract a component?
    tabGroup: {
        width: '100%',
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 40,
        display: 'flex',

        "@media(max-width: 767px)": {
            width: 288,
            display: "block",
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
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 96,
        border: `1px solid ${vaticleTheme.palette.purple["300"]}`,
        transition: "background-color 150ms ease",

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

    comparisonBlock: {
        width: "100%",
        display: "flex",
    },

    comparisonBlockItem: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },

    comparisonBlockItemTitle: {
        height: 45,
        color: vaticleTheme.palette.purple["700"],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        textAlign: "start",
    },

    comparisonBlockHeading: {
        position: "relative",
    },

    comparisonBlockHeadingCheck: {
        position: "absolute",
        top: 8,
    },

    comparisonBlockContent: {
        marginLeft: 34, // item body's (right padding) - (left padding)
    },

    // comparisonBlockItem
});
