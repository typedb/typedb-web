import AstraZenecaLogo from "../../../assets/logos/purple/astrazeneca.png";
import FlipkartLogo from "../../../assets/logos/purple/flipkart.png";
import IBMLogo from "../../../assets/logos/purple/ibm.png";
import { UseCaseData } from "./use-case-data";
import CTIQueryAnswersImage from "../../../assets/images/cti-query-answers.png";
import SecurityIcon from "../../../assets/icons/security.svg";
import ContextualiseIcon from "../../../assets/icons/contextualise.svg";
import InferenceIcon from "../../../assets/icons/inference.svg";

export const cyberSecurityData: UseCaseData = {
    "pageTitle": "Cyber Security with TypeDB",
    "introVideoURL": "https://www.youtube.com/watch?v=xuiYorG8-1Q",
    "mainLink": {
        "text": "Download TypeDB",
        "url": "https://github.com/vaticle/typedb"
    },
    "whitePaperLink": {
        "text": "Download White Paper",
        "url": "/documents/Cyber_Threat_Intelligence_White_Paper.pdf",
        "hubspotFormID": "d670fe41-d5f8-47d4-953b-d4d8aca49af8",
    },
    "section1": {
        "title": "Why Should You Use TypeDB in Cyber Security?",
        "body": [
            "Cybercrime is expected to cost organisations worldwide over $10 trillion annually by 2025, up from $3 trillion in 2015. That represents an annual growth of 15% — one of the greatest transfers of economic wealth ever. There is a huge need for innovative technologies to address the state of the industry. Cyber security data is inherently connected. To obtain a comprehensive picture to determine the severity of a particular threat, information from many different sources needs to be integrated. It's therefore essential that tools exist to make this integration, as well as the analysis of the data, more effective and efficient.",
            "Given the heterogeneous and complex nature of cyber security data, TypeDB is a perfect fit. TypeDB's expressive schema language, which allows for concepts such as type hierarchies and hyper relations, gives you a level of expressivity which can model the most complex cyber security data as accurately as possible. And through that semantic richness, TypeDB makes it easy to discover new insights, improving prevention of cyberattacks and helping to secure your enterprise."
        ]
    },
    "section2": {
        "title": "Create a Unified and Consistent Data Model for Your Cyber Security Data",
        "image": {
            "url": CTIQueryAnswersImage,
            "altText": "CTI Query"
        }
    },
    "section3": {
        "title": "Strongly Typed Data for Cyber Security",
        "keyPoints": [
            {
                "title": "Add Context to Your Data",
                "body": "TypeDB guarantees that every piece of data has a predefined type. Based on object-oriented principles, this makes modelling context and semantics in cyber security data straightforward.",
                "icon": ContextualiseIcon
            },
            {
                "title": "Type Safety Guarantees",
                "body": "TypeDB gives you concrete assurances that all of your data is both typed (within a rich type hierarchy) and logically consistent; a great platform on which to turn different kinds of cyber security data into knowledge.",
                "icon": SecurityIcon
            },
            {
                "title": "Logical Inference",
                "body": "Use TypeDB's built-in inference engine to discover new insights from existing data. TypeDB is able to make inferences at query run time when defining rules, allowing for the discovery of facts and patterns.",
                "icon": InferenceIcon
            }
        ],
        "keyPointPanelHeight": { desktop: 324, mobile: 275 }
    },
    "section4": {
        "title": "Building Cyber Security Platforms with TypeDB",
        "keyPoints": [
            {
                "title": "Security Information and Event Management",
                "body": "SIEM tools are an essential part of the data security ecosystem. They require the aggregation of data from multiple systems, and the analysis of such data to find malicious behaviour of possible cyberattacks. Through its strong type system, TypeDB makes it possible to represent the complexity inherent in such data and make actionable use of it."
            },
            {
                "title": "Threat Intelligence",
                "body": "CTI data is complex, dynamic and heterogeneous. This makes it a perfect fit for TypeDB. Through its strong type system, TypeDB allows for concepts such as type hierarchies and hyper relations, which gives you a level of expressivity to model the most complex cyber security data as accurately as possible, improving prevention of cyberattacks and the understanding of our CTI knowledge."
            },
            {
                "title": "Endpoint Detection and Response",
                "body": "In order to detect, investigate and quickly respond to suspicious activities on hosts and endpoints, we need to aggregate activity from various endpoints. Given the complex nature of such data, TypeDB enables you to accurately model this in one unified representation, in order to make sense of all the incoming information and find the right insights."
            }
        ],
        "body": [
            "Whatever cyber security application you are building, the data will inherently be complex and heterogeneous. You'll be dealing with entities such as threat actors, malwares, campaigns, vulnerabilities, and their interrelated connections. Using TypeDB you can now fully represent this complexity in a database that can take into account all of its context and semantics. TypeDB becomes a necessary tool to not only store this data, but also to reveal implicit knowledge and insights, in order to improve the security of your organisation.",
            "To help you get started with TypeDB, together with the community we have released an open source CTI platform called [TypeDB CTI](https://github.com/typedb-osi/typedb-cti) that you can start using today. Based on the well-known [STIX](https://oasis-open.github.io/cti-documentation/stix/intro.html) data standard, it provides a unified approach to the description of different kinds of cyber security data. This makes it straightforward for cyber security analysts to ingest heterogeneous threat intelligence data through a single common language which describes the data they work with.",
            "With the new insights that TypeDB can provide, your company can benefit from the next competitive edge. That's why today TypeDB is used to represent cyber security data for applications such as security information and event management, threat intelligence, endpoint detection and response, and many more. Learn more in the white paper below."
        ]
    },
    "section6": {
        "title": "Learn More About TypeDB for Cyber Security Today"
    }
}
