import React, { useLayoutEffect, useState } from "react";
import { tabsStyles } from "./tabs-styles";
import { VaticleLink } from "../link/link";
import clsx from "clsx";
import { vaticleStyles } from "../styles/vaticle-styles";
import { useLocation } from "react-router-dom";

export interface VaticleTabItem {
    id: string;
    name: string;
    content: React.FC;
}

export interface VaticleTabsClasses {
    tabGroup?: string;
    tabItem?: string;
    first?: string;
    last?: string;
    selected?: string;
}

export interface VaticleTabsProps {
    classes?: VaticleTabsClasses;
    items: VaticleTabItem[];
}

export const VaticleTabs: React.FC<VaticleTabsProps> = ({classes, items}) => {
    const ownClasses = Object.assign({}, vaticleStyles(), tabsStyles());

    const routerLocation = useLocation();
    const [selectedItem, setSelectedItem] = useState(items.find(p => p.id === routerLocation.hash.slice(1)) || items[0]);

    useLayoutEffect(() => {
        let matchedItem = items.find(p => p.id === routerLocation.hash.slice(1));
        if (matchedItem) setSelectedItem(matchedItem);
    }, [routerLocation.hash]);

    return (
        <div>
            <div className={clsx(ownClasses.tabGroup, classes.tabGroup)}>
                {items.map((item, idx) => <VaticleTab classes={classes} item={item} selected={item.id === selectedItem.id}
                                                      first={idx === 0} last={idx === items.length - 1}/>)}
            </div>
            <selectedItem.content/>
        </div>
    );
}

interface VaticleTabProps {
    item: VaticleTabItem;
    selected: boolean;
    first: boolean;
    last: boolean;
    classes?: VaticleTabsClasses;
}

export const VaticleTab: React.FC<VaticleTabProps> = ({item, selected, first, last, classes}) => {
    const ownClasses = Object.assign({}, vaticleStyles(), tabsStyles());

    return (
        <VaticleLink className={clsx(ownClasses.tabItem, classes.tabItem, ownClasses.pageAnchor,
            first && classes.first, last && classes.last, selected && classes.selected)}
                     id={item.id} to={`#${item.id}`} scroll={false} scrollPaddingTop={160}>
            {item.name}
        </VaticleLink>
    );
}
