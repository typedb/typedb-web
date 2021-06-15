import { createMuiTheme } from '@material-ui/core/styles';
import createSpacing from '@material-ui/core/styles/createSpacing';

export type SizeIndicator = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        vaticle: any;
    }

    interface ThemeOptions {
        vaticle?: any;
    }
}

// TODO: Colours used solely in illustrations should not be listed here
// TODO: We really need to break down this structure - our colours have proper names, we shouldn't conform to MaterialUI
export const vaticleTheme = {
    spacing: createSpacing(5),
    palette: {
        purple: {
            200: '#A488CA', // Purple 7
            300: '#544899', // Purple 6
            400: '#392D7F', // Purple 5
            450: '#372E6A', // Purple 4
            600: '#261C5E', // Purple 3
            700: '#1D1354', // Purple 2
            800: '#180F49', // Purple 1
        },
        green: {
            300: '#02DAC9', // Green
        },
        red: {
            100: '#F66B65', // Red
        },
        yellow: {
            300: '#F6C94C', // Yellow
        },
        pink: {
            200: '#F28DD7', // Pink
        },
    },
    shape: {
        borderRadius: {
            smallest: 1,
            smaller: 2,
            small: 3,
            large: 6,
            larger: 8,
            largest: 10,
        },
    },
    typography: {
        fontFamily: {
            main: 'Titillium Web',
            fixedWidth: 'Ubuntu Mono',
        },
        htmlFontSize: 12,
        fontSize: {
            smallest: 12,
            smaller: 14,
            small: 16,
            medium: 18,
            large: 24,
            larger: 28,
            largest: 32,
        },
    },
    h1: {
        fontSize: 32,
        lineHeight: "56px",
        color: '#02DAC9',
        fontWeight: 400,

        "@media(max-width: 767px)": {
            fontSize: 24,
            lineHeight: "36px",
        },
    },
    h2: {
        fontSize: 32,
        lineHeight: "56px",
        color: '#FFF',
        fontWeight: 400,

        "@media(max-width: 767px)": {
            fontSize: 24,
            lineHeight: "36px",
        },
    },
    h3: {
        fontSize: 28,
        lineHeight: "43px",
        color: "#FFF",
        fontWeight: 400,
    },
    h4: {
        fontSize: 24,
        lineHeight: "36px",
        color: "#FFF",
        fontWeight: 400,

        "@media(max-width: 767px)": {
            fontSize: 20,
            lineHeight: "34px",
        },
    },
    h5: {
        fontSize: 20,
        lineHeight: "34px",
        fontWeight: 600,
    },
    h6: {
        fontSize: 16,
        lineHeight: "24px",
        fontWeight: 600,
    },
    p: {
        large: {
            color: '#FFF',
            fontSize: 20,
        }
    }
};

export const vaticleMuiTheme = createMuiTheme({
    vaticle: vaticleTheme,
    typography: {
        fontFamily: "'Titillium Web', Geneva, Tahoma, sans-serif",
        fontSize: 16,
        body1: {
            fontSize: 16,
        },
    },
});
