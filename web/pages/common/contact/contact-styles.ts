import { makeStyles } from "@material-ui/core";
import { vaticleTheme } from "../../../common/styles/theme";

export const contactFormStyles = makeStyles({
    root: {
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: vaticleTheme.palette.purple["600"],
        padding: "80px 100px",

        "@media(max-width: 1199px)": {
            paddingLeft: 60,
            paddingRight: 60,
        },

        "@media(max-width: 1023px)": {
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: 40,
            paddingRight: 40,
        },

        "@media(max-width: 767px)": {
            paddingLeft: 30,
            paddingRight: 30,
        },
    },

    form: {
        display: "flex",
        flexDirection: "column",

        "@media(max-width: 767px)": {
            alignItems: "center",
        },
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

            "@media (min-width: 768px) and (max-width: 1199px)": {
                maxWidth: "40vw",
            },

            "@media(max-width: 767px)": {
                maxWidth: "calc(100vw - 100px)",
            },
        },

        "@media(max-width: 767px)": {
            display: "block",

            "& > *:not(:first-child)": {
                marginTop: 30,
            },
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
