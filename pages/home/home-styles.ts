import { makeStyles } from '@material-ui/core/styles';
import { vaticleTheme } from "../styles/theme";

export const homePageStyles = makeStyles({
    defaultSection: {
        maxWidth: '1160px',
        margin: '0 auto',
        marginTop: '80px',
    },

    atom: {
        marginTop: '160px',
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

    mainLinks: {
        width: '100%',
        display: 'flex',
        border: `1px solid ${vaticleTheme.palette.purple[250]}`,
        borderRadius: 11,
    },

    firstMainLink: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '160px',
    },

    // TODO: Is there a better way of mimicking the :first-child CSS selector in MaterialUI?
    mainLink: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '160px',
        borderLeft: `1px solid ${vaticleTheme.palette.purple[250]}`,
    },

    mainLinkIcon: {
        color: '#FFF !important',
        fontSize: 66,
    },

    mainLinkCaption: {
        marginTop: '8px',
        fontSize: 16,
    },

    downloadGraknButton: {
        height: '72px !important',
    },
});
