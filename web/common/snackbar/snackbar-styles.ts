import { makeStyles } from "@material-ui/core";
import { vaticleTheme } from "../styles/theme";

export const snackbarStyles = makeStyles({
    root: {
        "& > *": {
            color: vaticleTheme.palette.purple["700"],
            fontWeight: 600,
        },

        "& .MuiSnackbarContent-action": {
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: 0,
        },
    },

    success: {
        "& > *": {
            backgroundColor: vaticleTheme.palette.green["300"],
        },
    },

    error: {
        "& > *": {
            backgroundColor: vaticleTheme.palette.red["100"],
        },
    },

    statusIcon: {
        marginRight: ".75em",
    },

    close: {
        marginLeft: "1em",
        marginRight: -8,
    },
});
