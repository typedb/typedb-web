import React, { useState } from "react";
import clsx from 'clsx';
import { SizeIndicator } from '../styles/theme';
import { buttonStyles, comingSoonPopupStyles } from "./button-styles";
import { vaticleStyles } from "../styles/vaticle-styles";
import { VaticleLink, VaticleLinkProps } from "../link/link";

export interface VaticleButtonProps extends VaticleLinkProps {
    type: 'primary' | 'secondary';
    size: SizeIndicator;
    disabled?: boolean;
    comingSoon?: boolean;
}

export const VaticleButton: React.FC<VaticleButtonProps> = props => {
    const { children, className, href, to, size, type, onClick, target, download, disabled, comingSoon } = props;

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
    };

    return (
        <VaticleLink href={href} to={to} target={target} download={download} className={clsx(classes.root, disabled && classes.disable, className)} onClick={onLinkClick}>
            {comingSoon && <ComingSoonPopup visible={comingSoonPopupVisible}/>}
            <div className={classes.content} onMouseEnter={comingSoon ? showComingSoonPopup : undefined}
                 onMouseLeave={comingSoon ? hideComingSoonPopup : undefined}>
                {children}
            </div>
        </VaticleLink>
    );
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
