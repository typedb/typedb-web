import { createStyles, FormControl, InputBase, Select, Theme, withStyles } from "@material-ui/core";
import { vaticleTheme } from "../styles/theme";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";

interface VaticleSelectProps {
    label: string;
    value: any;
    setValue: (value: any) => void;
    inputName: string;
    inputID: string;
}

export const VaticleSelect: React.FC<VaticleSelectProps> = ({children, label, value, setValue, inputName, inputID}) => {
    return (
        <FormControl variant="outlined">
            <Select native label={label} value={value} onChange={(e) => setValue(e.target.value)}
                    input={<VaticleSelectInput/>} inputProps={{ name: inputName, id: inputID }}
                    IconComponent={() => <ExpandMoreIcon style={{fontSize: 16, fill: "#FFF", position: "absolute", right: 10, pointerEvents: "none"}}/>}>
                {children}
            </Select>
        </FormControl>
    );
}

const VaticleSelectInput = withStyles((theme: Theme) =>
    createStyles({
        root: {
            fontFamily: "inherit",
        },

        input: {
            borderRadius: 5,
            position: 'relative',
            border: "1px solid rgba(255,255,255,.2)",
            color: "#FFF",
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),

            '&:focus': {
                borderRadius: 5,
                borderColor: vaticleTheme.palette.green["300"],
            },

            "& option": {
                backgroundColor: `${vaticleTheme.palette.purple["700"]} !important`,
            },
        },
    }),
)(InputBase);
