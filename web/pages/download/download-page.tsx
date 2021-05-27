import React, { useEffect, useState } from 'react';
import { DefaultLayout } from "../../common/layout/default-layout";
import { downloadPageStyles } from "./download-styles";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { getTypeDBVersion } from "../api/typedb-service";

export const DownloadPage: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), downloadPageStyles());

    const [typeDBVersion, setTypeDBVersion] = useState("TypeDB");
    useEffect(() => {
        getTypeDBVersion().then(version => {
            setTypeDBVersion(version);
        });
    }, []);

    return (
        <DefaultLayout typeDBVersion={typeDBVersion}>
            <section className={classes.firstSection}>
                <h1 className={classes.h1}>TypeDB Download Centre</h1>
                <div className={classes.sectionMarginSmall}>

                </div>
            </section>
        </DefaultLayout>
    );
};
