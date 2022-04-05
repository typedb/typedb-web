import React from "react";
import { VaticleLink } from "../link/link";
import { urls } from "../urls";
import { siteBannerStyles } from "./layout-styles";

export const EventBanner: React.FC = () => {
    const classes = siteBannerStyles();

    return <div className={classes.root}>
        Live Meetups in Cambridge (UK), Boston, and New York
        <span className={classes.pipe}>|</span>
        <VaticleLink className={classes.link} href={urls.meetupsApr2022}>Join now</VaticleLink>
    </div>
}
