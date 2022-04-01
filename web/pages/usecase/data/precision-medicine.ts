import { UseCaseData } from "./use-case-data";
import HighAvailabilityIcon from "../../../assets/icons/high-availability.svg";

export const precisionMedicineData: UseCaseData = {
    "pageTitle": "Precision Medicine Knowledge Graphs",
    "introVideoURL": "https://www.youtube.com/watch?v=LUXl3GM604s",
    "mainLink": {
        "text": "Try BioGrakn for free",
        "url": "https://example.com"
    },
    "whitePaperLink": {
        "text": "Download White Paper",
        "hubspotFormID": "1234",
        "url": "https://example.com"
    },
    "section1": {
        "title": "Discover Early Diagnoses and Relevant Therapeutic Regimes",
        "body": [
            "One of the biggest challenges in our current state of medicine is to provide relevant, personalised and precise diagnoses and treatments. Rather than treating all patients the same, the opportunity is to fully take into account a person's demographics and genetic profile while treating them.",
            "With Grakn, the promise of Precision Medicine gets much closer, faster, easier."
        ]
    },
    "section2": {
        "title": "Building a Precision Medicine Knowledge Graph is Easy",
        "image": {
            "url": "https://vaticle.com/favicon.png",
            "altText": "Precision Medicine Knowledge Graph"
        },
    },
    "section3": {
        "title": "Grakn Makes it Easy to work with Biomedical Data",
        "keyPoints": [
            {
                "title": "Fast Ingestion and Integration of Data",
                "body": "Grakn works with any type of data, wherever it comes from. Grakn's expressive query language enables you to create your own semantically rich knowledge graphs by ingesting and integrating extremely heterogeneous patient profiles and biomedical data sets in an intuitive and flexible way.",
                "icon": HighAvailabilityIcon,
            },
            {
                "title": "Contextualise Relations within your data",
                "body": "With Grakn, your development moves magnitudes faster because it enables you to iteratively and quickly contextualise newly generated insights in order to understand how it interacts and connects with all your data sources. Grakn becomes your unified representation of contextualised knowledge.",
                "icon": HighAvailabilityIcon,
            },
            {
                "title": "Discover and Explain New Connections in Complex Networks",
                "body": "Grakn discovers new connections and uncovers hidden insights within your data through its in-built automated deductive reasoning engine. Grakn gives you full explainability of every single insights such as identification of potential targets and potential drug candidates.",
                "icon": HighAvailabilityIcon,
            }
        ],
        "keyPointPanelHeight": 408,
    },
    "section4": {
        "title": "Why Other Databases Are Insufficient for Machine Learning",
        "keyPoints": [
            {
                "title": "Too Complex to Model",
                "body": "Current modelling techniques are only based on binary relationships which makes it difficult to model complex domains. Grakn's hyper-relational data model solves this. Using hyper-relationships, hyper-entities and type hierarchies, you will easily be able to create complex knowledge models that can evolve flexibly."
            },
            {
                "title": "Too Complex to Query",
                "body": "Current languages only allow you to query for explicitly stored data, making verbose queries hard to simplify. Grakn performs automated reasoning of entity and relationship types to perform real-time inference of implicit facts and associations during query runtime. This allows you to uncover hidden insights."
            },
            {
                "title": "Too Expensive Analytics",
                "body": "Automated distributed algorithms (BSP) are expensive and not reusable between data models (Pregel, MapReduce). Grakn makes big data frameworks easy to use, so you don't have to worry about the underlying distributed system. Just use Grakn's analytical methods that come built-in as part of the language."
            }
        ]
    },
    "section5": {
        "title": "Accelerate Your Biomedical Research With Grakn"
    }
}
