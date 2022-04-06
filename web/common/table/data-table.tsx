import clsx from "clsx";
import React from "react";
import { vaticleStyles } from "../styles/vaticle-styles";
import { tableStyles } from "./table-styles";

export const DataTable: React.FC = ({children}) => {
    const classes = Object.assign({}, vaticleStyles(), tableStyles());
    return <table className={clsx(classes.dataTable)}>{children}</table>;
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

export const DataTableBody: React.FC = ({children}) => {
    const classes = tableStyles();
    return <tbody className={clsx(classes.dataTableBody)}>{children}</tbody>;
}
