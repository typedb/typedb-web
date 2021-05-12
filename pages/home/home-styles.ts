import { makeStyles } from '@material-ui/core/styles';
import { vaticleTheme } from "../styles/theme";

// TODO: Break this object down by Component
export const homePageStyles = makeStyles({
    vaticleAtomContainer: {
        width: "100%",
    },

    diagramAndCaption: {
        textAlign: "start",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        "@media(max-width: 1199px)": {
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: 660,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },

    visualiserLeft: {
        "@media(min-width: 1200px)": {
            flexDirection: "row",
        },
    },

    visualiserRight: {
        "@media(min-width: 1200px)": {
            flexDirection: "row-reverse",
        },
    },

    diagramCaptionSpacingLeft: {
        "@media(min-width: 1200px)": {
            marginLeft: 40,
        },

        "@media(max-width: 1199px)": {
            marginTop: 40,
        },
    },

    diagramCaptionSpacingRight: {
        "@media(min-width: 1200px)": {
            marginRight: 40,
        },

        "@media(max-width: 1199px)": {
            marginTop: 40,
        },
    },

    learnMore: {
        width: 160,
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

    mainLinkIconCircle: {
        width: "60px !important",
        height: 60,
        borderRadius: "50%",
        color: vaticleTheme.palette.purple["700"],
        backgroundColor: "#FFF",
        padding: "14px 13px 14px 15px",
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
        gridTemplateColumns: "repeat(auto-fit, 224px)",
        gridGap: "30px 40px",
    },

    clusterAction: {
        width: 224,
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
        transition: "border-color 100ms ease",
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
    },

    featurePanelList: {
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fit, 360px)",
        gridTemplateRows: "repeat(auto-fit, 260px)",
        gridGap: "40px 40px",

        "@media(max-width: 767px)": {
            gridTemplateColumns: "repeat(auto-fit, 335px)",
        },
    },

    featurePanel: {
        backgroundColor: vaticleTheme.palette.purple["600"],
        borderRadius: 5,
        padding: "32px 40px",
        border: "1px solid transparent",
        transition: "border-color 100ms ease",
        position: "relative",

        "&:hover": {
            borderColor: vaticleTheme.palette.green[300],
        },
    },

    featurePanelBanner: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 100,
        height: 32,
        borderRadius: 5,
        backgroundColor: vaticleTheme.palette.purple["400"],
        display: "inline-flex",
        justifyContent: "center",
        fontSize: 14,
        lineHeight: "28px",
        fontWeight: 400,
    },

    carouselContainer: {
        width: "100%",
        overflow: "hidden",
    },

    carousel: {
        display: "flex",
        justifyContent: "center",
    },

    testimonialCarousel: {
        height: 368,
        transition: "transform 300ms ease",
    },

    testimonialContainer: {
        flex: "1 0 400px",
        padding: "0 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
    },

    testimonialCompanyLogo: {
        position: "absolute",
        top: 8,
        left: 0,
        right: 0,
        margin: "0 auto",
        width: 72,
        height: 72,
        backgroundColor: vaticleTheme.palette.purple["700"],
        borderRadius: "50%",
    },

    testimonialCompanyLogoDecoration: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        margin: "0 auto",
        width: 88,
        height: 88,
        borderRadius: "50%",
    },

    testimonial: {
        height: 324,
        backgroundColor: vaticleTheme.palette.purple["600"],
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        padding: "0 20px",
        textAlign: "start",
    },

    testimonialBody: {
        marginTop: 58,
    },

    testimonialDivider: {
        marginTop: 16,
        height: 0,
        width: 320,
        border: `1px solid ${vaticleTheme.palette.purple["450"]}`,
    },

    testimonialPerson: {
        marginTop: 16,
        display: "flex",
    },

    testimonialAvatar: {
        height: 48,
        width: 48,
        borderRadius: 5,
    },

    testimonialPersonDetails: {
        marginLeft: 16,
    },

    testimonialPersonName: {
        fontSize: 18,
        lineHeight: "26px",
        fontWeight: 600,
    },

    testimonialPersonJob: {
        fontSize: 14,
        lineHeight: "23px",
        fontWeight: 300,
    },

    carouselControlPanel: {
        margin: "0 auto",
        marginTop: 40,
        width: 335,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    leftChevron: {
        width: 10,
        height: 10,
        border: `1px none ${vaticleTheme.palette.purple["50"]}`,
        borderTopStyle: "solid",
        borderLeftStyle: "solid",
        transform: "rotate(-45deg)",
        marginLeft: 3,
    },

    rightChevron: {
        width: 10,
        height: 10,
        border: `1px none ${vaticleTheme.palette.purple["50"]}`,
        borderTopStyle: "solid",
        borderRightStyle: "solid",
        transform: "rotate(45deg)",
        marginRight: 3,
    },

    iconDisabled: {
        opacity: .38,
    },

    carouselPips: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    carouselPip: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: vaticleTheme.palette.purple["400"],
        transition: "transform 100ms ease, background-color 100ms ease, margin-top 100ms ease",
    },

    carouselPipGap: {
        marginLeft: 20,
    },

    carouselPipSelected: {
        transform: "scale(1.375)",
        marginTop: 1.5,
        backgroundColor: vaticleTheme.palette.green["300"],
    },

    communitySection: {
        width: 1220,
    },
});
