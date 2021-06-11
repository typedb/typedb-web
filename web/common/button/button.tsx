import React, { useState } from 'react';
import clsx from 'clsx';

import { useHistory } from 'react-router-dom';
import { SizeIndicator } from '../styles/theme';
import { buttonStyles, comingSoonPopupStyles } from './button-styles';
import { ClassProps } from "../class-props";
import { vaticleStyles } from "../styles/vaticle-styles";
import { headerHeight } from "../layout/layout-styles";

export interface VaticleButtonProps extends ClassProps {
    href?: string;
    to?: string;
    type?: 'primary' | 'secondary';
    size?: SizeIndicator;
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
    comingSoon?: true;
    target?: string;
    download?: string;
}

// TODO: Large chunks of this component are no longer about button appearance, but more about link behaviour.
//       Maybe we need a VaticleLink component?
export const VaticleButton: React.FC<VaticleButtonProps> = props => {
    const { children, className, href, to, size, type, onClick, target, download, disabled, comingSoon } = props;

    const classes = buttonStyles({ size, type });

    const [comingSoonPopupVisible, setComingSoonPopupVisible] = useState(false);
    const routerHistory = useHistory();

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

    const linkType = computeLinkType(props);

    const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) onClick(e);
        if (comingSoon) brieflyShowComingSoonPopup();

        switch (linkType) {
            case "route":
            case "routeHash":
                routerHistory.push(to);
                break;
            case "hash":
                const target = document.querySelector(to) as HTMLElement;
                window.scrollTo({ left: 0, top: target.offsetTop - headerHeight, behavior: "smooth" });
                break;
        }
    };

    return (
        <a href={href} target={target} download={download} className={clsx(classes.root, disabled && classes.disable, className)}
           onClick={onLinkClick} onMouseEnter={comingSoon && showComingSoonPopup} onMouseLeave={comingSoon && hideComingSoonPopup}>
            {comingSoon && <ComingSoonPopup visible={comingSoonPopupVisible}/>}
            <div className={classes.childDiv}>
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
        <>
            <div className={clsx(classes.all, classes.textBox, visible && classes.visible)}>
                Coming soon!
            </div>
            <div className={clsx(classes.all, classes.arrowhead, visible && classes.visible)}/>
        </>
    );
};

function computeLinkType(props: VaticleButtonProps) {
    if (props.href) return "href";
    if (!props.to) return "none";

    const hashIndex = props.to.indexOf("#");
    if (hashIndex === -1) return "route";
    else if (hashIndex === 0) return "hash";
    else return "routeHash";
}
