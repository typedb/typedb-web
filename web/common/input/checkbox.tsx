import { Checkbox, CheckboxProps, withStyles } from "@material-ui/core";
import { vaticleTheme } from "../styles/theme";
import React from "react";

export const VaticleCheckbox = withStyles({
    root: {
        color: "transparent",

        "& svg": {
            borderRadius: 5,
            backgroundColor: vaticleTheme.palette.purple["700"],
        },

        '&$checked': {
            color: vaticleTheme.palette.purple["200"],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox size="small" color="default" {...props} />);
