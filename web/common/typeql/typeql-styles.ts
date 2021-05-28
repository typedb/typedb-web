import { makeStyles } from "@material-ui/core";
import { vaticleTheme } from "../styles/theme";

const borderBlack = "#07053A";

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
        display: "flex",
        borderBottom: `1px solid ${borderBlack}`,
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
        backgroundColor: "#140B44",
        borderRight: `1px solid ${borderBlack}`,
        textAlign: "center",
        fontFamily: "\"Ubuntu Mono\", monospace",
        color: "#888DCA",
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
        backgroundColor: "#140B44",
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
        left: 100,
        bottom: 0,
        right: 0,
        backgroundColor: "#0E053F",
        zIndex: 25,
    },

    graphPaneBG: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "#0E053F",
        zIndex: 20,
    }
});

const blue = 0x86AAFF;
const pink = 0xF28DD7;
const yellow = 0xF6C94C;
const red = 0xF66B65;
const black = 0x09022F;

export const typeQLGraphColours = {
    entity: pink,
    relation: yellow,
    attribute: red,
    edge: blue,
    error: red,
    vertexLabel: black,
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
