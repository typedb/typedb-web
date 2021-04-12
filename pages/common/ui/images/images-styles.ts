import { makeStyles } from '@material-ui/core';

export const vaticleAtomStyles = makeStyles({
    root: {
    },

    green: {
        animation: "spin 48s linear infinite",
        transformOrigin: "center",
    },

    yellow: {
        animation: "spin 40s linear infinite reverse",
        transformOrigin: "center",
    },

    red: {
        animation: "spin 36s linear infinite",
        transformOrigin: "center",
    },

    pink: {
        animation: "spin 30s linear infinite reverse",
        transformOrigin: "center",
    },
});
