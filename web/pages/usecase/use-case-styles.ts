import {makeStyles} from "@material-ui/core";

export const useCaseStyles = makeStyles({
    introBody: {
        maxWidth: 960
    },

    section2Image: {
        width: 760
    },

    whitePaperFormContainer: {
        maxWidth: 720,
    },

    whitePaperForm: {
        "@media(min-width: 1200px)": {
            width: 540,
        },
    }
});
