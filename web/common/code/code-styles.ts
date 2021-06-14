import { makeStyles } from "@material-ui/core";

const borderBlack = "#08022E";

export const codeStyles = makeStyles({
    windowContainer: {
        width: 660,
        height: 409,
        flexShrink: 0,

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
        // position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: "100%",
        zIndex: 50,
        backgroundColor: "transparent",
        overflow: "hidden",
        touchAction: "none",
        display: "flex",
        fontSize: 16,
        lineHeight: "24px",

        "&$resizable": {
            width: "50%",
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
    },

    codeArea: {
        width: "calc(100% - 12px)",
        height: "100%",
        marginRight: 12,
        backgroundColor: "#140B44",
        paddingLeft: 20,
    },

    code: {
        fontFamily: "\"Ubuntu Mono\", monospace",
        display: "inline-block",
        width: "100%",
        overflow: "hidden",
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

    polyglotTabItem: {
        position: "initial",
    },
});
