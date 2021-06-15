import React from "react";
import { ClassProps } from "../../common/class-props";
import { downloadPageProductStyles } from "./download-styles";
import { TypeDBTab } from "./typedb-tab";
import { TypeDBClusterTab } from "./typedb-cluster-tab";
import { TypeDBWorkbaseTab } from "./typedb-workbase-tab";
import { VaticleTabs } from "../../common/tabs/tabs";
import clsx from "clsx";
import { vaticleStyles } from "../../common/styles/vaticle-styles";

type ProductName = "TypeDB" | "TypeDB Cluster" | "TypeDB Workbase";

// TODO: Refactor into TabItem<ProductName>
interface Product {
    name: ProductName,
    content: React.FC<any>;
    id: string;
}

export const ProductSection: React.FC<ClassProps> = ({ className }) => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    const allProducts: Product[] = [{
        name: "TypeDB",
        content: TypeDBTab,
        id: "typedb",
    }, {
        name: "TypeDB Workbase",
        content: TypeDBWorkbaseTab,
        id: "typedb-workbase",
    }, {
        name: "TypeDB Cluster",
        content: TypeDBClusterTab,
        id: "typedb-cluster",
    }];

    return (
        <section className={className}>
            <VaticleTabs items={allProducts} classes={{tabGroup: classes.tabGroup, tabItem: clsx(classes.tabItem, classes.h5),
                selected: classes.tabItemSelected, first: classes.firstTabItem, last: classes.lastTabItem}}/>
        </section>
    );
}
