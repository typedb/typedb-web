import {makeStyles} from '@material-ui/core/styles';
import {vaticleTheme} from "../../common/styles/theme";
import { standardMargins } from "../../common/styles/vaticle-styles";

const tabGroupBorderRadius = 11;

export const downloadPageProductStyles = makeStyles({
    // TODO: These styles are based on homePageStyles.mainLinks - maybe we can extract a component?
    tabGroup: {
        width: '100%',
        marginLeft: "auto",
        marginRight: "auto",

        "@media(max-width: 767px)": {
            width: 288,
            display: "block !important",
        },

        "& a, & a:visited": {
            color: "#FFF",
        },
    },

    firstTabItem: {
        borderTopLeftRadius: tabGroupBorderRadius,

        "@media(min-width: 768px)": {
            borderBottomLeftRadius: tabGroupBorderRadius,
        },

        "@media(max-width: 767px)": {
            borderTopRightRadius: tabGroupBorderRadius,
        },
    },

    tabItem: {
        height: 96,
        border: `1px solid ${vaticleTheme.palette.purple["7"]}`,

        "@media(min-width: 768px)": {
            borderRightStyle: "none",
        },

        "@media(max-width: 767px)": {
            borderBottomStyle: "none",
        },
    },

    lastTabItem: {
        borderBottomRightRadius: tabGroupBorderRadius,

        "@media(min-width: 768px)": {
            borderTopRightRadius: tabGroupBorderRadius,
            borderRightStyle: "solid !important",
        },

        "@media(max-width: 767px)": {
            borderBottomLeftRadius: tabGroupBorderRadius,
            borderBottomStyle: "solid !important",
        },
    },

    tabItemSelected: {
        backgroundColor: vaticleTheme.palette.purple["7"],
    },

    tabIntro: {
        margin: "40px auto",
    },

    selectGroup: {
        marginTop: 32,
        display: "flex",

        "& *": {
            flex: 1,
        },

        "@media(min-width: 480px)": {
            "& > :not(:first-child)": {
                marginLeft: 16,
            },
        },

        "@media(max-width: 479px)": {
            flexDirection: "column",

            "& > :not(:first-child)": {
                marginTop: 16,
            },
        }
    },
});
