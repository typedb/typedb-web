import React from "react";
import { Dialog, DialogTitle, DialogTitleProps, IconButton, useMediaQuery } from "@material-ui/core";
import { dialogStyles } from "./dialog-styles";
import { vaticleStyles } from "../styles/vaticle-styles";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory, useLocation } from "react-router-dom";
import { deleteSearchParam } from "../util/search-params";

interface VaticleDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const VaticleDialog: React.FC<VaticleDialogProps> = ({children, open, setOpen}) => {
    const classes = dialogStyles();

    const routerHistory = useHistory();
    const routerLocation = useLocation();
    const fullScreen = useMediaQuery("(max-width: 767px)");
    const handleClose = () => {
        setOpen(false);
        deleteSearchParam(routerHistory, routerLocation, "dialog");
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullScreen={fullScreen} classes={{paper: classes.paper}}>
            <VaticleDialogTitle onClose={handleClose}/>
            {children}
        </Dialog>
    );
}

interface VaticleDialogTitleProps extends DialogTitleProps {
    onClose: () => void;
}

const VaticleDialogTitle = ((props: VaticleDialogTitleProps) => {
    const classes = Object.assign({}, vaticleStyles(), dialogStyles());
    const { onClose, ...other } = props;
    return (
        <DialogTitle disableTypography {...other} classes={{root: classes.dialogTitle}}>
        {onClose && (
            <IconButton aria-label="close" onClick={onClose}>
                <CloseIcon classes={{root: classes.closeIcon}}/>
            </IconButton>
        )}
        </DialogTitle>
    );
});
