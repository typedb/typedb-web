import { makeStyles } from "@material-ui/core/styles";
import { vaticleTheme } from "../../common/styles/theme";

const textLineHeight = 28;

export const legalPageStyles = makeStyles({
    legalSection: {
        textAlign: "start",
    },

    legalParagraph: {
        marginTop: textLineHeight,
    },

    legalList: {
        marginTop: textLineHeight,
    },

    // TODO: These styles are very similar to ComparisonBlock
    comparisonTable: {
        width: "100%",
        tableLayout: "fixed",
    },

    comparisonTableHeader: {

    },

    comparisonTableHeaderItem: {
        height: 45,
        color: vaticleTheme.palette.purple["700"],
        lineHeight: "45px",
        borderRadius: "5px 5px 0 0",
        fontWeight: 600,
    },

    comparisonTableHeaderItem1: {
        backgroundColor: vaticleTheme.palette.green["300"],
        borderTopRightRadius: 0,
    },

    comparisonTableHeaderItem2: {
        backgroundColor: "#8069F5",
        borderTopLeftRadius: 0,
    },

    comparisonTableBody: {
        backgroundColor: "#140B44",

        "& tr + tr": {
            borderTop: "1px solid #08022E",
        },

        "& td": {
            padding: 10,
            fontSize: 16,
            lineHeight: "28px",
            fontWeight: 300,

            "@media(max-width: 767px)": {
                fontSize: 14,
                lineHeight: "23px",
            },
        },

        "& tr:nth-child(even) td:not(:first-child)": {
            backgroundColor: "#0E053F",
        },
    },
});
