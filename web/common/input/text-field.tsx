import { TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { textFieldStyles } from "./input-styles";

interface VaticleTextFieldProps {
    name: string;
    autocomplete?: string;
    type?: string;
    value: string;
    setValue: (value: string) => void;
    label: string;
    multiline?: boolean;
    required?: boolean;
}

export const VaticleTextField: React.FC<VaticleTextFieldProps> = ({name, autocomplete, type, value, setValue, label, multiline, required}) => {
    const classes = textFieldStyles();

    return <TextField label={label} variant="outlined" type={type} multiline={multiline} rows={10}
                      name={name} value={value} autoComplete={autocomplete}
                      classes={{root: classes.textField}} onChange={(e) => setValue(e.target.value)} required={required}
                      InputProps={{classes: {multiline: classes.inputMultiline, focused: classes.inputFocused}}}
                      InputLabelProps={{classes: {shrink: classes.inputLabelShrink, focused: classes.inputLabelFocused, outlined: classes.inputLabelOutlined}}}/>
}
