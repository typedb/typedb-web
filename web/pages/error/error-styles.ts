import { makeStyles } from "@material-ui/core";
import { headerHeight } from "../../common/layout/layout-styles";
import {vaticleTheme} from "../../common/styles/theme";

const contentHeight = {
    desktop: 409,
    tablet: 657,
    mobile: 415,
}

export const errorStyles = makeStyles({
    main: {
        // We can't use Flexbox because it causes the scaled ExampleWindow to stretch the window horizontally on mobile.

        paddingTop: `calc((100vh - ${contentHeight.desktop}px - ${headerHeight}px) / 2)`,

        "@media (min-width: 768px) and (max-width: 1199px)": {
            paddingTop: `calc((100vh - ${contentHeight.tablet}px - ${headerHeight}px) / 2)`,
        },

        "@media(max-width: 767px)": {
            paddingTop: `calc((100vh - ${contentHeight.mobile}px - ${headerHeight}px) / 2)`,
        },
    },

    errorWindow: {
        flex: 1,
        backgroundColor: vaticleTheme.palette.purple["1"],
        borderRadius: "0 0 5px 5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    statusCode: {
        fontSize: 200,
        fontWeight: 600,
        letterSpacing: ".04em",
    },

    statusText: {
        fontSize: 40,
        lineHeight: "70px",
        fontWeight: 300,
        marginBottom: "30px",
    },
});
