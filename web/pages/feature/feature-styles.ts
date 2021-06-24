import {makeStyles} from "@material-ui/core";

export const featureStyles = makeStyles({
    diagramAndCaption: {
        textAlign: "start",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        "@media(max-width: 1199px)": {
            flexDirection: "column",
            textAlign: "center",
            maxWidth: 660,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },

    exampleLeft: {
        "@media(min-width: 1200px)": {
            flexDirection: "row",
        },
    },

    exampleRight: {
        "@media(min-width: 1200px)": {
            flexDirection: "row-reverse",
        },
    },

    diagramCaptionSpacingLeft: {
        "@media(min-width: 1200px)": {
            marginLeft: 40,
        },

        "@media (min-width: 768px) and (max-width: 1199px)": {
            marginTop: 8,
        },
    },

    diagramCaptionSpacingRight: {
        "@media(min-width: 1200px)": {
            marginRight: 40,
        },

        "@media (min-width: 768px) and (max-width: 1199px)": {
            marginTop: 8,
        },
    },

    typeQLExample: {
        height: 360,
        position: "relative",
    },
});
