import {makeStyles} from "@material-ui/core/styles";
import {vaticleTheme} from "../../common/styles/theme";

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

    // TODO: These styles are very similar to DistributionBlock
    comparisonTable: {
        width: "100%",
        tableLayout: "fixed",
    },

    comparisonTableHeader: {},

    comparisonTableHeaderItem: {
        height: 45,
        lineHeight: "45px",
        fontWeight: 600,
        color: vaticleTheme.palette.green["1"],
        backgroundColor: vaticleTheme.palette.purple["1"],
        "&:first-child": {
            borderTopLeftRadius: 5,
        },
        "&:last-child": {
            borderTopRightRadius: 5,
        },
    },

    comparisonTableBody: {
        backgroundColor: vaticleTheme.palette.purple["2"],

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

        "& tr:nth-child(even)": {
            backgroundColor: vaticleTheme.palette.purple["1"],
        },
    },
});
