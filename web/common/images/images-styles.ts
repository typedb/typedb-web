import { makeStyles } from '@material-ui/core';

export const vaticleAtomStyles = makeStyles({
    root: {
        "@media(max-width: 767px)": {
            marginLeft: "50%",
            transform: "translateX(-50%) scale(.667)",
        },
    },

    green: {
        animation: "$spin 320s linear infinite",
        transformOrigin: "center",
    },

    yellow: {
        animation: "$spin 160s linear infinite reverse",
        transformOrigin: "center",
    },

    red: {
        animation: "$spin 160s linear infinite",
        transformOrigin: "center",
    },

    pink: {
        animation: "$spin 320s linear infinite reverse",
        transformOrigin: "center",
    },

    "@keyframes spin": {
        from: {
            transform: "rotate(0deg)",
        },
        to: {
            transform: "rotate(360deg)",
        },
    },
});
