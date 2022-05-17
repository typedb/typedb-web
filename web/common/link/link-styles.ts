import { makeStyles } from "@material-ui/core";
import { vaticleTheme } from "../styles/theme";

export const linkStyles = makeStyles({
    mainLinks: {
        width: '100%',
        marginLeft: "auto",
        marginRight: "auto",
        display: 'flex',
        border: `1px solid ${vaticleTheme.palette.purple["7"]}`,
        borderRadius: 11,

        "@media(max-width: 767px)": {
            width: 288,
            display: "block",
        },
    },

    mainLink: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 160,

        "&:not(:first-child)": {
            "@media(min-width: 768px)": {
                borderLeft: `1px solid ${vaticleTheme.palette.purple["7"]}`,
            },

            "@media(max-width: 767px)": {
                borderTop: `1px solid ${vaticleTheme.palette.purple["7"]}`,
            },
        },

        "& svg": {
            color: "#FFF",
            fontSize: 66,
        },

        "& > p": {
            color: "#FFF",
            marginTop: '8px',
            fontSize: 16,
        },
    },
});
