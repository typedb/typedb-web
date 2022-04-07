import {makeStyles} from "@material-ui/core";

export const contactFormStyles = makeStyles({
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

    inlineForm: {
        "@media(min-width: 1200px)": {
            marginLeft: 40,
            marginRight: 40,
        },
    },
});
