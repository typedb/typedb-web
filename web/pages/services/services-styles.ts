import {makeStyles} from "@material-ui/core";
import {vaticleTheme} from "../../common/styles/theme";
import { standardMargins, standardTextStyles } from "../../common/styles/vaticle-styles";

export const servicesPageStyles = makeStyles({
    introBody: {
        maxWidth: 600,
    },

    serviceOfferingsSection: {
        "& > * + *": {
            marginTop: standardMargins.subsection.desktop,

            "@media(max-width: 767px)": {
                marginTop: standardMargins.subsection.mobile,
            }
        }
    },

    serviceOfferingHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        "& h4": {
            marginLeft: 16,
        },
    },

    serviceOfferingIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 5,
        backgroundColor: vaticleTheme.palette.purple["4"],
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",

        "@media(max-width: 767px)": {
            width: 48,
            height: 48,
        },

        "& svg": {
            width: 40,

            "@media(max-width: 767px)": {
                width: 30,
            },
        },
    },

    serviceOfferingBody: {
        display: "flex",
        textAlign: "start",
        marginTop: standardMargins.text.desktop,

        "& > *": {
            "@media(min-width: 768px)": {
                flex: 1,
            },
        },

        "@media(max-width: 767px)": {
            flexDirection: "column",
            marginTop: standardMargins.text.mobile,
        },
    },

    serviceOfferingDescription: {
        "@media(min-width: 1200px)": {
            flex: 0.5,
        },

        "@media (min-width: 768px) and (max-width: 1199px)": {
            flex: 0.42,
        },
    },

    serviceOfferingFeatureList: {
        display: "flex",
        flexFlow: "column wrap",
        height: 144,

        "@media(min-width: 1200px)": {
            flex: 0.5,
        },

        "@media (min-width: 768px) and (max-width: 1199px)": {
            flex: 0.58,
        },

        "@media(max-width: 767px)": {
            marginTop: 8,
        },
    },

    serviceOfferingFeature: {
        display: "flex",

        "@media(min-width: 768px)": {
            alignItems: "flex-start",
            marginBottom: 16,
            marginLeft: 40,
            width: 244,
            height: 56,
        },

        "@media (min-width: 768px) and (max-width: 1199px)": {
            marginLeft: 20,
            width: "calc(((100vw - 40px) * 0.58) / 2 - 20px)",
        },

        "@media(max-width: 767px)": {
            marginTop: standardMargins.text.mobile,
        },

        "& span": {
            marginTop: 4,

            "@media(max-width: 767px)": {
                marginTop: 2,
            },
        },

        "& p": {
            marginLeft: 16,
        },
    },
});
