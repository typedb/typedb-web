import React, { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { ClassProps } from "../../common/class-props";
import { downloadPageProductStyles } from "./download-styles";
import { TypeDBTab } from "./typedb-tab";
import { TypeDBClusterTab } from "./typedb-cluster-tab";
import { TypeDBWorkbaseTab } from "./typedb-workbase-tab";
import { VaticleLink } from "../../common/link/link";

type ProductName = "TypeDB" | "TypeDB Cluster" | "TypeDB Workbase";

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

    const routerLocation = useLocation();
    const [selectedProduct, setSelectedProduct] = useState(allProducts.find(p => p.id === routerLocation.hash.slice(1)) || allProducts[0]);

    useLayoutEffect(() => {
        let matchedProduct = allProducts.find(p => p.id === routerLocation.hash.slice(1));
        if (matchedProduct) setSelectedProduct(matchedProduct);
    }, [routerLocation.hash]);

    return (
        <section className={className}>
            <div className={classes.tabGroup}>
            {allProducts.map((product, idx) => (
                <Tab product={product} first={idx === 0} last={idx === allProducts.length - 1} selected={product.name === selectedProduct.name}/>
            ))}
            </div>
            <selectedProduct.content/>
        </section>
    );
}

// TODO: This component has a lot in common with <SectionToggle/>
interface TabProps {
    product: Product;
    first?: boolean;
    last?: boolean;
    selected: boolean;
}

const Tab: React.FC<TabProps> = ({product, first, last, selected}) => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    return (
        <VaticleLink className={clsx(classes.tabItem, classes.h5, classes.pageAnchor, first && classes.firstTabItem, last && classes.lastTabItem, selected && classes.tabItemSelected)}
           id={product.id} to={`#${product.id}`} scroll={false} scrollPaddingTop={160}>
            {product.name}
        </VaticleLink>
    );
}
