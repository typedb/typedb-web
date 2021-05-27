import React, { useState } from "react";
import clsx from "clsx";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { ClassProps } from "../../common/class-props";
import { downloadPageProductStyles } from "./download-styles";

type ProductName = "TypeDB" | "TypeDB Cluster" | "TypeDB Workbase";

interface Product {
    name: ProductName,
    content: React.FC<any>;
}

export const ProductSection: React.FC<ClassProps> = ({className}) => {
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
            {allProducts.map(product => (
                <Tab product={product} binding={setSelectedProduct} selected={product === selectedProduct}/>
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
    selected: boolean;
}

export const Tab: React.FC<TabProps> = ({product, binding, selected}) => {
    const classes = downloadPageProductStyles();

    return <a className={clsx(classes.tabItem, selected && classes.tabItemSelected)} onClick={() => binding(product)}>{product.name}</a>;
}

export const TypeDBTab: React.FC = () => {
    return <p>TypeDB Core</p>;
}

export const TypeDBClusterTab: React.FC = () => {
    return <p>TypeDB Cluster</p>;
}

export const TypeDBWorkbaseTab: React.FC = () => {
    return <p>TypeDB Workbase</p>;
}
