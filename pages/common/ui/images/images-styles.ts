import { makeStyles } from '@material-ui/core';

export const vaticleAtomStyles = makeStyles({
    root: {
    },

    green: {
        animation: "spin 24s linear infinite",
        transformOrigin: "center",
    },

    yellow: {
        animation: "spin 20s linear infinite reverse",
        transformOrigin: "center",
    },

    red: {
        animation: "spin 18s linear infinite",
        transformOrigin: "center",
    },

    pink: {
        animation: "spin 15s linear infinite reverse",
        transformOrigin: "center",
    },
});
