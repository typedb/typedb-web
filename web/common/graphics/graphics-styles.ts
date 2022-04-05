import { makeStyles, Theme } from "@material-ui/core";
import { vaticleTheme } from "../styles/theme";
import { MacOSWindowProps } from "./macos-window";

const borderBlack = vaticleTheme.palette.purple["1"];

export const macOSWindowHeaderStyles = makeStyles({
    root: {
        borderBottom: `1px solid ${borderBlack}`,
    }
});

export const macOSWindowStyles = makeStyles<Theme, MacOSWindowProps>({
    graphicContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    graphic: {
        "@media(max-width: 767px)": {
            transform: (props) => `scale(${props.mobileScale})`,
            marginTop: (props) => props.mobileVerticalMargin,
            marginBottom: (props) => props.mobileVerticalMargin,
        },
    }
});

export const gitWindowFooterStyles = makeStyles({
    root: {
        height: 24,
        borderRadius: "0 0 5px 5px",
        backgroundColor: "#0B0339",
        display: "inline-flex",
        alignItems: "center",
        padding: "0 8px",
        fontSize: 12,
        color: "#484B72",
    },

    icon: {
        marginLeft: 8,
    },

    iconLabel: {
        marginLeft: 5,
    }
});
