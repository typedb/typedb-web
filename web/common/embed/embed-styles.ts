import {makeStyles} from "@material-ui/core";

export const embedStyles = makeStyles({
    embedContainerMobile: {
        maxWidth: 760,
        height: 0,
        overflow: "hidden",
        position: "relative",
        paddingBottom: "56.25%",
    },

    embedMobile: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    }
});
