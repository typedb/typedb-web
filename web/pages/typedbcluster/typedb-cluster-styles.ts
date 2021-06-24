import { makeStyles } from "@material-ui/core";

export const typeDBClusterStyles = makeStyles({
    intro: {
        "@media(max-width: 479px)": {
            display: "none",
        },
    },

    introMobile: {
        "@media(min-width: 480px)": {
            display: "none",
        },
    },
});
