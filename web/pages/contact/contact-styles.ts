import {makeStyles} from "@material-ui/core";
import {vaticleTheme} from "../../common/styles/theme";

export const contactFormStyles = makeStyles({
    root: {
        backgroundColor: vaticleTheme.palette.purple["600"],
        color: "#FFF",
        textAlign: "center",
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

        "@media(min-width: 1200px)": {
            width: 880,
        },

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

        "@media (min-width: 768px) and (max-width: 1199px)": {
            "& > *:not(:first-child)": {
                marginLeft: 30,
            },
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
            flexDirection: "column",

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

    helpTopics: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },

    helpTopicsLists: {
        width: "100%",
        display: "flex",

        "@media(max-width: 479px)": {
            marginTop: 6,
            flexDirection: "column",
        },
    },

    helpTopicsList: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",

        "@media(min-width: 480px)": {
            marginTop: 6,
        },
    },

    formControlLabel: {
        marginRight: "0 !important",
        textAlign: "start",
    },
});
