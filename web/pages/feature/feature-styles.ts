import {makeStyles} from "@material-ui/core";
import { standardMargins } from "../../common/styles/vaticle-styles";
import { vaticleTheme } from "../../common/styles/theme";

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
            marginTop: standardMargins.content.desktop,
        },

        "@media(max-width: 767px)": {
            marginTop: standardMargins.content.mobile,
        },
    },

    diagramCaptionSpacingRight: {
        "@media(min-width: 1200px)": {
            marginRight: 40,
        },

        "@media (min-width: 768px) and (max-width: 1199px)": {
            marginTop: standardMargins.content.desktop,
        },

        "@media(max-width: 767px)": {
            marginTop: standardMargins.content.mobile,
        },
    },

    body: {
        "@media(min-width: 1200px)": {
            marginTop: standardMargins.text.desktop,
        },
    },

    typeQLExample: {
        height: 360,
        position: "relative",
    },

    visualiser: {
        position: "absolute",
        top: 0,
        left: 100,
        bottom: 0,
        right: 0,
        backgroundColor: vaticleTheme.palette.purple["1"],
        zIndex: 25,

        "& canvas": {
            "@media(max-width: 767px)": {
                pointerEvents: "none",
            },
        },
    },
});
