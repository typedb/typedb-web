import React, { useEffect, useState } from 'react';
import { DefaultLayout } from "../../common/layout/default-layout";
import { cloudPageStyles } from "./cloud-styles";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { getTypeDBVersion } from "../api/typedb-service";

export const CloudPage: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), cloudPageStyles());

    const [typeDBVersion, setTypeDBVersion] = useState("TypeDB");
    useEffect(() => {
        getTypeDBVersion().then(version => {
            setTypeDBVersion(version);
        });
    }, []);

    return (
        <DefaultLayout typeDBVersion={typeDBVersion}>
            <section className={classes.sectionMarginSmall}>
                <h1 className={classes.h1}>TypeDB Cluster in the Cloud and On-Premise</h1>
                <p className={classes.largeText}>
                    Easily deploy and manage TypeDB Cluster on one machine, or a thousand-node cluster
                </p>
            </section>
        </DefaultLayout>
    );
};
