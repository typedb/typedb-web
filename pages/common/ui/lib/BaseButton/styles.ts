import { makeStyles } from '@material-ui/core/styles';
import { BaseButtonFinalProps } from '.';

type StyleProps = Pick<BaseButtonFinalProps, 'size' | 'type'>;

export const useStyles = makeStyles({
    root: {
        height: (props: StyleProps) => (props.size === 'large' ? 'auto' : 24),
        border: '1px solid transparent',
        padding: '0 2px',
        borderRadius: 3,
    },
    label: {
        color: '#00FF00',
        fontSize: 14,
        fontWeight: 600,
        lineHeight: '14px',

        '& p, & svg': {
            lineHeight: '14px',
        },
    },
});
