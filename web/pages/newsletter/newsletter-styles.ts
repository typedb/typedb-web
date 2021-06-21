import { makeStyles } from "@material-ui/core";

export const newsletterStyles = makeStyles({
    newsletterForm: {
        "@media(max-width: 1023px)": {
            alignItems: "center",
        },
    },

    newsletterFormRow: {
        "@media(max-width: 1023px)": {
            flexDirection: "column",

            "& > *:not(:first-child)": {
                marginTop: 30,
                marginLeft: "0 !important",
            },
        },
    }
});
