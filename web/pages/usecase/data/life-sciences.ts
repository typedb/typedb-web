import AstraZenecaLogo from "../../../assets/logos/purple/astrazeneca.png";
import RocheLogo from "../../../assets/logos/purple/roche.png";
import GenentechLogo from "../../../assets/logos/purple/genentech.png";
import { UseCaseData } from "./use-case-data";
import DatabaseServerIcon from "../../../assets/icons/database-server.svg";
import InferenceIcon from "../../../assets/icons/inference.svg";
import ContextualiseIcon from "../../../assets/icons/contextualise.svg";
import LifeSciencesGraph from "../../../assets/images/life-sciences-graph.png";

export const lifeSciencesData: UseCaseData = {
    "pageTitle": "Biomedical Knowledge Graphs",
    "introVideoURL": "https://www.youtube.com/watch?v=XJDr_prOp9g",
    "mainLink": {
        "text": "Explore TypeDB Bio",
        "url": "https://github.com/typedb-osi/typedb-bio"
    },
    "whitePaperLink": {
        "text": "Download White Paper",
        "hubspotFormID": "55564d17-935c-4ff5-8642-a682fb09de95",
        "url": "/documents/Accelerating_Drug_Discovery_with_a_TypeDB_Knowledge_Graph.pdf"
    },
    "section1": {
        "title": "Accelerating Biomedical Knowledge Discovery with TypeDB",
        "body": [
            "Systems biology produces a tremendous amount of heterogeneous data between biological components such as genes, proteins, tissues and cells. This data presents challenges for bioinformaticians in their integration due to their inherent complex nature and rich semantics. However, analysing large volumes of biological data through traditional database systems is troublesome and challenging.",
            "With TypeDB, working with life sciences data becomes much easier enabling you to accelerate the entire drug discovery process."
        ]
    },
    "section2": {
        "title": "Discover New Ways to Treat Disease",
        "image": {
            "url": LifeSciencesGraph,
            "altText": "Biomedical Knowledge Graph Query"
        },
    },
    "section3": {
        "title": "TypeDB Makes it Easy to work with Biomedical Data",
        "keyPoints": [
            {
                "title": "Fast Ingestion and Integration of Heterogeneous Data",
                "body": "TypeDB's expressiveness enables you to quickly create and iterate over a model to create semantically rich knowledge graphs. This allows you to easily ingest and integrate extremely heterogeneous biomedical data (for example, proteins, genes, diseases, drugs) in an intuitive and flexible way.",
                "icon": DatabaseServerIcon
            },
            {
                "title": "Contextualise Your Biomedical Data",
                "body": "With TypeDB, your development moves much faster as it becomes easy to understand the context around your existing data and newly generated insights. By becoming the unified representation of knowledge, TypeDB allows you to understand the complicated connections at the gene, protein or cell level.",
                "icon": ContextualiseIcon
            },
            {
                "title": "Explain New Connections in Complex Networks",
                "body": "TypeDB uncovers biomedical insights within your data through its built-in inference engine, for example, a new potential gene target or patient cohort. Rather than being a black box, TypeDB gives you full explainability of every single insight and the internal mechanics in human understandable terms.",
                "icon": InferenceIcon
            }
        ],
        "keyPointPanelHeight": { desktop: 408, mobile: 344 }
    },
    "section4": {
        "title": "Expanding the Possibilities Across all Areas of Drug Discovery",
        "keyPoints": [
            {
                "title": "Target Identification",
                "body": "TypeDB enables you to model any sort of biomedical data at scale, making it easy to ingest heterogeneous datasets from public (e.g. Uniprot, Reactome) to private sources. With this knowledge foundation, you'll be able to leverage TypeDB's inference engine combined with machine learning models to predict and validate the most promising target hypotheses."
            },
            {
                "title": "Precision Medicine",
                "body": "Build your own personalised target identification process by leveraging TypeDB to identify patient subgroups that could respond similarly to particular treatments. Through TypeDB's unique modelling constructs, you'll be able to create complex knowledge models that evolve flexibly, which can inform the design of your clinical trials."
            },
            {
                "title": "Drug Repurposing",
                "body": "Integrate large volumes of biomedical data into TypeDB to build predictive systems to enable hypothesis generation for drug repurposing. With TypeDB, you'll be able to find not previously known insights and enable you to quickly ingest and integrate experimental biomedical data, for example high throughput systems or sequencing algorithms."
            },
            {
                "title": "Biomedical Knowledge Graphs",
                "body": "With TypeDB, you'll be able to build your own Knowledge Graph to serve as an engine for your drug discovery programmes. Ingest publicly available biomedical data, experimental in-vitro findings and data mined from scientific literature to consistently enrich your Knowledge Graph, and create a unified and accurate representation of all biomedical data relevant to you."
            },
        ]
    },
    "section5": {
        "users": [
            { "name": "Roche", logo: { src: RocheLogo } },
            { "name": "AstraZeneca", logo: { src: AstraZenecaLogo, width: 210 } },
            { "name": "Genentech", logo: { src: GenentechLogo } }
        ]
    },
    "section6": {
        "title": "Accelerating Biomedical Knowledge Discovery with TypeDB"
    }
}
