import { TextField } from "@material-ui/core";
import React from "react";
import { textFieldStyles } from "./input-styles";

interface VaticleTextFieldProps {
    label: string;
    type?: string;
    multiline?: boolean;
}

export const VaticleTextField: React.FC<VaticleTextFieldProps> = ({label, type, multiline}) => {
    const classes = textFieldStyles();

    return <TextField label={label} variant="outlined" type={type} multiline={multiline} rows={10}
                      classes={{root: classes.textField}}
                      InputProps={{classes: {multiline: classes.inputMultiline, focused: classes.inputFocused}}}
                      InputLabelProps={{classes: {root: classes.inputLabel, shrink: classes.inputLabelShrink,
                              focused: classes.inputLabelFocused, outlined: classes.inputLabelOutlined}}}/>
}
