import { makeStyles } from "@material-ui/core";
import { vaticleTheme } from "../styles/theme";

const borderBlack = "#08022E";

export const codeStyles = makeStyles({
    windowContainer: {
        width: 660,
        height: 409,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",

        "@media(max-width: 767px)": {
            marginLeft: "50%",
            transform: "translateX(-50%) scale(.54)",
            marginTop: -92, // (1 - scale) * height / 2
            marginBottom: -92,
        },
    },

    windowHeader: {
        display: "flex",
        borderBottom: `1px solid ${borderBlack}`,
    },

    codePane: {
        flex: 1,
        width: "100%",
        display: "flex",
        fontSize: 16,
        lineHeight: "24px",

        "&$resizable": {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "50%",
            zIndex: 50,
            backgroundColor: "transparent",
            overflow: "hidden",
            touchAction: "none",
        },
    },

    resizable: {},

    lineNumbersSection: {
        flex: "0 0 40px",
        backgroundColor: "#140B44",
        borderRight: `1px solid ${borderBlack}`,
        textAlign: "center",
        fontFamily: "\"Ubuntu Mono\", monospace",
        color: "#888DCA",
    },

    lineNumbers: {
        display: "flex",
        flexDirection: "column",
    },

    codeSection: {
        width: "calc(100% - 40px)",

        "&$console": {
            width: "100%",

            "& pre": {
                borderRadius: "0 0 5px 5px",
            },
        },
    },

    console: {},

    codeArea: {
        width: "100%",
        height: "100%",
        backgroundColor: "#140B44",
        paddingLeft: 10,

        "&$resizable": {
            width: "calc(100% - 12px)",
            marginRight: 12,
        },
    },

    code: {
        fontFamily: "\"Ubuntu Mono\", monospace",
        display: "inline-block",
        width: "100%",
        height: "100%",
        overflowX: "scroll",
    },

    panelSlider: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 50,
    },

    tabsContainer: {
        height: 360,
        position: "relative",
    },

    polyglotTabs: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },

    polyglotTabGroup: {
        height: 48,
    },

    polyglotTab: {
        position: "initial", // TODO: delete this once position isn't set to absolute elsewhere
        backgroundColor: vaticleTheme.palette.purple["600"],
        color: "#888DCA",

        "&:hover": {
            backgroundColor: vaticleTheme.palette.purple["400"],
        },
    },

    polyglotTabSelected: {
        backgroundColor: `${vaticleTheme.palette.purple["300"]} !important`,
        color: "#FFF !important",
    },

    polyglotTabContent: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
});

export const codeVisualiserFooterStyles = makeStyles({
    root: {
        height: 24,
        borderRadius: "0 0 5px 5px",
        backgroundColor: "#0B0339",
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        fontSize: 12,
        color: "#484B72",
    },

    icon: {
        marginLeft: 8,
    },

    iconLabel: {
        marginLeft: 5,
    }
});
