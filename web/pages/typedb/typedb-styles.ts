import {makeStyles} from "@material-ui/core";
import {vaticleTheme} from "../../common/styles/theme";

export const typeDBStyles = makeStyles({
    shortDivider: {
        width: 80,
        height: 0,
        border: 0,
        borderTop: `1px solid ${vaticleTheme.palette.purple["7"]}`,
    },
});