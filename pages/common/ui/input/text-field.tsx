import * as React from 'react';
import clsx from 'clsx';
import { textFieldStyles } from './input-styles';
import { TextField } from "@material-ui/core";

export interface VaticleTextFieldProps {
    type: string;
    label?: string;
    className?: string;
}

export const VaticleTextField: React.FC<VaticleTextFieldProps> = ({type, label, className}) => {
    const classes = textFieldStyles();

    return <TextField type={type} label={label} variant="outlined" className={clsx(classes.root, className)}/>;
};
