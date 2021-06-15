import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { snackbarStyles } from "./snackbar-styles";
import { vaticleStyles } from "../styles/vaticle-styles";
import clsx from "clsx";

interface VaticleSnackbarProps {
    variant: "success" | "error";
    message: string;
    // TODO: We're seeing this pattern quite a lot - maybe we should create a standard for bidirectional state binding?
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const VaticleSnackbar: React.FC<VaticleSnackbarProps> = ({variant, message, open, setOpen}) => {
    const classes = Object.assign({}, vaticleStyles(), snackbarStyles());
    const handleClose = () => setOpen(false);

    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={6000}
            onClose={handleClose} classes={{
                root: clsx(classes.root, variant === "success" && classes.success, variant === "error" && classes.error),
                anchorOriginTopRight: classes.topRight,
            }}
            action={
                <>
                    <p><span className={classes.status}>{variant === "success" ? "Success: " : "Error: "}</span>{message}</p>
                    <div className={classes.filler}/>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose} className={classes.close}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </>
            }
        />
    );
}
