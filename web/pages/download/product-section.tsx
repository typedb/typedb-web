import React, { useState } from "react";
import clsx from "clsx";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { ClassProps } from "../../common/class-props";
import { downloadPageProductStyles } from "./download-styles";
import moment from "moment";
import { useTypeDBVersion } from "../state/typedb-version";
import { VaticleButton } from "../../common/button/button";
import { urls } from "../../common/urls";
import { createStyles, FormControl, InputBase, Select, Theme, withStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { vaticleTheme } from "../../common/styles/theme";
import { VaticleSelect } from "../../common/select/select";

// TODO: This file has too many components and should be broken up
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

const TypeDBTab: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    const items: [ComparisonBlockItem, ComparisonBlockItem] = [{
        title: "Open Source",
        content: () => <TypeDBOpenSource latestReleaseDate={new Date("2021-05-25")}/>,
    }, {
        title: "Commercial",
        content: () => <p/>,
    }];

    return (
        <>
            <p className={classes.largeText}>
                TypeDB is a knowledge graph to organise complex networks of data and make it queryable. TypeQL is TypeDB’s
                reasoning (through OLTP) and analytics (through OLAP) declarative query language. <a>Learn more</a>
            </p>
            <ComparisonBlock items={items} className={classes.sectionMarginSmall}/>
        </>
    );
}

interface TypeDBOpenSourceProps {
    latestReleaseDate: Date;
}

const TypeDBOpenSource: React.FC<TypeDBOpenSourceProps> = ({latestReleaseDate}) => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageProductStyles());

    const latestReleaseDateFormatted = moment(latestReleaseDate).format("Do [of] MMMM YYYY");
    const typeDBVersion = useTypeDBVersion()[0];

    const [selectedOS, setSelectedOS] = useState("Mac OS X");
    const [selectedVersion, setSelectedVersion] = useState("2.1.1");

    return (
        <>
            <div className={classes.comparisonBlockHeading}>
                <span className={clsx(classes.check, classes.checkGreen, classes.comparisonBlockHeadingCheck)}/>
                <h5 className={clsx(classes.h5, classes.comparisonBlockContent)}>AGPL v3.0 License</h5>
            </div>

            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMarginLarge)}>
                Deploy and operate your TypeDB knowledge graph immediately. TypeDB is licensed under AGPL so
                that you can start developing quickly and adopt TypeDB within your solution in no time.
            </p>

            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMarginLarge)}>
                Current Stable Release: <strong>TypeDB {typeDBVersion}</strong>
                <br/>
                <strong>{latestReleaseDateFormatted}</strong> <a>Release Notes</a>
            </p>

            <p className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMarginLarge)}>
                <strong>Download and install with:</strong>
                <br/>
                <ul className={classes.horizontalBulletedList}>
                    <li><a href={urls.docs.installTypeDB.homebrew}>Homebrew</a></li>
                    <li><a href={urls.docs.installTypeDB.apt}>APT</a></li>
                    <li><a href={urls.docs.installTypeDB.docker}>Docker</a></li>
                </ul>
            </p>

            <div className={clsx(classes.comparisonBlockContent, classes.mediumText, classes.textMarginLarge, classes.selectGroup)}>
                <VaticleSelect label="Operating System" value={selectedOS} setValue={setSelectedOS} inputName="os" inputID="typedb-os">
                    <option value="Linux">Linux</option>
                    <option value="Mac OS X">Mac OS X</option>
                    <option value="Windows">Windows</option>
                </VaticleSelect>
                <VaticleSelect label="Version" value={selectedVersion} setValue={setSelectedVersion} inputName="version" inputID="typedb-version">
                    <option value="2.1.1">2.1.1</option>
                    <option value="2.0.2">2.0.2</option>
                    <option value="2.0.1">2.0.1</option>
                    <option value="2.0.0">2.0.0</option>
                </VaticleSelect>
            </div>

            <div className={clsx(classes.comparisonBlockContent, classes.mainActionList, classes.sectionMarginSmall)}>
                <VaticleButton size="small" type="primary" href={urls.github.typedbReleases} target="_blank">Download</VaticleButton>
            </div>
        </>
    );
}

const TypeDBClusterTab: React.FC = () => {
    return <p/>;
}

const TypeDBWorkbaseTab: React.FC = () => {
    return <p/>;
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
