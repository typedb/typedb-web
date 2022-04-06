import { makeStyles } from "@material-ui/core";
import { vaticleTheme } from "../styles/theme";

export const tableStyles = makeStyles({
    dataTable: {
        width: "100%",
        display: "table",
        tableLayout: "fixed",
        overflow: "hidden",
        borderRadius: "0 0 5px 5px",
    },

    dataTableHeader: {
        display: "table-header-group",
        borderRadius: "5px 5px 0 0",
    },

    dataTableHeaderItem: {
        display: "table-cell",
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
        display: "table-row-group",
        backgroundColor: vaticleTheme.palette.purple["1"],

        "& th, & td": {
            padding: "10px 30px",
            fontSize: 16,
            lineHeight: "28px",
            fontWeight: 400,

            "@media(max-width: 767px)": {
                fontSize: 14,
                padding: "4px 10px",
                lineHeight: "23px",
            },
        },

        "& td + td, & th + td": {
            borderLeft: "1px solid #08022E",
        },

        "&$striped tr:nth-child(odd)": {
            backgroundColor: vaticleTheme.palette.purple["2"],
        },

        "& tr + tr": {
            borderTop: "1px solid #08022E",
        },
    },

    striped: {},
});
