import { makeStyles } from "@material-ui/core/styles";
import { CarouselProps } from "../../common/carousel/carousel";
import { vaticleTheme } from "../../common/styles/theme";

export const testimonialSize: CarouselProps["itemSize"] = {
    desktop: { width: 400, height: 416 },
    mobile: { width: 360, height: 388 }
}

export const testimonialsSectionStyles = makeStyles({
    root: {
        width: "100vw",
        maxWidth: "100vw",
    },
});

export const testimonialStyles = makeStyles({
    root: {
        width: testimonialSize.desktop.width,
        height: "100%",
        padding: "0 20px",
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",

        "@media(max-width: 767px)": {
            width: testimonialSize.mobile.width,
        },
    },

    companyLogo: {
        position: "absolute",
        top: 5,
        left: 0,
        right: 0,
        margin: "0 auto",
        width: 78,
        height: 78,
        borderRadius: "50%",
        border: `5px solid ${vaticleTheme.palette.purple["3"]}`,
    },

    companyLogoDecoration: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        margin: "0 auto",
        width: 88,
        height: 88,
        borderRadius: "50%",
    },

    panel: {
        height: 372,
        backgroundColor: vaticleTheme.palette.purple["4"],
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        padding: "0 20px",
        textAlign: "start",

        "@media(max-width: 767px)": {
            height: 344,
        },
    },

    panelBody: {
        marginTop: 58,
        height: 196, // lineHeight * 7

        "@media(max-width: 767px)": {
            height: 168,
        },
    },

    panelDivider: {
        marginTop: 16,
        height: 0,
        width: "100%",
        border: `1px solid ${vaticleTheme.palette.purple["5"]}`,
    },

    person: {
        marginTop: 4,
        display: "flex",
        alignItems: "center",

        "@media(max-width: 767px)": {
            marginTop: 6,
        },
    },

    avatar: {
        height: 64,
        width: 64,
        borderRadius: 5,

        "@media(max-width: 767px)": {
            marginTop: 2,
        },
    },

    personDetails: {
        marginLeft: 16,
    },

    personName: {
        fontSize: 18,
        lineHeight: "26px",
        fontWeight: 600,
    },

    personJobDetail: {
        fontSize: 16,
        lineHeight: "24px",
        fontWeight: 300,

        "@media(max-width: 767px)": {
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: 400,
        },
    },
});
