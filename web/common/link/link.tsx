import React from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { ClassProps } from "../class-props";
import { SearchParam, setSearchParam } from "../util/search-params";

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

export type LinkType = "href" | "none" | "route" | "hash" | "routeHash" | "search" | "routeSearch";

export const VaticleLink: React.FC<VaticleLinkProps> = ({ children, href, to, onClick, target, download, id, scroll, scrollPaddingTop, className }) => {
    const routerHistory = useHistory();
    const routerLocation = useLocation();

    const linkType = computeLinkType(href, to);
    const computedHref = href || to;

    const onLinkClick = (e: React.MouseEvent<HTMLElement>) => {
        if (onClick) onClick(e);
        const newTabRequested = e.metaKey || e.ctrlKey;

        switch (linkType) {
            case "route":
            case "routeHash":
            case "routeSearch":
                e.preventDefault();
                if (newTabRequested) window.open(to!, "_blank");
                else routerHistory.push(to!);
                break;
            case "hash":
                e.preventDefault();
                const path = `${routerLocation.pathname}${to}`;
                if (newTabRequested) window.open(path, "_blank");
                else routerHistory.push(path, { samePageNavigation: true, scroll: scroll !== false });
                break;
            case "search":
                e.preventDefault();
                const newParams = new URLSearchParams(to);
                if (newTabRequested) {
                    const params = new URLSearchParams(window.location.search);
                    for (const [key, value] of newParams.entries()) params.set(key, value);
                    const path = `${routerLocation.pathname}?${params.toString()}`;
                    window.open(path, "_blank");
                } else {
                    for (const [key, value] of newParams.entries()) setSearchParam(routerHistory, routerLocation, key as SearchParam, value);
                }
                break;
        }
    };

    return <a id={id} href={computedHref} target={target} tabIndex={href ? undefined : 0} download={download} className={className} onClick={onLinkClick} scroll-padding-top={scrollPaddingTop}>{children}</a>;
};

function computeLinkType(href?: string, to?: string): LinkType {
    if (href) return "href";
    if (!to) return "none";

    const hashIndex = to.indexOf("#");
    const searchIndex = to.indexOf("?");
    if (hashIndex === -1 && searchIndex === -1) return "route";
    else if (hashIndex === 0) return "hash";
    else if (hashIndex > 0) return "routeHash";
    else if (searchIndex === 0) return "search";
    else return "routeSearch";
}
