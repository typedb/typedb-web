import React from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { ClassProps } from "../class-props";

export interface VaticleLinkProps extends ClassProps {
    href?: string;
    to?: string;
    onClick?: React.MouseEventHandler;
    target?: string;
    download?: string;
    id?: string;
    scroll?: boolean;
    scrollPaddingTop?: number;
}

export const VaticleLink: React.FC<VaticleLinkProps> = ({ children, href, to, onClick, target, download, id, scroll, scrollPaddingTop, className }) => {
    const routerHistory = useHistory();
    const routerLocation = useLocation();

    const linkType = computeLinkType(href, to);

    const onLinkClick = (e: React.MouseEvent<HTMLElement>) => {
        if (onClick) onClick(e);

        switch (linkType) {
            case "route":
            case "routeHash":
                routerHistory.push(to);
                break;
            case "hash":
                routerHistory.push(`${routerLocation.pathname}${to}`, { samePageNavigation: true, scroll: scroll !== false });
                break;
        }
    };

    return <a id={id} href={href} target={target} download={download} className={className} onClick={onLinkClick} scroll-padding-top={scrollPaddingTop}>{children}</a>;
};

function computeLinkType(href?: string, to?: string) {
    if (href) return "href";
    if (!to) return "none";

    const hashIndex = to.indexOf("#");
    if (hashIndex === -1) return "route";
    else if (hashIndex === 0) return "hash";
    else return "routeHash";
}
