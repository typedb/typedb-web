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

const TypeDBTab: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    const items: [ComparisonBlockItem, ComparisonBlockItem] = [{
        title: "Open Source",
        content: () => <p>AGPL v3.0 License</p>,
    }, {
        title: "Commercial",
        content: () => <p>Commercial License</p>,
    }];

    return (
        <>
            <p className={classes.largeText}>
                Grakn is a knowledge graph to organise complex networks of data and make it queryable. Graql is Grakn’s
                reasoning (through OLTP) and analytics (through OLAP) declarative query language. <a>Learn more</a>
            </p>
            <ComparisonBlock items={items} className={classes.sectionMarginSmall}/>
        </>
    );
}

const TypeDBOpenSource: React.FC = () => {
    const classes = downloadPageProductStyles();

    return (
        <p>AGPL v3.0 License</p>
    );
}

const TypeDBClusterTab: React.FC = () => {
    return <p>TypeDB Cluster</p>;
}

const TypeDBWorkbaseTab: React.FC = () => {
    return <p>TypeDB Workbase</p>;
}

interface ComparisonBlockItem {
    title: string;
    content: React.FC<any>;
}

interface ComparisonBlockProps {
    items: [ComparisonBlockItem, ComparisonBlockItem]
}

const ComparisonBlock: React.FC<ComparisonBlockProps & ClassProps> = ({items: [item1, item2], className}) => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    return (
        <div className={clsx(classes.comparisonBlock, className)}>
            <div className={classes.comparisonBlockItem}>
                <div className={clsx(classes.comparisonBlockItemTitle, classes.comparisonBlockItem1Title)}>
                    <h6 className={classes.h6}>{item1.title}</h6>
                </div>
                <div className={clsx(classes.comparisonBlockItemBody)}>
                    <item1.content/>
                </div>
            </div>
            <div className={classes.comparisonBlockItem}>
                <div className={clsx(classes.comparisonBlockItemTitle, classes.comparisonBlockItem2Title)}>
                    <h6 className={classes.h6}>{item2.title}</h6>
                </div>
                <div className={clsx(classes.comparisonBlockItemBody)}>
                    <item2.content/>
                </div>
            </div>
        </div>
    );
}
