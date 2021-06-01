import React, { useState } from "react";
import clsx from "clsx";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { ClassProps } from "../../common/class-props";
import { downloadPageProductStyles } from "./download-styles";
import { TypeDBTab } from "./typedb-tab";
import { TypeDBClusterTab } from "./typedb-cluster-tab";
import { TypeDBWorkbaseTab } from "./typedb-workbase-tab";

type ProductName = "TypeDB" | "TypeDB Cluster" | "TypeDB Workbase";

interface Product {
    name: ProductName,
    content: React.FC<any>;
}

interface ProductSectionProps extends ClassProps {
    latestTypeDBVersion: string;
}

export const ProductSection: React.FC<ProductSectionProps> = ({className, latestTypeDBVersion}) => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    const allProducts: Product[] = [{
        name: "TypeDB",
        content: TypeDBTab,
    }, {
        name: "TypeDB Cluster",
        content: TypeDBClusterTab,
    }, {
        name: "TypeDB Workbase",
        content: TypeDBWorkbaseTab,
    }];

    const [selectedProduct, setSelectedProduct] = useState<Product>(allProducts[0]);

    return (
        <section className={className}>
            <div className={classes.tabGroup}>
            {allProducts.map((product, idx) => (
                <Tab product={product} binding={setSelectedProduct} first={idx === 0} last={idx === allProducts.length - 1}
                     selected={product.name === selectedProduct.name}/>
            ))}
            </div>
            <selectedProduct.content/>
        </section>
    );
}

// TODO: This component has a lot in common with <SectionToggle/>
interface TabProps {
    product: Product;
    binding: (product: Product) => void;
    first?: boolean;
    last?: boolean;
    selected: boolean;
}

const Tab: React.FC<TabProps> = ({product, binding, first, last, selected}) => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    return (
        <a className={clsx(classes.tabItem, classes.h5, first && classes.firstTabItem, last && classes.lastTabItem, selected && classes.tabItemSelected)} onClick={() => binding(product)}>
            {product.name}
        </a>
    );
}
