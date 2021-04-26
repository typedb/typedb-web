import { makeStyles } from '@material-ui/core';

export const vaticleAtomStyles = makeStyles({
    root: {
    },

    green: {
        animation: "spin 120s linear infinite",
        transformOrigin: "center",
    },

    yellow: {
        animation: "spin 110s linear infinite reverse",
        transformOrigin: "center",
    },

    red: {
        animation: "spin 100s linear infinite",
        transformOrigin: "center",
    },

    pink: {
        animation: "spin 90s linear infinite reverse",
        transformOrigin: "center",
    },
});
