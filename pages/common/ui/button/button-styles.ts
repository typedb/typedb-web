import { makeStyles } from '@material-ui/core/styles';
import { BaseButtonFinalProps } from './button';
import { vaticleTheme } from "../../../styles/theme";
import Color from "color";

type StyleProps = Pick<BaseButtonFinalProps, 'size' | 'type'>;

const typeColorMap = {
    primary: {
        background: vaticleTheme.palette.green[200],
        border: 'transparent',
        label: vaticleTheme.palette.purple[500],
        hoverBackground: vaticleTheme.palette.green[500],
        hoverBorder: 'transparent',
        hoverLabel: vaticleTheme.palette.purple[600],
        disabledBackground: Color(vaticleTheme.palette.green[200]).alpha(0.2).string(),
        disabledLabel: vaticleTheme.palette.purple[500],
    },
    secondary: {
        background: vaticleTheme.palette.purple[500],
        border: vaticleTheme.palette.green[300],
        label: vaticleTheme.palette.green[200],
        hoverBackground: vaticleTheme.palette.green[300],
        hoverBorder: vaticleTheme.palette.green[200],
        hoverLabel: vaticleTheme.palette.purple[600],
        disabledBackground: Color(vaticleTheme.palette.purple[400]).alpha(0.6).string(),
        disabledLabel: Color(vaticleTheme.palette.green[200]).alpha(0.6).string(),
    },
};

export const buttonStyles = makeStyles({
    root: {
        height: 40,
        border: (props: StyleProps) => `1px solid ${typeColorMap[props.type].border}`,
        padding: '0 21px',
        borderRadius: 5,
        color: (props: StyleProps) => typeColorMap[props.type].label,
        backgroundColor: (props: StyleProps) => typeColorMap[props.type].background,

        '&:hover': {
            backgroundColor: (props: StyleProps) => typeColorMap[props.type].hoverBackground,
            color: (props: StyleProps) => typeColorMap[props.type].hoverLabel,
            borderColor: (props: StyleProps) => typeColorMap[props.type].hoverBorder,
        }
    },

    label: {
        fontSize: (props: StyleProps) => vaticleTheme.typography.fontSize[props.size],
        fontWeight: 600,
        textTransform: "none",
        lineHeight: '24px',

        '& p, & svg': {
            lineHeight: '14px',
        },
    },
});

export const githubButtonStyles = makeStyles({
    root: {
        color: '#FFF !important',
        fontSize: 36,
    },
});
