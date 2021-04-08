import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    layoutMain: {
        paddingTop: '4px',
    },

    box: {
        marginBottom: '6px',
    },

    error: {
        color: '#FF7078',
        marginTop: '2px',

        '&:empty': {
            display: 'none',
        },
    },

    tokenInput: {
        flexGrow: 1,
        marginRight: '3px',
    },

    helloWorldBtn: {
        marginTop: '2px',
    },
});
