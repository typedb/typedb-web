import React, {useLayoutEffect, useState} from "react";
import {tabsStyles} from "./tabs-styles";
import {VaticleLink} from "../link/link";
import clsx from "clsx";
import {vaticleStyles} from "../styles/vaticle-styles";
import {useLocation} from "react-router-dom";

export interface VaticleTabItem {
    id: string;
    name: string;
    content: React.FC;
}

export interface VaticleTabsClasses {
    root?: string;
    tabGroup?: string;
    tabItem?: string;
    first?: string;
    last?: string;
    selected?: string;
    tabContent?: string;
}

export interface VaticleTabsProps {
    classes: VaticleTabsClasses;
    items: VaticleTabItem[];
    anchor?: boolean;
}

export const VaticleTabs: React.FC<VaticleTabsProps> = ({classes, items, anchor}) => {
    const ownClasses = Object.assign({}, vaticleStyles(), tabsStyles());

    const routerLocation = useLocation();
    const [selectedItem, setSelectedItem] = useState(items.find(p => p.id === routerLocation.hash.slice(1)) || items[0]);

    useLayoutEffect(() => {
        let matchedItem = items.find(p => p.id === routerLocation.hash.slice(1));
        if (matchedItem) setSelectedItem(matchedItem);
    }, [routerLocation.hash]);

    return (
        <div className={classes.root}>
            <div className={clsx(ownClasses.tabGroup, classes.tabGroup)}>
                {items.map((item, idx) => <VaticleTab classes={classes} item={item} setSelectedItem={setSelectedItem}
                                                      selected={item.id === selectedItem.id}
                                                      anchor={anchor} first={idx === 0}
                                                      last={idx === items.length - 1}/>)}
            </div>
            {items.map((item) =>
                <div hidden={item.id !== selectedItem.id} className={classes.tabContent}>
                    <item.content/>
                </div>)}
        </div>
    );
}

interface VaticleTabProps {
    item: VaticleTabItem;
    selected: boolean;
    anchor?: boolean;
    first: boolean;
    last: boolean;
    classes: VaticleTabsClasses;
    setSelectedItem: (value: VaticleTabItem) => void;
}

const VaticleTab: React.FC<VaticleTabProps> = ({item, selected, anchor, first, last, classes, setSelectedItem}) => {
    const ownClasses = Object.assign({}, vaticleStyles(), tabsStyles());

    const selectTab = () => {
        setSelectedItem(item);
    }
    return (
        <VaticleLink className={clsx(ownClasses.tabItem, classes.tabItem, ownClasses.pageAnchor,
            first && classes.first, last && classes.last, selected && classes.selected)}
                     id={item.id} to={anchor ? `#${item.id}` : undefined} onClick={!anchor ? selectTab : undefined} scroll={false}
                     scrollPaddingTop={160}>
            {item.name}
        </VaticleLink>
    );
}
