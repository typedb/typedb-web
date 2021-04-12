import { makeStyles } from '@material-ui/core/styles';
import { vaticleTheme } from "../styles/theme";

export const cloudPageStyles = makeStyles({
    layoutMain: {
        paddingTop: '4px',
    },

    defaultSection: {
        maxWidth: '1160px',
        margin: '0 auto',
        marginTop: '80px',
    },

    h1: vaticleTheme.h1,

    largeText: {
        margin: '0 auto',
        marginTop: '16px',
        fontSize: '20px',
        fontWeight: 300,
        lineHeight: '34px',
        maxWidth: '960px',
    },
});
