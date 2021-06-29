import { makeStyles } from "@material-ui/core";
import { vaticleTheme } from "../styles/theme";

export const textFieldStyles = makeStyles({
    textField: {
        borderRadius: 5,
        backgroundColor: vaticleTheme.palette.purple["3"],
        color: "#FFF",

        "& input, & textarea": {
            color: "#FFF",
            lineHeight: "24px",
        },

        "& input": {
            padding: "12px 14px"
        },

        "& input + fieldset, & textarea + fieldset": {
            borderColor: "transparent",
            transition: "border-color 100ms ease",
        },

        "& input:hover + fieldset": {
            borderColor: `rgba(255,255,255,.2) !important`,
        },

        "& input:hover:focus + fieldset": {
            borderColor: `${vaticleTheme.palette.green["1"]} !important`,
        },
    },

    inputMultiline: {
        padding: "12px 14px",

        "&:hover fieldset": {
            borderColor: `rgba(255,255,255,.2) !important`,
        },

        "&:hover:focus fieldset": {
            borderColor: `${vaticleTheme.palette.green["1"]} !important`,
        },
    },

    inputFocused: {
        "& fieldset, &:hover fieldset": {
            borderColor: `${vaticleTheme.palette.green["1"]} !important`,
            borderWidth: "1px !important",
        },
    },

    inputLabelShrink: {
        transform: "translate(14px, -7px) scale(0.75) !important",
    },

    inputLabelFocused: {
        color: `${vaticleTheme.palette.green["1"]} !important`,
    },

    inputLabelOutlined: {
        color: "#FFF",
        transform: "translate(14px, 14px) scale(1)",
    },
});
