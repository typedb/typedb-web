import {makeStyles} from "@material-ui/core";
import { standardMargins } from "../styles/vaticle-styles";
import { vaticleTheme } from "../styles/theme";

export const featureStyles = makeStyles({
    featureWithSnippet: {
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

    snippetLeft: {
        "@media(min-width: 1200px)": {
            flexDirection: "row",
        },
    },

    snippetRight: {
        "@media(min-width: 1200px)": {
            flexDirection: "row-reverse",
        },
    },

    snippetSpacingLeft: {
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

    snippetSpacingRight: {
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

    typeQLSnippet: {
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

    featurePanelList: {
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fit, 360px)",
        gridTemplateRows: "repeat(auto-fit, 260px)",
        gap: 40,

        "@media(max-width: 767px)": {
            gridTemplateColumns: "repeat(auto-fit, 335px)",
            gridTemplateRows: "repeat(auto-fit, 192px)",
            gap: 30,
        },
    },

    featurePanel: {
        backgroundColor: vaticleTheme.palette.purple["4"],
        borderRadius: 5,
        padding: "32px 40px",
        border: "1px solid transparent",
        transition: "border-color 100ms ease",
        position: "relative",

        "@media(max-width: 767px)": {
            padding: "24px 10px",
            height: 192,

            "& svg": {
                transform: "scale(.8)",
                marginTop: -5,
                marginBottom: -5,
            },
        },

        "&:hover": {
            borderColor: vaticleTheme.palette.green["1"],
        },
    },

    featurePanelComingSoonBanner: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 100,
        height: 32,
        borderRadius: 5,
        backgroundColor: vaticleTheme.palette.purple["6"],
        display: "inline-flex",
        justifyContent: "center",
        fontSize: 14,
        lineHeight: "28px",
        fontWeight: 400,
    },
});
