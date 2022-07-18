import React from "react";
import { VaticleLink } from "../link/link";
import { urls } from "../urls";
import { siteBannerStyles } from "./layout-styles";

export const EventBanner: React.FC = () => {
    const classes = siteBannerStyles();

    return <div className={classes.root}>
        Join us in New York and San Francisco this month
        <span className={classes.pipe}>|</span>
        <VaticleLink className={classes.link} href={urls.eventsJuly2022}>Sign Up</VaticleLink>
    </div>
}
