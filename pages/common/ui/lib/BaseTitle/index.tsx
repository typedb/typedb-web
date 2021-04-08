import React from 'react';
import clsx from 'clsx';
import { useStyles } from './styles';

export interface BaseTitleProps {
    classes?: Partial<Record<'root' | 'text', string>>;
    children: React.ReactNode;
    type: 'h1' | 'h2' | 'h3';
    hasLine?: boolean;
    isClickable?: boolean;
}

const BaseTitle: React.FC<BaseTitleProps> = ({ type, hasLine, isClickable, classes, children }) => {
    const ownClasses = useStyles({ isClickable });

    return (
        <div className={clsx(ownClasses.root, classes?.root)}>
            <p className={clsx(ownClasses.text, ownClasses[type], classes?.text)}>{children}</p>
            {hasLine && <hr className={ownClasses.line} />}
        </div>
    );
};

export default BaseTitle;
