import {makeStyles} from "@material-ui/core/styles";
import {vaticleTheme} from "../../common/styles/theme";

const textLineHeight = 28;

export const legalPageStyles = makeStyles({
    legalSection: {
        textAlign: "start",
    },

    legalParagraph: {
        marginTop: textLineHeight,
    },

    legalList: {
        marginTop: textLineHeight,
    },
});
