const docsURL = "https://docs.vaticle.com/docs";
const githubURL = "https://github.com/vaticle";

export const urls = {
    legacySite: "https://grakn.ai",
    support: "https://support.grakn.ai",
    forum: "https://forum.vaticle.com",
    blog: "https://blog.grakn.ai/?__hstc=146951137.435761e660f3decdcd676be2f619bfdd.1610018211811.1621937414072.1621950449351.33&__hssc=146951137.4.1621950449351&__hsfp=828018349",
    officeLocation: "https://goo.gl/maps/bNN99QajkdD8THb7A",

    docs: {
        home: docsURL,
        typeDBQuickstart: `${docsURL}/general/quickstart`,

        installTypeDB: {
            homebrew: `${docsURL}/running-typedb/install-and-run#using-homebrew`,
            apt: `${docsURL}/running-typedb/install-and-run#using-apt`,
            docker: `${docsURL}/running-typedb/install-and-run#using-docker`,
        },
    },

    github: {
        home: githubURL,
        typedb: `${githubURL}/typedb`,
        typedbReleases: `${githubURL}/typedb/releases/`,
    },

    social: {
        discord: "https://vaticle.com/discord",
        twitter: "https://twitter.com/VaticleHQ",
        facebook: "https://www.facebook.com/VaticleHQ/",
        linkedIn: "https://www.linkedin.com/company/vaticle/",
    },
};
