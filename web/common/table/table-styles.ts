import { makeStyles } from "@material-ui/core";
import { vaticleTheme } from "../styles/theme";

export const tableStyles = makeStyles({
    dataTable: {
        width: "100%",
        tableLayout: "fixed",
    },

    dataTableHeader: {},

    dataTableHeaderItem: {
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

    dataTableBody: {
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
