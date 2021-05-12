import { makeStyles } from '@material-ui/core';

export const vaticleAtomStyles = makeStyles({
    root: {
        "@media(max-width: 767px)": {
            marginLeft: "50%",
            transform: "translateX(-50%) scale(.667)",
        },
    },

    green: {
        animation: "spin 240s linear infinite",
        transformOrigin: "center",
    },

    yellow: {
        animation: "spin 220s linear infinite reverse",
        transformOrigin: "center",
    },

    red: {
        animation: "spin 200s linear infinite",
        transformOrigin: "center",
    },

    pink: {
        animation: "spin 180s linear infinite reverse",
        transformOrigin: "center",
    },
});
