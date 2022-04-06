import { makeStyles } from "@material-ui/core";
import { vaticleTheme } from "../styles/theme";
import { standardMargins } from "../styles/vaticle-styles";

export const comparisonStyles = makeStyles(({
    comparisonBlock: {
        width: "100%",
        display: "flex",
        marginTop: standardMargins.subsection.desktop,

        "@media(max-width: 767px)": {
            marginTop: standardMargins.subsection.mobile,
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
        color: vaticleTheme.palette.purple["3"],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "@media(max-width: 767px)": {
            borderRadius: "5px 5px 0 0",
        },
    },

    comparisonBlockItem1Title: {
        borderTopLeftRadius: 5,
        backgroundColor: vaticleTheme.palette.green["1"],
    },

    comparisonBlockItem2Title: {
        borderTopRightRadius: 5,
        backgroundColor: "#8069F5",
    },

    comparisonBlockItemBody: {
        flex: 1,
        backgroundColor: vaticleTheme.palette.purple["2"],
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
}));
