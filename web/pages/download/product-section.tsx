import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { ClassProps } from "../../common/class-props";
import { downloadPageProductStyles } from "./download-styles";
import moment from "moment";
import { Context } from "../state/storage";
import { useTypeDBVersion } from "../state/typedb-version";

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

    useEffect(() => {
        allProducts[0].content = () => <TypeDBTab latestVersion={latestTypeDBVersion}/>
    }, [latestTypeDBVersion]);

    const allProducts: Product[] = [{
        name: "TypeDB",
        content: () => <TypeDBTab latestVersion={latestTypeDBVersion}/>,
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

interface TypeDBTabProps {
    latestVersion: string;
}

const TypeDBTab: React.FC<TypeDBTabProps> = ({latestVersion}) => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    useEffect(() => {
        console.log(`TypeDBTab: ` + latestVersion);
    }, [latestVersion]);

    const items: [ComparisonBlockItem, ComparisonBlockItem] = [{
        title: "Open Source",
        content: () => <TypeDBOpenSource latestVersion={latestVersion} latestReleaseDate={new Date()}/>,
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

interface TypeDBOpenSourceProps {
    latestVersion: string;
    latestReleaseDate: Date;
}

const TypeDBOpenSource: React.FC<TypeDBOpenSourceProps> = ({latestVersion, latestReleaseDate}) => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    const latestReleaseDateFormatted = moment(latestReleaseDate).format("Do [of] MMMM YYYY");

    useEffect(() => {
        console.log(`TypeDBOpenSource: ` + latestVersion);
    }, [latestVersion]);

    const {state, dispatch} = useContext(Context);
    useEffect(() => {
        console.log(`TypeDBOpenSource (from Context): ` + state.typeDBVersion);
    }, [state.typeDBVersion]);

    const typeDBVersion = useTypeDBVersion()[0];

    // window.addEventListener(null, "setTypeDBVersion", (e) => {
    //     setTypeDBVersion(e.data);
    // });

    return (
        <>
            <div className={classes.comparisonBlockHeading}>
                <span className={clsx(classes.check, classes.checkGreen, classes.comparisonBlockHeadingCheck)}/>
                <h5 className={clsx(classes.h5, classes.comparisonBlockContent)}>AGPL v3.0 License</h5>
            </div>
            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMarginLarge)}>
                Deploy and operate your Grakn Core knowledge graph immediately. Grakn Core is licensed under AGPL so
                that you can start developing quickly and adopt Grakn within your solution in no time.
            </p>
            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMarginLarge)}>
                Current Stable Release: <strong>TypeDB Core {typeDBVersion}</strong>
                <br/>
                <strong>{latestReleaseDateFormatted}</strong> <a>Release Notes</a>
            </p>
        </>
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
