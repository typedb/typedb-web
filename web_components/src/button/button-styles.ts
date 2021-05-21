import { makeStyles } from '@material-ui/core/styles';
import { BaseButtonFinalProps } from './button';
import { vaticleTheme } from "../styles/theme";
import Color from "color";

type StyleProps = Pick<BaseButtonFinalProps, 'size' | 'type'>;

export const buttonPalette = {
    primary: {
        background: vaticleTheme.palette.green[300],
        border: 'transparent',
        label: vaticleTheme.palette.purple[700],
        hoverBackground: vaticleTheme.palette.green[500],
        hoverBorder: 'transparent',
        hoverLabel: vaticleTheme.palette.purple[700],
        disabledBackground: Color(vaticleTheme.palette.green[300]).alpha(0.2).string(),
        disabledLabel: vaticleTheme.palette.purple[700],
    },
    secondary: {
        background: "transparent",
        border: vaticleTheme.palette.green[300],
        label: vaticleTheme.palette.green[300],
        hoverBackground: vaticleTheme.palette.green[300],
        hoverBorder: vaticleTheme.palette.green[300],
        hoverLabel: vaticleTheme.palette.purple[700],
        disabledBackground: Color(vaticleTheme.palette.purple[700]).alpha(0.6).string(),
        disabledLabel: Color(vaticleTheme.palette.green[300]).alpha(0.6).string(),
    },
};

export const buttonStyles = makeStyles({
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

        '& p, & svg': {
            lineHeight: '14px',
        },

        '&:hover': {
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
makeStyles({
    root: {
        width: 45,
        height: 45,
        borderRadius: "50%",
        border: "1px solid transparent",
        transition: "border-color 100ms ease",
        backgroundColor: vaticleTheme.palette.purple["600"],
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",

        "&:hover": {
            borderColor: vaticleTheme.palette.green["300"],
        },
    },

    disabled: {
        pointerEvents: "none",
    },
});
