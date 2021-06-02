import { makeStyles } from "@material-ui/core";
import { vaticleTheme } from "../../../common/styles/theme";

export const contactFormStyles = makeStyles({
    root: {
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: vaticleTheme.palette.purple["600"],
        padding: "80px 100px",
    },

    form: {
        display: "flex",
        flexDirection: "column",
    },

    formRow: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",

        "&:not(:first-child)": {
            marginTop: 30,
        },

        "& > *": {
            width: 375,
        },
    },

    formCell: {
        display: "flex",
        flexDirection: "column",

        "& > * + *": {
            marginTop: 30,
        },
    },

    areasOfInterest: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },

    areasOfInterestCaption: {
        textTransform: "uppercase",
    },

    areasOfInterestLists: {
        width: "100%",
        display: "flex",
    },

    areasOfInterestList: {
        marginTop: 6,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
});
