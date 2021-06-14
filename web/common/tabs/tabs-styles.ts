import { makeStyles } from "@material-ui/core";

export const tabsStyles = makeStyles({
    tabGroup: {
        display: "flex",
    },

    tabItem: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transition: "background-color 150ms ease",
    },
});
