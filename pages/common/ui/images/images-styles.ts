import { makeStyles } from '@material-ui/core';

export const vaticleAtomStyles = makeStyles({
    root: {
    },

    green: {
        animation: "spin 44s linear infinite",
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
        animation: "spin 32s linear infinite reverse",
        transformOrigin: "center",
    },
});
