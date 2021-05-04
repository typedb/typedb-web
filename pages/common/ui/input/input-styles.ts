import { makeStyles } from '@material-ui/core/styles';
import { vaticleTheme } from "../../../styles/theme";
import { buttonPalette } from "../button/button-styles";

export const textFieldStyles = makeStyles({
    root: {
        // height: 40,
        // border: `1px solid ${buttonPalette.secondary.border}`,
        // borderRadius: 5,
        borderColor: buttonPalette.secondary.border,
        backgroundColor: buttonPalette.secondary.background,
        // color: (props: StyleProps) => typeColorMap[props.type].label,
        fontSize: vaticleTheme.typography.fontSize.small,
        fontWeight: 300,
        // lineHeight: '24px',
    },
});
