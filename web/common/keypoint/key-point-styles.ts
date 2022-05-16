import { makeStyles, Theme } from "@material-ui/core";
import { standardMargins } from "../styles/vaticle-styles";
import { vaticleTheme } from "../styles/theme";
import { KeyPointPanelProps, KeyPointPanelsProps } from "./key-point-panels";

export const keyPointStyles = makeStyles({
    keyPointWithExample: {
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

    exampleSpacingLeft: {
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

    exampleSpacingRight: {
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

export const keyPointPanelGridStyles = makeStyles<Theme, KeyPointPanelsProps>({
    keyPointPanelGrid: {
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fit, 360px)",
        gridTemplateRows: ({panelHeight}) => `repeat(auto-fit, ${panelHeight?.desktop || 260}px)`,
        gap: 40,

        "@media(max-width: 767px)": {
            gridTemplateColumns: "repeat(auto-fit, 335px)",
            gridTemplateRows: ({panelHeight}) => `repeat(auto-fit, ${panelHeight?.mobile || 192}px)`,
            gap: 30,
        },
    },
});

export const keyPointPanelStyles = makeStyles<Theme, KeyPointPanelProps>({
    keyPointPanel: {
        backgroundColor: vaticleTheme.palette.purple["4"],
        borderRadius: 5,
        padding: ({horizontalPadding}) => `32px ${horizontalPadding || 40}px`,
        border: "1px solid transparent",
        transition: "border-color 100ms ease",
        position: "relative",

        "& svg": {
            width: 52,
            height: 52,
        },

        "@media(max-width: 767px)": {
            padding: "24px 10px",
            height: ({mobileHeight}) => mobileHeight || 192,

            "& svg": {
                transform: "scale(.8)",
                marginTop: -5,
                marginBottom: -5,
            },
        },

        "&:hover": {
            borderColor: (props) => props.data.linkTo && vaticleTheme.palette.green["1"],
        },
    },

    keyPointPanelComingSoonBanner: {
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

export const keyPointTableStyles = makeStyles({
    tableRow: {
        display: "flex",
        justifyContent: "space-between",
        textAlign: "start",

        "&:not(:first-child)": {
            marginTop: standardMargins.text.desktop,
        },

        "@media(max-width: 767px)": {
            flexDirection: "column",

            "&:not(:first-child)": {
                marginTop: standardMargins.text.mobile,
            },
        },
    },

    titleColumn: {
        width: 170,
        flexShrink: 0,
        fontWeight: "600 !important" as any, // overrides mediumText
        paddingRight: 20,
    },

    bodyColumn: {
        "@media(max-width: 767px)": {
            marginTop: standardMargins.text.mobile,
        },
    },
});
