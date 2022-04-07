import React from "react";
import {ClassProps} from "../../common/class-props";
import {downloadPageProductStyles} from "./download-styles";
import {TypeDBTab} from "./typedb-tab";
import {TypeDBClusterTab} from "./typedb-cluster-tab";
import {TypeDBStudioTab} from "./typedb-studio-tab";
import {VaticleTabs} from "../../common/tabs/tabs";
import clsx from "clsx";
import {vaticleStyles} from "../../common/styles/vaticle-styles";

type ProductName = "TypeDB" | "TypeDB Cluster" | "TypeDB Studio";

interface Product {
    name: ProductName,
    content: React.FC<any>;
    id: string;
}

const products: Product[] = [{
    name: "TypeDB",
    content: TypeDBTab,
    id: "typedb",
}, {
    name: "TypeDB Studio",
    content: TypeDBStudioTab,
    id: "typedb-studio",
}, {
    name: "TypeDB Cluster",
    content: TypeDBClusterTab,
    id: "typedb-cluster",
}];

export const ProductSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    return (
        <section className={className}>
            <VaticleTabs items={products} anchor classes={{
                tabGroup: classes.tabGroup, tabItem: clsx(classes.tabItem, classes.h5),
                selected: classes.tabItemSelected, first: classes.firstTabItem, last: classes.lastTabItem
            }}/>
        </section>
    );
}
