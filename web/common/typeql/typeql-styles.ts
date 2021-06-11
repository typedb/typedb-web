import { makeStyles } from "@material-ui/core";
import { vaticleTheme } from "../styles/theme";

const borderBlack = "#08022E";

export const typeQLVisualiserStyles = makeStyles({
    container: {
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

    header: {
        display: "flex",
        borderBottom: `1px solid ${borderBlack}`,
    },

    codeAndGraph: {
        height: 360,
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

const green = 0x02DAC9;
const pink = 0xFFA9E8;
const yellow = 0xFFE4A7;
const red = 0xF66B65;
const blue = 0x7BA0FF;
const black = 0x09022F;

export const typeQLGraphColours = {
    entity: pink,
    relation: yellow,
    attribute: blue,
    edge: blue,
    inferred: green,
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
