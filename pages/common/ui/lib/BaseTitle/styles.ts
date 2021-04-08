import { makeStyles } from '@material-ui/core';
import { BaseTitleProps } from '.';

interface StyleProps {
    isClickable: BaseTitleProps['isClickable'];
}

export const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
    },

    text: {
        alignSelf: 'center',
        color: '#9482CF',
        '&:hover': {
            color: (props: StyleProps) =>
                props.isClickable ? '#00FF00' : '#9482CF',
        },
    },

    line: {
        marginLeft: '2px',
        border: 0,
        height: 1,
        flex: 1,
        background: '#9482CF',
        alignSelf: 'center',
        lineHeight: '4px',
    },

    h1: {
        fontSize: 24,
    },

    h2: {
        fontSize: 20,
    },

    h3: {
        fontSize: 16,
    },
});
