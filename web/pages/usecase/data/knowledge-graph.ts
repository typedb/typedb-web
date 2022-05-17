import { UseCaseData } from "./use-case-data";
import KnowledgeGraphImage from "../../../assets/images/knowledge-graph.png";
import InferenceIcon from "../../../assets/icons/inference.svg";
import MigrationAndIntegrationIcon from "../../../assets/icons/migration-and-integration.svg";
import LearningAndTrainingIcon from "../../../assets/icons/learning-and-training.svg";
import AstraZenecaLogo from "../../../assets/logos/purple/astrazeneca.png";
import FlipkartLogo from "../../../assets/logos/purple/flipkart.png";
import IBMLogo from "../../../assets/logos/purple/ibm.png";

export const knowledgeGraphData: UseCaseData = {
    "pageTitle": "Knowledge Graphs",
    "introVideoURL": "https://www.youtube.com/watch?v=e0lmTSb-rzY",
    "mainLink": {
        "text": "Download TypeDB",
        "url": "https://github.com/vaticle/typedb"
    },
    "whitePaperLink": {
        "text": "Download White Paper",
        "url": "/documents/Building_a_Knowledge_Graph_with_TypeDB.pdf",
        "hubspotFormID": "e548f768-a41c-428c-ad0e-be50b4a798fa"
    },
    "section1": {
        "title": "Why Use TypeDB to Build Your Knowledge Graph?",
        "body": [
            "By leveraging TypeDB's strongly-typed data model and built-in reasoning engine, you'll be able to create expressive ontologies and infer new knowledge. This makes it easy to integrate heterogeneous data sources and gain new insights from them. A TypeDB knowledge graph enables you to become a knowledge-driven organisation with actionable insights to make business decisions in full context. From Fortune 500 companies to universities, TypeDB makes it easy for anyone to build knowledge graphs.",
            "In the following white paper, you'll learn what really constitutes a knowledge graph, the history behind them, and how to build a knowledge graph with TypeDB."
        ]
    },
    "section2": {
        "title": "Discover and Explain New Knowledge in Your TypeDB Knowledge Graph",
        "image": {
            "url": KnowledgeGraphImage,
            "altText": "Knowledge Graph"
        }
    },
    "section3": {
        "title": "Benefits of a TypeDB Knowledge Graph",
        "keyPoints": [
            {
                "title": "Bridge Disparate Data Silos",
                "body": "Organisations have diverse and disparate data silos in various formats. TypeDB enables you to bring these together into one knowledge graph, allowing you to query and gain insights at scale. Through TypeDB’s flexible data model, data integration becomes much easier.",
                "icon": MigrationAndIntegrationIcon
            },
            {
                "title": "Turn Data into Knowledge",
                "body": "TypeDB allows you to model your knowledge graph by leveraging the full expressivity of the Entity-Relationship model. This enables you to natively capture context and semantics into a data model that accurately represents your domain - turning your data into knowledge.",
                "icon": LearningAndTrainingIcon
            },
            {
                "title": "More Powerful Insights",
                "body": "A TypeDB knowledge graph provides your domain with deep and dynamic context. It ensures that every piece of information has a predefined type. This enables the built-in reasoning engine to derive new conclusions for powerful insights.",
                "icon": InferenceIcon
            }
        ],
        "keyPointPanelHeight": { desktop: 352, mobile: 301 }
    },
    "section4": {
        "title": "What Are TypeDB Knowledge Graphs Used For?",
        "keyPoints": [
            {
                "title": "Cybersecurity",
                "body": "Integrating cybersecurity data into one semantic data model in TypeDB enables you to have one unified representation in the form of a knowledge graph and make actionable use of it. This becomes your knowledge foundation to build applications such as security event and incident management systems, [threat intelligence platforms](https://blog.vaticle.com/introducing-a-knowledge-graph-for-cyber-threat-intelligence-with-typedb-bdb559a92d2a) or endpoint detection and response systems. [Learn more](https://www.vaticle.com/use-cases/cyber-security)."
            },
            {
                "title": "Data Governance",
                "body": "TypeDB's strong type system makes it easy to capture the complexity inherent in your organisation. By aggregating disparate and unconnected data silos across organisational units, TypeDB enables you to represent the context and semantics in your data to unlock the data's real potential and drive better business decisions."
            },
            {
                "title": "E-commerce",
                "body": "Recommendation engines in e-commerce use TypeDB knowledge graphs with ontologies for large scale product catalogues, using modelling constructs such as type hierarchies and n-ary relations to accurately model thousands of product categories. Using this knowledge, TypeDB can infer new knowledge for better insights by the recommendation engine."
            },
            {
                "title": "Life Sciences",
                "body": "With TypeDB, you'll be able to build your own knowledge graph to serve as an engine for your [drug discovery](https://towardsdatascience.com/modelling-biomedical-data-for-a-drug-discovery-knowledge-graph-a709be653168) programmes. Ingest publicly available biomedical data, experimental in-vitro findings and data mined from scientific literature to consistently enrich your knowledge graph, and create a unified and accurate representation of all biomedical data relevant to you. [Learn more](https://www.vaticle.com/use-cases/life-sciences)."
            },
            {
                "title": "Robotics",
                "body": "Autonomous vehicles leverage TypeDB [knowledge graphs](https://dzone.com/articles/object-recognition-and-spacial-awareness-for-a-spo) to create a centralised source of truth for a system's observations. Through [object recognition](https://www.youtube.com/watch?v=4mz6ZlFWAro), TypeDB's reasoning engine can, for example, infer in what room of a house it's located in or how it should execute a particular task ([further reading](http://ceur-ws.org/Vol-2708/robontics6.pdf))."
            },
        ],
        "body": [
            "Regardless of the industry you're in, TypeDB is the perfect solution to serve as the database for your knowledge graph applications. Its rich and logical type system enables you to build powerful ontologies that aggregate disparate sources of data and infer new knowledge through its reasoning engine.",
            "To help you get started in building your knowledge graph with TypeDB, we provide lots of resources. A good place to start is this [TypeDB introductory video](https://www.youtube.com/watch?v=e0lmTSb-rzY) and our 3-part [TypeDB Academy](https://www.youtube.com/watch?v=vfSAgFayLnk&list=PLtEF8_xCPklasC8w3Il718lrpD32MinC6) training series. Make sure not to miss our [Quickstart](https://docs.vaticle.com/docs/general/quickstart) tutorial, and we also have several example knowledge graphs available for you to play with on Github: [cybersecurity](https://github.com/typedb-osi/typedb-cti), [life sciences](https://github.com/typedb-osi/typedb-bio) and [offshore leaks](https://github.com/typedb-osi/typedb-offshoreleaks)."
        ]
    },
    "section5": {
        "users": [
            { "name": "AstraZeneca", logo: { src: AstraZenecaLogo, width: 210 } },
            { "name": "Flipkart", logo: { src: FlipkartLogo, width: 200 } },
            { "name": "IBM", logo: { src: IBMLogo } }
        ]
    },
    "section6": {
        "title": "Start Building Your Knowledge Graph with TypeDB"
    }
}
