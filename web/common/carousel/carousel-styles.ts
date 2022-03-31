import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CarouselProps } from "./carousel";

export const carouselStyles = makeStyles<Theme, CarouselProps>({
    root: {
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: (props) => props.itemSize.desktop.height,

        "@media(max-width: 767px)": {
            height: (props) => props.itemSize.mobile.height,
        }
    },

    carousel: {
        display: "block",
        position: "absolute",
        width: (props) => props.itemSize.desktop.width * props.itemCount * 3,
        height: (props) => props.itemSize.desktop.height,
        animation: (props) => `$carousel ${props.itemCount * 12}s linear infinite`,

        "&:hover": {
            animationPlayState: "paused",
        },

        "@media(max-width: 767px)": {
            width: (props) => props.itemSize.mobile.width * props.itemCount * 3,
            height: (props) => props.itemSize.mobile.height,
            animationName: "$carouselMobile",
        },
    },

    "@keyframes carousel": {
        "0%": (_) => ({left: 0}),
        "100%": (props) => ({left: -props.itemSize.desktop.width * props.itemCount}),
    },

    "@keyframes carouselMobile": {
        "0%": (_) => ({left: 0}),
        "100%": (props) => ({left: -props.itemSize.mobile.width * props.itemCount}),
    },

    carouselHalf: {
        float: "left",
        width: (props) => props.itemSize.desktop.width * props.itemCount,
        height: "100%",

        "@media(max-width: 767px)": {
            width: (props) => props.itemSize.mobile.width * props.itemCount,
        },
    },
});
