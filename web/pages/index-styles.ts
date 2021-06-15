import {makeStyles} from '@material-ui/core';
import Color from 'color';

export const indexStyles = makeStyles({
    root: {
        height: '100%',

        '& a, & a:hover': {
            cursor: "pointer",
            textDecoration: 'none',
        },

        '& *::-webkit-scrollbar': {
            width: 5,
            height: 3,
            position: 'absolute',
        },

        '& *:hover::-webkit-scrollbar-thumb': {
            background: Color('#00FF00').alpha(0.5).string(),
        },

        '& *::-webkit-scrollbar-thumb:window-inactive': {
            background: Color('#00FF00').alpha(0.5).string(),
        },

        '& *::-webkit-scrollbar-track': {
            background: 'transparent',
        },

        '& *::-webkit-scrollbar-thumb': {
            background: Color('#00FF00').alpha(0.5).string(),
        },
    },
});
