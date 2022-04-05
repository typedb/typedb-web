import React from "react";
import { VaticleLink } from "../link/link";
import { urls } from "../urls";
import { siteBannerStyles } from "./layout-styles";

export const EventBanner: React.FC = () => {
    const classes = siteBannerStyles();

    return <div className={classes.root}>
        Join us in Cambridge, New York and Boston this month
        <span className={classes.pipe}>|</span>
        <VaticleLink className={classes.link} href={urls.meetupsApr2022}>Learn more</VaticleLink>
    </div>
}
