import { makeStyles } from "@material-ui/core";

export const typeQLVisualiserStyles = makeStyles({
    container: {
        marginTop: 40,
        width: 660,
        maxWidth: "100%",
        height: 400,
        position: "relative",
        backgroundColor: "#0E053F",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.6)",
    },

    svg: {
        display: "block",
        width: "100%",
        height: "100%",
    },

    nodeText: {
        fontSize: 12,
    },

    tooltip: {
        position: "absolute",
        textAlign: "center",
        width: 110,
        padding: 10,
        fontSize: 12,
        background: "lightsteelblue",
        border: 0,
        borderRadius: 8,
        pointerEvents: "none",
    },

    contextMenu: {
        stroke: "#00557d",
        fill: "#fff",
    },

    menuEntry: {
        cursor: "pointer",
    },

    menuEntryText: {
        fontSize: 12,
        stroke: "#00557d",
    },
});
