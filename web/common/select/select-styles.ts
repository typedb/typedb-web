import { makeStyles } from "@material-ui/core";
import { vaticleTheme } from "../styles/theme";

export const selectStyles = makeStyles({
    select: {
        lineHeight: "20px", // Prevent clipping of letters such as "g"
    },
});
