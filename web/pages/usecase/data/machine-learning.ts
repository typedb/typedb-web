import { UseCaseData } from "./use-case-data";
import MachineLearningDiagram from "../../../assets/images/machine-learning-diagram.png";
import SecurityIcon from "../../../assets/icons/security.svg";
import ContextualiseIcon from "../../../assets/icons/contextualise.svg";
import LearningAndTrainingIcon from "../../../assets/icons/learning-and-training.svg";

export const machineLearningData: UseCaseData = {
    "pageTitle": "Knowledge Graphs and Machine Learning",
    "introVideoURL": "https://www.youtube.com/watch?v=qhUyurWMiSQ",
    "mainLink": {
        "text": "Download TypeDB",
        "url": "https://github.com/vaticle/typedb"
    },
    "whitePaperLink": {
        "text": "Download White Paper",
        "url": "/documents/Machine_Learning_White_Paper.pdf",
        "hubspotFormID": "54db22d0-ef1d-45b1-b78b-8d576f8ae2fd"
    },
    "section1": {
        "title": "Why use TypeDB Knowledge Graphs for Machine Learning?",
        "body": [
            "TypeDB's strong type system allows you to model your data natively based on the entity relationship model, making it possible to build a Knowledge Graph that encodes the necessary context and semantics in your domain. It's then straightforward to learn and make predictions over interrelated data, for instance, data that has been ingested from various corporate silos using ontologies or taxonomies.",
            "TypeDB makes it possible to build the best possible features for your models to consume. Its strong type system ensures that your data has a clear structure defined by a schema. By checking that everything you insert adheres to a schema, this gives concrete assurance that the data is both typed and logically consistent. TypeDB also provides type hierarchies, which means learning about one type can have implications for other types in the same hierarchy. There are many more benefits that TypeDB's strong type system provides (see white paper below)."
        ]
    },
    "section2": {
        "title": "Predict New Relations or Classify Nodes using Machine Learning",
        "image": {
            "url": MachineLearningDiagram,
            "altText": "Knowledge Graph -> Aggregate -> Combine"
        },
    },
    "section3": {
        "title": "Strongly Typed Data for Machine Learning",
        "keyPoints": [
            {
                "title": "Add Context to your Data",
                "body": "Adding type information in machine learning ensures that every piece of data is guaranteed to have a predefined type. You can rely on these types as additional and contextual features for your entire knowledge graph.",
                "icon": ContextualiseIcon
            },
            {
                "title": "Type Safety Guarantees",
                "body": "TypeDB gives you concrete assurances that all of your data is both typed (within a rich type hierarchy) and logically consistent; a great platform on which to develop context-aware ML models.",
                "icon": SecurityIcon
            },
            {
                "title": "Learning with Inference",
                "body": "Use TypeDB's built-in inference engine combined with a neural network to predict new elements in a knowledge graph. Find new attributes, discover new relations, or build generic embeddings of TypeDB concepts.",
                "icon": LearningAndTrainingIcon
            }
        ],
        "keyPointPanelHeight": { desktop: 324, mobile: 275 }
    },
    "section4": {
        "title": "Leveraging Knowledge Graphs and Machine Learning with TypeDB",
        "keyPoints": [
            {
                "title": "Drug Discovery",
                "body": "As a strongly-typed database, TypeDB enables you to model the interconnectivity of biology at scale, making it easy to ingest heterogeneous datasets from public and private sources. With this knowledge foundation, you'll be able to build learners to power large scale predictions for disease targets, enabling you to find and validate the most promising gene target hypotheses."
            },
            {
                "title": "Cyber Security",
                "body": "Integrating all your cybersecurity data into TypeDB enables you to have one unified representation of all your data and make actionable use of it. This becomes your knowledge foundation to use machine learning techniques that leverage TypeDB's inference engine to not only detect attack techniques, but also learn how to predict them."
            },
            {
                "title": "Robotics",
                "body": "Autonomous vehicles leverage machine learning with TypeDB to create a centralised source of truth for the system's observations. Through object recognition, TypeDB's inference engine can, for example, infer in what room of a house it's located in or how it should execute a particular task."
            },
        ],
        "body": [
            "Whatever it is you're building, using TypeDB to build a knowledge graph for machine learning will give you the right context and semantics to enable your learner to really understand and capitalise upon connected data. TypeDB allows you to use any of the wide range of graph learning approaches, such as link prediction, node classification and attribute prediction, while through our open source repository KGLIB, TypeDB provides direct integrations with TensorFlow and PyTorch Geometric that you can start using today.",
            "If you're learning over data held in tables, this will instantly solve a serious problem. When flattening such data to build features we are prone to omit context and semantics. For instance, a graph ML algorithm wouldn't be able to walk over an SQL table if it had fields such as \"address1\", \"address2\", \"address3\" - it wouldn't know these to be interchangeable and equivalent.",
            "Given the new insights that TypeDB enables you to find, this can provide your company with the next competitive edge. That's why today TypeDB knowledge graphs are used for machine learning across various industries such as drug discovery, cyber security, robotics, fraud detection, and many more. Learn more in the white paper below."
        ]
    },
    "section5": {
        "title": "Start Learning Over Your TypeDB Knowledge Graph"
    }
}
