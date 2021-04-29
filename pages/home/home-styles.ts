import { makeStyles } from '@material-ui/core/styles';
import { vaticleTheme } from "../styles/theme";

export const homePageStyles = makeStyles({
    layoutMain: {
        paddingTop: '4px',
    },

    sectionMarginLarge: {
        marginTop: 160,
    },

    sectionMarginSmall: {
        marginTop: 80,
    },

    underDevelopment: {
        maxWidth: 800,
        padding: "16px",
        border: `2px solid ${vaticleTheme.palette.green["200"]}`,
        borderRadius: 5,
        margin: "0 auto",
        fontSize: 16,
    },

    underDevelopmentLink: {
        color: `${vaticleTheme.palette.green["200"]} !important`,
    },

    diagramAndCaptionSection: {
        textAlign: "start",
    },

    h1: vaticleTheme.h1,

    h2: vaticleTheme.h2,

    largeText: {
        margin: '0 auto',
        marginTop: '16px',
        fontSize: '20px',
        fontWeight: 300,
        lineHeight: '34px',
        maxWidth: '960px',
    },

    mediumText: {
        marginTop: 16,
        fontSize: 16,
        lineHeight: "28px",
        fontWeight: 300,
    },

    mainLinks: {
        width: '100%',
        display: 'flex',
        border: `1px solid ${vaticleTheme.palette.purple[300]}`,
        borderRadius: 11,
    },

    firstMainLink: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '160px',
    },

    mainLink: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '160px',
        borderLeft: `1px solid ${vaticleTheme.palette.purple[300]}`,
    },

    mainLinkIcon: {
        color: '#FFF !important',
        fontSize: 66,
    },

    mainLinkCaption: {
        color: "#FFF",
        marginTop: '8px',
        fontSize: 16,
    },

    downloadGraknButton: {
        height: '72px !important',
    },

    corporateLogos: {
        width: "100%",
    },

    buttonAfterText: {
        marginTop: 40,
    },

    mainActionList: {
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fit, 240px)",
        gridGap: "30px 40px",
    },

    sectionToggleGroup: {
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fit, 185px)",
        gridRowGap: "24px",

        "@media(max-width: 767px)": {
            gridTemplateColumns: "repeat(auto-fit, 176px)",
        },
    },

    sectionToggle: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    sectionToggleIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 5,
        backgroundColor: vaticleTheme.palette.purple[600],
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid transparent",
        transition: "border-color 200ms ease",
        cursor: "pointer",

        "&:hover": {
            borderColor: vaticleTheme.palette.green[300],
        },

        "& svg": {
            width: 45,
            height: 45,

            "& g, & ellipse, & circle, & path": {
                stroke: "#FFF",
            },
        }
    },

    sectionToggleIconContainerSelected: {
        "& svg": {
            "& g, & ellipse, & circle, & path": {
                stroke: vaticleTheme.palette.green[300],
            },
        },
    },

    sectionToggleTitle: {
        marginTop: 27,
        fontSize: 16,
        lineHeight: "28px",
        fontWeight: 300,
    }
});
