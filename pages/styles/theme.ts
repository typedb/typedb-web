import { createMuiTheme, fade } from '@material-ui/core/styles';
import { Overrides } from '@material-ui/core/styles/overrides';
import createSpacing, { Spacing } from '@material-ui/core/styles/createSpacing';

export type SizeIndicator = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';
type SizeIndicatorMap = Record<SizeIndicator, number>;

export type ColorCodeMap = Record<number, string>;

export interface VaticleTheme {
    spacing: Spacing;

    palette: {
        purple: ColorCodeMap;
        green: ColorCodeMap;
        white: ColorCodeMap;
        red: ColorCodeMap;
        blue: ColorCodeMap;
        yellow: ColorCodeMap;
        pink: ColorCodeMap;
        grey: ColorCodeMap;
    };

    typography: {
        fontFamily: {
            main: string;
            fixedWidth: string;
        };
        htmlFontSize: number;
        fontSize: Partial<SizeIndicatorMap>;
    };

    shape: {
        borderRadius: Partial<SizeIndicatorMap>;
    };

    overrides: Overrides;
}

type VaticleThemeOptions = Partial<VaticleTheme>;

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        vaticle: VaticleTheme;
    }

    interface ThemeOptions {
        vaticle?: VaticleThemeOptions;
    }
}

export const vaticleTheme = {
    spacing: createSpacing(5),
    palette: {
        white: {
            200: '#F5F2FF',
        },
        purple: {
            50: '#E9DBFF',
            100: '#A391C3',
            200: '#9482CF',
            300: '#544899',
            350: '#484B72',
            400: '#392D7F',
            450: '#372E6A',
            500: '#2C2349',
            600: '#261C5E',
            700: '#1D1354',
            800: '#180F49',
            850: '#140B44',
            900: '#0E053F',
            1000: '#07053A',
        },
        green: {
            100: '#52FACE',
            300: '#02DAC9',
            500: '#0B939F',
        },
        red: {
            100: '#FF8888',
        },
        blue: {
            100: '#86AAFF',
            200: '#888DCA',
        },
        yellow: {
            300: '#F6C94C',
        },
        pink: {
            200: '#F28DD7',
        },
        grey: {
            100: fade('#A391C3', 0.17),
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
    },
    p: {
        large: {
            color: '#FFF',
            fontSize: 20,
        }
    }
};

export const vaticleMuiTheme = createMuiTheme({
    spacing: 5,
    typography: {
        fontFamily: 'Titillium Web',
    },
    vaticle: vaticleTheme,
    overrides: {
        MuiSelect: {
            select: {
                '&:focus': {
                    backgroundColor: 'overriden',
                    borderRadius: 'overriden',
                },
            },
        },
        MuiButton: {
            root: {
                '&:hover': {
                    backgroundColor: 'overriden',
                },
            },
            contained: {
                '&:hover': {
                    backgroundColor: 'overriden',
                },
                '& > $disabled': {
                    backgroundColor: 'overriden',
                },
            },
        },
    },
});
