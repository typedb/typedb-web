import { makeStyles } from "@material-ui/core";
import { vaticleTheme } from "../styles/theme";

export const dialogStyles = makeStyles({
    paper: {
        margin: 0,
        backgroundColor: vaticleTheme.palette.purple["600"],
    },

    dialogTitle: {
        backgroundColor: vaticleTheme.palette.purple["600"],
        paddingBottom: 0,
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: -64,
    },

    closeIcon: {
        color: "#FFF",
    },
});
