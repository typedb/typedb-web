import React, { useState } from 'react';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { SizeIndicator } from '../styles/theme';
import { buttonStyles, comingSoonPopupStyles } from './button-styles';
import { ClassProps } from "../class-props";
import { vaticleStyles } from "../styles/vaticle-styles";

export interface BaseButtonProps extends ClassProps {
    href?: string;
    to?: string;
    type?: 'primary' | 'secondary';
    size?: SizeIndicator;
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
    comingSoon?: true;
    target?: string;
    download?: string;
    htmlAttrs?: {
        type?: 'submit' | 'button';
        download?: string;
    };
}

const defaultProps: Required<Pick<BaseButtonProps, 'size' | 'type' | 'htmlAttrs'>> = {
    size: 'smaller',
    type: 'secondary',
    htmlAttrs: { type: 'button' },
};

// TODO: This type structure is not necessary and should be aligned with rest of codebase
export type BaseButtonFinalProps = React.PropsWithChildren<BaseButtonProps & typeof defaultProps>;

export const VaticleButton: React.FC<BaseButtonProps> = props => {
    const { children, className, href, to, size, type, onClick, htmlAttrs, target, download, disabled, comingSoon } = props as BaseButtonFinalProps;

    const classes = buttonStyles({ size, type });

    const [comingSoonPopupVisible, setComingSoonPopupVisible] = useState(false);

    const showComingSoonPopup = () => {
        setComingSoonPopupVisible(true);
        setTimeout(() => {
            setComingSoonPopupVisible(false);
        }, 2000);
    };

    if (to) {
        return (
            <Link to={to} className={clsx(classes.root, disabled && classes.disable, className)}>
                <ComingSoonPopup visible={comingSoonPopupVisible}/>
                <div className={classes.childDiv} onClick={comingSoon && showComingSoonPopup} onMouseOver={comingSoon && showComingSoonPopup}>
                    {children}
                </div>
            </Link>
        )
    }

    return (
        <a className={clsx(classes.root, disabled && classes.disable, className)} href={href} onClick={onClick}
           target={target} download={download} {...htmlAttrs}>
            <ComingSoonPopup visible={comingSoonPopupVisible}/>
            <div className={classes.childDiv} onClick={comingSoon && showComingSoonPopup} onMouseOver={comingSoon && showComingSoonPopup}>
                {children}
            </div>
        </a>
    );
};

interface ComingSoonPopupProps {
    visible: boolean;
}

const ComingSoonPopup: React.FC<ComingSoonPopupProps> = ({visible}) => {
    const classes = Object.assign({}, vaticleStyles(), comingSoonPopupStyles());

    return (
        <div className={clsx(classes.root, visible && classes.visible)}>
            Coming soon!
        </div>
    );
};
