const docsURL = "https://docs.vaticle.com/docs";
const githubURL = "https://github.com/vaticle";

export const urls = {
    support: "https://support.grakn.ai",
    forum: "https://forum.vaticle.com",
    blog: "https://medium.com/vaticle",
    careers: "/careers",
    stackOverflow: "https://stackoverflow.com/questions/tagged/vaticle-typedb%20vaticle-typeql?sort=Newest&edited=true",
    officeLocation: "https://goo.gl/maps/bNN99QajkdD8THb7A",
    cosmos2020: "/events/typedb-cosmos-2020",
    cosmos2022: "/events/typedb-cosmos-2022",

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
        org: githubURL,
        typedb: `${githubURL}/typedb`,
        typedbReleases: `${githubURL}/typedb/releases`,
        typedbStudioReleases: `${githubURL}/typedb-studio/releases`,
    },

    social: {
        discord: "https://vaticle.com/discord",
        twitter: "https://twitter.com/VaticleHQ",
        facebook: "https://www.facebook.com/VaticleHQ/",
        linkedIn: "https://www.linkedin.com/company/vaticle/",
        youtube: "https://www.youtube.com/c/Vaticle",
    },

    hubspot: {
        contactForm: "https://api.hsforms.com/submissions/v3/integration/submit/4332244/57919d26-b0ed-4837-9b3d-490b5a683a36/",
        newsletterForm: "https://api.hsforms.com/submissions/v3/integration/submit/4332244/383fe621-0704-4577-96b1-3fe3321eb9b6/",
    },
};
