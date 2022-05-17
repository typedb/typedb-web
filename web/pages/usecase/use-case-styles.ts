import {makeStyles} from "@material-ui/core";

const textContentMaxWidth = 960;

export const useCaseStyles = makeStyles({
    introBody: {
        maxWidth: textContentMaxWidth,
        marginLeft: "auto",
        marginRight: "auto",
    },

    section2Image: {
        width: 760
    },

    section4KeyPoints: {
        maxWidth: textContentMaxWidth,
        marginLeft: "auto",
        marginRight: "auto",
    },

    section4UserLogo: {
        maxWidth: 185,
        maxHeight: 70,
        margin: "auto",
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
