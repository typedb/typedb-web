import { makeStyles } from "@material-ui/core";
import { vaticleTheme } from "../styles/theme";

export const typeQLVisualiserStyles = makeStyles({
    container: {
        width: 660,
        height: 400,
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

    header: {
        height: 24,
        borderRadius: "5px 5px 0 0",
        borderBottom: `1px solid ${vaticleTheme.palette.purple["1000"]}`, // TODO: this colour is not in the palette
        backgroundColor: vaticleTheme.palette.purple["850"],
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
    },

    codeAndGraph: {
        height: 352,
        position: "relative",
    },

    codePane: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: "50%",
        zIndex: 50,
        backgroundColor: "transparent",
        overflow: "hidden",
        touchAction: "none",
        display: "flex",
        fontSize: 16,
        lineHeight: "24px",
    },

    lineNumbersSection: {
        flex: "0 0 40px",
        backgroundColor: vaticleTheme.palette.purple["850"],
        borderRight: `1px solid ${vaticleTheme.palette.purple["1000"]}`,
        textAlign: "center",
        fontFamily: "\"Ubuntu Mono\", monospace",
        color: vaticleTheme.palette.blue["200"],
    },

    lineNumbers: {
        margin: "6px 0 8px",
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
        backgroundColor: vaticleTheme.palette.purple["850"],
        padding: "6px 0 8px 20px",
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

    graphPane: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: vaticleTheme.palette.purple["900"], // TODO: this colour is not in the palette
    },

    footer: {
        height: 24,
        borderRadius: "0 0 5px 5px",
        backgroundColor: vaticleTheme.palette.purple["850"],
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 8px",
        fontSize: 12,
        fontWeight: 600,
        color: vaticleTheme.palette.purple["350"], // TODO: this colour is not in the palette
    },

    footerEnd: {
        display: "flex",
        alignItems: "center",
    },

    footerText: {
        marginTop: -2,
    },

    footerEndIcon: {
        marginLeft: 8,
    },

    footerEndCaption: {
        marginLeft: 4,
        marginTop: -1,
    },
});

const blue100 = 0x86AAFF;
const pink200 = 0xF28DD7;
const yellow300 = 0xF6C94C;

export const typeQLGraphColours = {
    entity: pink200,
    relation: yellow300,
    edge: blue100,
};

export const typeQLGraphColoursHex = {
    vertexLabel: "#09022F",
    edge: vaticleTheme.palette.blue["100"],
};

export const typeQLGraphStyles = {
    fontFamily: "Ubuntu Mono",
    fontFamilyFallback: "monospace",

    vertexLabel: {
        fontSize: 16,
    },

    edgeLabel: {
        fontSize: 14,
    },
};
