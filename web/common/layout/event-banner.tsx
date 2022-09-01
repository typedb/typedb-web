import React from "react";
import { VaticleLink } from "../link/link";
import { urls } from "../urls";
import { siteBannerStyles } from "./layout-styles";

export const EventBanner: React.FC = () => {
    const classes = siteBannerStyles();

    return <div className={classes.root}>
        Learn more about TypeDB at our weekly events
        <span className={classes.pipe}>|</span>
        <VaticleLink className={classes.link} href={urls.typeDBEventsCalendar}>Sign Up</VaticleLink>
    </div>
}
