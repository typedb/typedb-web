import React, { useState } from 'react';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { SizeIndicator } from '../styles/theme';
import { buttonStyles, comingSoonPopupStyles } from './button-styles';
import { ClassProps } from "../class-props";
import { vaticleStyles } from "../styles/vaticle-styles";
import { headerHeight } from "../layout/layout-styles";

export interface BaseButtonProps extends ClassProps {
    href?: string;
    to?: string;
    hashLink?: string;
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
    const { children, className, href, to, hashLink, size, type, onClick, htmlAttrs, target, download, disabled, comingSoon } = props as BaseButtonFinalProps;

    const classes = buttonStyles({ size, type });

    const [comingSoonPopupVisible, setComingSoonPopupVisible] = useState(false);

    const brieflyShowComingSoonPopup = () => {
        setComingSoonPopupVisible(true);
        setTimeout(() => {
            setComingSoonPopupVisible(false);
        }, 2000);
    };

    const showComingSoonPopup = () => {
        setComingSoonPopupVisible(true);
    };

    const hideComingSoonPopup = () => {
        setComingSoonPopupVisible(false);
    };

    const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) onClick(e);
        if (comingSoon) brieflyShowComingSoonPopup();
        if (hashLink) {
            const target = document.querySelector(hashLink) as HTMLElement;
            window.scrollTo({ left: 0, top: target.offsetTop - headerHeight, behavior: "smooth" });
        }
    };

    const commonProps = {
        to, href, target, download,
        className: clsx(classes.root, disabled && classes.disable, className),
        onClick: onLinkClick,
        onMouseEnter: comingSoon && showComingSoonPopup,
        onMouseLeave: comingSoon && hideComingSoonPopup,
    };

    const childContent = (
        <>
            {comingSoon && <ComingSoonPopup visible={comingSoonPopupVisible}/>}
            <div className={classes.childDiv}>
                {children}
            </div>
        </>
    );

    if (to) {
        return <Link {...commonProps}>{childContent}</Link>;
    }

    return <a {...commonProps}>{childContent}</a>;
};

interface ComingSoonPopupProps {
    visible: boolean;
}

const ComingSoonPopup: React.FC<ComingSoonPopupProps> = ({visible}) => {
    const classes = Object.assign({}, vaticleStyles(), comingSoonPopupStyles());

    return (
        <>
            <div className={clsx(classes.all, classes.textBox, visible && classes.visible)}>
                Coming soon!
            </div>
            <div className={clsx(classes.all, classes.arrowhead, visible && classes.visible)}/>
        </>
    );
};
