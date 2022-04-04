import { makeStyles } from "@material-ui/core";
import { vaticleTheme } from "../styles/theme";

const borderBlack = vaticleTheme.palette.purple["1"];

export const macOSWindowHeaderStyles = makeStyles({
    root: {
        borderBottom: `1px solid ${borderBlack}`,
    }
});

export const gitWindowFooterStyles = makeStyles({
    root: {
        height: 24,
        borderRadius: "0 0 5px 5px",
        backgroundColor: "#0B0339",
        display: "inline-flex",
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
