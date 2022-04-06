import { useMediaQuery } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { ClassProps } from "../class-props";
import { vaticleStyles } from "../styles/vaticle-styles";
import { DataTable, DataTableBody } from "../table/data-table";
import { comparisonStyles } from "./comparison-styles";

export interface ComparisonTableProps extends ClassProps {
    item1: string;
    item2: string;
    rows: ComparisonTableRowData[];
}

export interface ComparisonTableRowData {
    name: string;
    value1: ComparisonTablePropertyValueData;
    value2: ComparisonTablePropertyValueData;
}

export type ComparisonTablePropertyValueData = boolean | string;

export const ComparisonTable: React.FC<ComparisonTableProps> = (props) => {
    const isMobile = useMediaQuery("(max-width: 767px)");
    return isMobile ? <ComparisonTableMobile {...props}/> : <ComparisonTableDesktop {...props}/>;
}

const ComparisonTableDesktop: React.FC<ComparisonTableProps> = ({item1, item2, rows, className}) => {
    const classes = Object.assign({}, vaticleStyles(), comparisonStyles());
    return (
        <DataTable className={className}>
            <thead className={classes.comparisonTableHeaderDesktop}>
                <th/>
                <th><div className={clsx(classes.comparisonBlockItemTitle, classes.comparisonBlockItem1Title)}>{item1}</div></th>
                <th><div className={clsx(classes.comparisonBlockItemTitle, classes.comparisonBlockItem2Title)}>{item2}</div></th>
            </thead>
            <DataTableBody className={classes.comparisonTableBody} striped>
                {rows.map(row => <ComparisonTableRowDesktop {...row}/>)}
            </DataTableBody>
        </DataTable>
    );
}

const ComparisonTableRowDesktop: React.FC<ComparisonTableRowData> = ({name, value1, value2}) => {
    return (
        <tr>
            <th>{name}</th>
            <td><PropertyValue value={value1} columnColor="green"/></td>
            <td><PropertyValue value={value2} columnColor="purple"/></td>
        </tr>
    );
}

type ColumnColor = "green" | "purple";

interface PropertyValueProps {
    value: ComparisonTablePropertyValueData;
    columnColor: ColumnColor;
}

const PropertyValue: React.FC<PropertyValueProps> = ({value, columnColor}) => {
    return typeof value === "boolean" ? <BooleanPropertyValue value={value} columnColor={columnColor}/> : <StringPropertyValue value={value}/>;
}

const BooleanPropertyValue: React.FC<{value: boolean, columnColor: ColumnColor}> = ({value, columnColor}) => {
    const classes = vaticleStyles();
    return value ? <span className={clsx(classes.check, columnColor === "green" ? classes.checkGreen : classes.checkPurple)}/> : <></>;
}

const StringPropertyValue: React.FC<{value: string}> = ({value}) => <span>{value}</span>;

const ComparisonTableMobile: React.FC<ComparisonTableProps> = ({item1, item2, rows, className}) => {
    const classes = comparisonStyles();
    return (
        <div className={clsx(classes.comparisonTableMobile, className)}>
            {rows.map(row => <ComparisonTableRowMobile item1={item1} item2={item2} row={row}/>)}
        </div>
    )
}

export interface ComparisonTableRowMobileProps {
    item1: string;
    item2: string;
    row: ComparisonTableRowData;
}

const ComparisonTableRowMobile: React.FC<ComparisonTableRowMobileProps> = ({item1, item2, row}) => {
    const classes = comparisonStyles();

    return (
        <div>
            <div className={classes.comparisonTableHeaderMobile}>{row.name}</div>
            <DataTable>
                <DataTableBody className={classes.comparisonTableBody}>
                    <tr>
                        <th>{item1}</th>
                        <td><PropertyValue value={row.value1} columnColor="green"/></td>
                    </tr>
                    <tr>
                        <th>{item2}</th>
                        <td><PropertyValue value={row.value2} columnColor="purple"/></td>
                    </tr>
                </DataTableBody>
            </DataTable>
        </div>
    )
}
