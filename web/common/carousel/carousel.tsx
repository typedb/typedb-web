import clsx from "clsx";
import React from "react";
import { ClassProps } from "../class-props";
import { carouselStyles } from "./carousel-styles";

export interface CarouselProps extends ClassProps {
    itemSize: {[key in "desktop" | "mobile"]: { height: number, width: number }},
    itemCount: number
}

export const Carousel: React.FC<CarouselProps> = ({children, className, ...props}) => {
    const classes = carouselStyles(props);

    return (
        <div className={clsx(classes.root, className)}>
            <div className={classes.carousel}>
                {[0, 0, 0].map(() => <span className={classes.carouselHalf}>{children}</span>)}
            </div>
        </div>
    );
}
