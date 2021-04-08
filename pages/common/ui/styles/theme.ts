import { createMuiTheme, Theme, ThemeOptions, fade } from '@material-ui/core/styles';
import { Overrides } from '@material-ui/core/styles/overrides';
import createSpacing, { Spacing } from '@material-ui/core/styles/createSpacing';

export type SizeIndicator = 'smallest' | 'smaller' | 'small' | 'large' | 'larger' | 'largest';
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
        grey: ColorCodeMap;
    };

    typography: {
        fontFamily: {
            main: string;
            fixedWidth: {
                variationA: string;
                variationB: string;
            };
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
        grabl: VaticleTheme;
    }

    interface ThemeOptions {
        grabl?: VaticleThemeOptions;
    }
}

const createVaticleTheme = (options: ThemeOptions): Theme =>
    createMuiTheme({
        spacing: 5,
        typography: {
            fontFamily: 'Titillium Web',
        },
        grabl: {
            spacing: createSpacing(5),
            palette: {
                white: {
                    200: '#F5F2FF',
                },
                purple: {
                    50: '#C799F7',
                    100: '#A391C3',
                    200: '#9482CF',
                    300: '#41325A',
                    400: '#2C2349',
                    500: '#211437',
                    600: '#180E29',
                    700: '#100718',
                },
                green: {
                    100: '#52FACE',
                    200: '#3CEDE0',
                    300: '#31969C',
                },
                red: {
                    100: '#FF7078',
                },
                blue: {
                    100: '#858DFF',
                },
                yellow: {
                    100: '#FFF17D',
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
                    fixedWidth: {
                        variationA: 'Ubuntu Mono',
                        variationB: 'OCRAStd',
                    },
                },
                htmlFontSize: 12,
                fontSize: {
                    smallest: 12,
                    smaller: 14,
                    small: 16,
                    large: 20,
                    larger: 24,
                    largest: 32,
                },
            },
        },
        props: {
            MuiButtonBase: {
                // No more ripple, on the whole application
                disableRipple: true,
            },
        },
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
        ...options,
    });

export default createVaticleTheme;
