import { faTimesCircle } from "@fortawesome/pro-light-svg-icons/faTimesCircle";
import React from 'react';

import { VaticleButton } from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { vaticleTheme } from "../styles/theme";
import { urls } from "../urls";
import { cosmosBannerStyles } from "./layout-styles";
import { vaticleStyles } from "../styles/vaticle-styles";

export const CosmosBanner: React.FC = () => {
    const classes = Object.assign({}, vaticleStyles(), cosmosBannerStyles());

    return (
        <div className={classes.root}>
            <p>Join us at Cosmos 2022 | TypeDB's Virtual Conference | Jun 11-12</p>
            <VaticleButton size="small" type="primary" href={urls.cosmos2020}>Register for Free {">"}</VaticleButton>
            <FontAwesomeIcon className={classes.closeButton} icon={faTimesCircle}/>
        </div>
    );
};
