import { useMediaQuery } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { ClassProps } from "../class-props";
import { vaticleStyles } from "../styles/vaticle-styles";
import { embedStyles } from "./embed-styles";

interface YoutubeVideoEmbedProps extends ClassProps {
    url: string;
}

export const YoutubeVideoEmbed: React.FC<YoutubeVideoEmbedProps> = ({className, url}) => {
    const classes = Object.assign({}, vaticleStyles(), embedStyles());
    const isMobile = useMediaQuery("(max-width: 767px)");
    const embedURL = url.replace("/watch?v=", "/embed/");

    return isMobile
        ? (
            <div className={clsx(className, classes.embedContainerMobile)}>
                <iframe className={classes.embedMobile} src={embedURL}
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
            </div>
        ) : (
            <iframe className={className} src={embedURL}
                    width="760" height="451" title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen/>
        );
}
