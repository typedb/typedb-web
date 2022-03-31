import { makeStyles } from "@material-ui/core/styles";
import { vaticleTheme } from "../../common/styles/theme";

const testimonialWidth = 400;
const testimonialWidthMobile = 360;
const testimonialCount = 14;

export const testimonialsStyles = makeStyles({
    section: {
        width: "100vw",
        maxWidth: "100vw",
    },

    carouselContainer: {
        overflow: "hidden",
        position: "relative",
    },

    carousel: {
        display: "block",
        position: "absolute",

        "&:hover": {
            animationPlayState: "paused",
        },
    },

    testimonialCarouselContainer: {
        height: 416,
        width: "100%",
    },

    "@keyframes testimonials": {
        "0%": {left: 0},
        "100%": {left: -testimonialWidth * testimonialCount},
    },

    "@keyframes testimonialsMobile": {
        "0%": {left: 0},
        "100%": {left: -testimonialWidthMobile * testimonialCount},
    },

    testimonialCarousel: {
        width: testimonialWidth * testimonialCount * 3,
        height: 416,
        animation: `$testimonials ${testimonialCount * 12}s linear infinite`,

        "@media(max-width: 767px)": {
            width: testimonialWidthMobile * testimonialCount * 3,
            height: 388,
            animationName: "$testimonialsMobile",
        },
    },

    carouselHalf: {
        float: "left",
        width: testimonialWidth * testimonialCount,
        height: "100%",

        "@media(max-width: 767px)": {
            width: testimonialWidthMobile * testimonialCount,
        },
    },

    testimonialContainer: {
        width: testimonialWidth,
        height: "100%",
        padding: "0 20px",
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",

        "@media(max-width: 767px)": {
            width: testimonialWidthMobile,
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

    testimonialCompanyLogoDecoration: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        margin: "0 auto",
        width: 88,
        height: 88,
        borderRadius: "50%",
    },

    testimonial: {
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

    testimonialBody: {
        marginTop: 58,
        height: 196, // lineHeight * 7

        "@media(max-width: 767px)": {
            height: 168,
        },
    },

    testimonialDivider: {
        marginTop: 16,
        height: 0,
        width: "100%",
        border: `1px solid ${vaticleTheme.palette.purple["5"]}`, // TODO: this colour is not in the palette
    },

    testimonialPerson: {
        marginTop: 4,
        display: "flex",
        alignItems: "center",

        "@media(max-width: 767px)": {
            marginTop: 6,
        },
    },

    testimonialAvatar: {
        height: 64,
        width: 64,
        borderRadius: 5,

        "@media(max-width: 767px)": {
            marginTop: 2,
        },
    },

    testimonialPersonDetails: {
        marginLeft: 16,
    },

    testimonialPersonName: {
        fontSize: 18,
        lineHeight: "26px",
        fontWeight: 600,
    },

    testimonialPersonJob: {
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
