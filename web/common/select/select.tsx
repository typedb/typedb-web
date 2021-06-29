import { createStyles, FormControl, InputBase, Select, Theme, withStyles } from "@material-ui/core";
import { vaticleTheme } from "../styles/theme";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { selectStyles } from "./select-styles";
import { ClassProps } from "../class-props";

interface VaticleSelectProps<TItem extends string | number> extends ClassProps {
    label: string;
    value: TItem;
    setValue: (value: TItem) => void;
    inputName: string;
    inputID: string;
    variant: "outlined" | "filled";
}

export function VaticleSelect<TItem extends string | number>({children, className, label, value, setValue, inputName, inputID, variant}: React.PropsWithChildren<VaticleSelectProps<TItem>>): JSX.Element {
    const classes = selectStyles();

    const inputElement = React.createElement(vaticleSelectInput(variant));

    // TODO: Clicks seem buggy on desktop - maybe this would work better with 'native' only set on mobile?
    return (
        <FormControl variant="outlined" className={className}>
            <Select native label={label} value={value} onChange={(e) => setValue(e.target.value as TItem)}
                    className={classes.select} input={inputElement} inputProps={{ name: inputName, id: inputID }}
                    IconComponent={() => <ExpandMoreIcon style={{fontSize: 16, fill: "#FFF", position: "absolute", right: 10, pointerEvents: "none"}}/>}>
                {children}
            </Select>
        </FormControl>
    );
}

const vaticleSelectInput: (variant: "outlined" | "filled") => any = (variant) => withStyles((theme: Theme) =>
    createStyles({
        root: {
            fontFamily: "inherit",
        },

        input: {
            borderRadius: 5,
            position: 'relative',
            border: `1px solid ${variant === "outlined" ? "rgba(255,255,255,.2)" : "transparent"}`,
            backgroundColor: variant === "outlined" ? "transparent" : vaticleTheme.palette.purple["3"],
            color: "#FFF",
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),

            '&:focus': {
                borderRadius: 5,
                borderColor: vaticleTheme.palette.green["1"],
            },

            "& option": {
                backgroundColor: `${vaticleTheme.palette.purple["3"]} !important`,
                color: "#FFF",

                "&[disabled]": {
                    color: "rgba(255,255,255,.3)",
                }
            },
        },
    }),
)(InputBase);
