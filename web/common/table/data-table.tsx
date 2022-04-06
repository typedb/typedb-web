import clsx from "clsx";
import React from "react";
import { ClassProps } from "../class-props";
import { vaticleStyles } from "../styles/vaticle-styles";
import { tableStyles } from "./table-styles";

export const DataTable: React.FC<ClassProps> = ({children, className}) => {
    const classes = Object.assign({}, vaticleStyles(), tableStyles());
    return <table className={clsx(classes.dataTable, className)}>{children}</table>;
}

interface DataTableHeaderProps {
    titles: string[];
}

export const DataTableHeader: React.FC<DataTableHeaderProps> = ({titles}) => {
    const classes = Object.assign({}, vaticleStyles(), tableStyles());
    return (
        <thead className={clsx(classes.dataTableHeader)}>
            {titles.map(title => <th className={classes.dataTableHeaderItem}>{title}</th>)}
        </thead>
    );
}

enum DataTableBodyBorderRounding {
    Bottom,
    AllExceptTopRight
}

interface DataTableBodyProps extends ClassProps {
    striped?: boolean;
    borderRounding?: DataTableBodyBorderRounding;
}

export const DataTableBody: React.FC<DataTableBodyProps> = ({className, striped, borderRounding, children}) => {
    const classes = tableStyles();
    const borderRadius = borderRounding === DataTableBodyBorderRounding.AllExceptTopRight ? "5px 0 5px 5px" : "0 0 5px 5px";
    return <tbody className={clsx(classes.dataTableBody, striped && classes.striped, className)} style={{borderRadius: borderRadius}}>{children}</tbody>;
}
