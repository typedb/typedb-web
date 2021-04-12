import merge from 'deepmerge';
import { StyleRules } from '@material-ui/styles/withStyles';

export const createVaticleStyles = <ClassKey extends string, Props extends Record<string, unknown>>(
    styles: StyleRules<Props, ClassKey>,
    overrides: Partial<StyleRules<Props, ClassKey>> = {}
): any => {
    return merge(styles, overrides);
};
