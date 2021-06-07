import { makeStyles } from '@material-ui/core/styles';
import { BaseButtonFinalProps } from './button';
import { vaticleTheme } from "../styles/theme";

type StyleProps = Pick<BaseButtonFinalProps, 'size' | 'type'>;

export const buttonPalette = {
    primary: {
        background: vaticleTheme.palette.green[300],
        border: 'transparent',
        label: vaticleTheme.palette.purple[700],
        hoverBackground: "#0B939F",
        hoverBorder: 'transparent',
        hoverLabel: vaticleTheme.palette.purple[700],
        disabledBackground: vaticleTheme.palette.purple[300],
        disabledLabel: vaticleTheme.palette.purple[700],
    },
    secondary: {
        background: "transparent",
        border: vaticleTheme.palette.green[300],
        label: vaticleTheme.palette.green[300],
        hoverBackground: vaticleTheme.palette.green[300],
        hoverBorder: vaticleTheme.palette.green[300],
        hoverLabel: vaticleTheme.palette.purple[700],
        disabledBackground: "transparent",
        disabledLabel: vaticleTheme.palette.purple[300],
    },
};

export const buttonStyles = makeStyles({
    disable: {
        color: (props: StyleProps) => `${buttonPalette[props.type].disabledLabel} !important`,
        borderColor: () => `${vaticleTheme.palette.purple[300]} !important`,
        backgroundColor: (props: StyleProps) => `${buttonPalette[props.type].disabledBackground} !important`,
    },

    root: {
        height: 40,
        border: (props: StyleProps) => `1px solid ${buttonPalette[props.type].border}`,
        borderRadius: 5,
        backgroundColor: (props: StyleProps) => buttonPalette[props.type].background,
        transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: (props: StyleProps) => buttonPalette[props.type].label,
        fontSize: (props: StyleProps) => vaticleTheme.typography.fontSize[props.size],
        fontWeight: 600,
        lineHeight: '24px',
        position: "relative",

        '& p, & svg': {
            lineHeight: '14px',
        },

        '&:hover:not($disable)': {
            backgroundColor: (props: StyleProps) => buttonPalette[props.type].hoverBackground,
            color: (props: StyleProps) => buttonPalette[props.type].hoverLabel,
            borderColor: (props: StyleProps) => buttonPalette[props.type].hoverBorder,
        },

        '& a': {
            color: (props: StyleProps) => buttonPalette[props.type].label,
        }
    },

    childDiv: {
        margin: '6px 16px',
    },
});

export const githubButtonStyles = makeStyles({
    root: {
        color: '#FFF !important',
        fontSize: 36,
    },
});

export const comingSoonPopupStyles = makeStyles({
    all: {
        position: "absolute",
        opacity: 0,
        pointerEvents: "none",
        left: 0,
        right: 0,
        margin: "0 auto",
        backgroundColor: vaticleTheme.palette.green["300"],
        transition: "opacity 100ms ease",
    },

    textBox: {
        top: -31,
        zIndex: 50,
        borderRadius: 5,
        width: 120,
        height: 22,
        lineHeight: "22px",
        textAlign: "center",
        fontSize: 14,
        color: vaticleTheme.palette.purple["700"],
    },

    arrowhead: {
        top: -12,
        width: 6,
        height: 6,
        zIndex: 25,
        transform: "rotate(45deg)",
    },

    visible: {
        opacity: "1 !important",
    },
});
