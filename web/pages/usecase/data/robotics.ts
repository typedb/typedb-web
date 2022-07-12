import DatabaseServerIcon from "../../../assets/icons/database-server.svg";
import { UseCaseData } from "./use-case-data";
import RoboticsDiagram from "../../../assets/images/robotics.png";
import InferenceIcon from "../../../assets/icons/inference.svg";
import LearningAndTrainingIcon from "../../../assets/icons/learning-and-training.svg";

export const roboticsData: UseCaseData = {
    "pageTitle": "Robotics with TypeDB",
    "introVideoURL": "https://www.youtube.com/watch?v=gWXtEze9zUw",
    "mainLink": {
        "text": "Download TypeDB",
        "url": "https://www.vaticle.com/download"
    },
    "whitePaperLink": {
        "text": "Download White Paper",
        "url": "/documents/Robotics_White_Paper.pdf",
        "hubspotFormID": "f979dc22-8281-4857-ac59-a28015fff7eb",
    },
    "section1": {
        "title": "Why use TypeDB Knowledge Graphs for Robotics?",
        "body": [
            "Data in robotics is often incredibly heterogeneous as it needs to represent real world data, planning systems, hardware data, and much more. This requires a database system that can build the type of [knowledge graphs](https://blog.vaticle.com/what-is-a-knowledge-graph-5234363bf7f5) or knowledge bases that can model this type of information and all its semantic richness. This is why many robotics organisations use TypeDB to natively model constructs such as hyper relations, nested relations, type hierarchies and much more.",
            "With TypeDB, you'll have the right framework to build knowledge-enabled robots. TypeDB gives robots the ability to reason independently without having to rely exclusively on human intervention or expensive machine learning approaches. Download the white paper below to learn how TypeDB can be used to build robotics systems. The white paper includes code examples that you can start using today."
        ]
    },
    "section2": {
        "title": "Create Expressive Environment Models and Infer New Knowledge with TypeDB",
        "image": {
            "url": RoboticsDiagram,
            "altText": "Robotics Graph"
        },
    },
    "section3": {
        "title": "Increase Autonomy in Your Robotics Systems",
        "keyPoints": [
            {
                "title": "Improved Task Planning Efficiency",
                "body": "TypeDB enables you to build knowledge bases that describe the structure to understand and conceptualise the task planning of your robot in a real-world setting. Using TypeDB's inference engine, your robot will be able to make decisions independently for more efficient autonomous task planning.",
                "icon": InferenceIcon
            },
            {
                "title": "More Intelligent Environment Modelling",
                "body": "As your robot navigates through the real world, it obtains sensory features and creates symbolic representations in TypeDB. By leveraging the full expressivity of the ER model, this enables TypeDB to create contextual knowledge that your robot can use to reason and make decisions independently.",
                "icon": LearningAndTrainingIcon
            },
            {
                "title": "Fast Ingestion and Integration of Heterogeneous Data",
                "body": "TypeDB's expressiveness enables you to quickly create and iterate over a model to create semantically rich knowledge bases. This makes it easy to ingest and integrate extremely heterogeneous data (e.g., geospatial data, planning systems, hardware data) enabling your robot to make better use of its data.",
                "icon": DatabaseServerIcon
            }
        ],
        "keyPointPanelHeight": { desktop: 408, mobile: 344 }
    },
    "section4": {
        "title": "Build Robotics Systems on the Shoulders of TypeDB",
        "keyPoints": [
            {
                "title": "Autonomous Drones",
                "body": "For autonomous drones to move on their own, they are required to perform tasks autonomously such as environment modelling, place localisation, and task planning. TypeDB becomes the unifying knowledge base that ties these systems together, enabling the drone to make decisions on its own without needing human intervention."
            },
            {
                "title": "Self-Driving Cars",
                "body": "A self-driving car needs to make sense of heterogeneous data such as traffic rules, incoming sensor information, physical environments, and much more. TypeDB is uniquely suited to accurately represent this level of complexity and enable the robot to leverage it for more accurate and confident autonomous decision making ([further reading](https://dzone.com/articles/using-typedb-for-self-driving-autonomous-vehicles))."
            },
            {
                "title": "Search & Rescue Robots",
                "body": "In real-world scenarios, new facts are constantly presented to the robot during active search and rescue missions, which require the robot to have a database that allows it to update its underlying knowledge on the fly. TypeDB makes this possible in a suitable and automated way. Learn more in [this article](https://hackernoon.com/object-recognition-with-spot-from-boston-robotics-9g2m347j) and [presentation](https://www.youtube.com/watch?v=3oAu4_bxjAg) from [TNO](https://www.tno.nl/)."
            }
        ],
        "body": [
            "Whatever type of Robotics System you are building, TypeDB is the perfect solution to serve as the knowledge base to move a step closer to autonomy in robotics. TypeDB's rich and logical type system enables you to build powerful ontologies that aggregate disparate sources of data and infer new knowledge through its reasoning engine.",
            "We provide several resources to help you get started with TypeDB. A good place to begin is this [TypeDB introductory video](https://www.youtube.com/watch?v=e0lmTSb-rzY) and our 3-part [TypeDB Academy](https://www.youtube.com/watch?v=vfSAgFayLnk&list=PLtEF8_xCPklasC8w3Il718lrpD32MinC6) training series. Make sure not to miss our [Quickstart](https://docs.vaticle.com/docs/general/quickstart) tutorial, and we also have several example knowledge graphs available for you to play with on Github: [cybersecurity](https://github.com/typedb-osi/typedb-cti), [life sciences](https://github.com/typedb-osi/typedb-bio) and [offshore leaks](https://github.com/typedb-osi/typedb-offshoreleaks)."
        ]
    },
    "section6": {
        "title": "Start Building Robotics Systems with TypeDB"
    }
}
