import { makeStyles } from "@material-ui/core";
import { vaticleTheme } from "../../../styles/theme";

export const typeQLVisualiserStyles = makeStyles({
    container: {
        width: 660,
        maxWidth: "100%",
        height: 400,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
    },

    header: {
        height: 24,
        borderRadius: "5px 5px 0 0",
        borderBottom: `1px solid ${vaticleTheme.palette.purple["1000"]}`,
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
        backgroundColor: vaticleTheme.palette.purple["850"],
        overflow: "hidden",
        touchAction: "none",
        boxSizing: "border-box",
        display: "flex",
        fontSize: 16,
        lineHeight: "24px",
    },

    lineNumbersSection: {
        flex: "0 0 40px",
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
        width: 620,
    },

    codeArea: {
        margin: "6px 20px 8px",
    },

    code: {
        fontFamily: "\"Ubuntu Mono\", monospace",
        display: "inline-block",
    },

    graphPane: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: vaticleTheme.palette.purple["900"],
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
        color: vaticleTheme.palette.purple["350"],
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
