import { TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { textFieldStyles } from "./input-styles";

interface VaticleTextFieldProps {
    value: string;
    setValue: (value: string) => void;
    label: string;
    type?: string;
    multiline?: boolean;
}

export const VaticleTextField: React.FC<VaticleTextFieldProps> = ({value, setValue, label, type, multiline}) => {
    const classes = textFieldStyles();

    return <TextField label={label} variant="outlined" type={type} multiline={multiline} rows={10} value={value}
                      classes={{root: classes.textField}} onChange={(e) => setValue(e.target.value)}
                      InputProps={{classes: {multiline: classes.inputMultiline, focused: classes.inputFocused}}}
                      InputLabelProps={{classes: {shrink: classes.inputLabelShrink, focused: classes.inputLabelFocused, outlined: classes.inputLabelOutlined}}}/>
}
