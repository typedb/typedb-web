import * as React from "react";
import { connect } from 'react-redux';
import LandingPage from "../../../factories/landingPage";
import LeadCaptureForm from "../LeadCaptureForm";
import TrackedPage from "../../TrackedPage";

class LifeSciencesLandingPage extends React.Component {
    render() {
        const factoryData = {
            pageInfo: {
                title: "Drug Discovery",
                url: "https://grakn.ai/drugdiscovery",
            },
            header: {
                headline: "Drug Discovery Knowledge Graphs",
                // subHeadline: "I'm sub-headline",
                actions: [
                    {
                        title: "Try BioGrakn for Free",
                        url: "https://github.com/graknlabs/biograkn",
                        isPrimary: true
                    }
                ]
            },
            briefCopy: {
                title: "Accelerating Drug Discovery with Grakn",
                description: "Combinatorial chemistry has produced a huge amount of chemical libraries and data banks which include prospective drugs. Despite all of this progress, the fundamental problem still remains: how do we take advantage of this data to identify the prospective nature of a compound as a vital drug? Traditional methodologies fail to provide a solution to this.\n\nGrakn, however, provide the framework which can make drug discovery much more efficient, effective and approachable. This radical advancement in technology can model biological knowledge complexity as it is found at its core. With concepts such as hyper relationships, type hierarchies, automated reasoning and analytics we can finally model, represent, and query biological knowledge at an unprecedented scale.",
                action: {
                    title: "Download White Paper",
                    form: {
                        title: "Download Drug Discovery White Paper",
                        downloadPath: "src/pages/landingpages/downloads/Drug-Discovery.pdf"
                    }
                },
                // videoUrl: "https://www.youtube.com/embed/videoseries?list=PLtEF8_xCPklYpxH6d_AIlVqhboWO-o3y9"
            },
            sneakPeek: {
                title: "Building a Drug Discovery Knowledge Graph is Easy",
                url: "src/pages/landingpages/DrugDiscovery/images/sneak-peek.png"
            },
            propositions: [
                {
                    title: "Grakn Makes it Easy",
                    items: [
                        {
                            title: "Fast Ingestion and \nIntegration of Data",
                            // icon: "I'm the icon for proposition A",
                            description: "Grakn works with any type of data, wherever it comes from. Grakn's expressive query language enables you to create your own semantically rich knowledge graphs by ingesting and integrating extremely heterogeneous biomedical data sets in an intuitive and flexible way."
                        },
                        {
                            title: "Contexualise Newly \nGenerated Insights",
                            // icon: "I'm the icon for proposition A",
                            description: "With Grakn, your development moves magnitudes faster because it enables you to iteratively and quickly contextualise newly generated insights in order to understand how it interacts and connects with all your data sources. Grakn becomes your unified representation of knowledge."
                        },
                        {
                            title: "Explain New Connections \nin Complex Networks",
                            // icon: "I'm the icon for proposition A",
                            description: "Grakn discovers new connections and uncovers hidden insights within your data through its in-built automated deductive reasoning engine. Grakn gives you full explainability of every single insights such as identification of potential targets and potential drug candidates"
                        }
                    ]
                },
                {
                    title: "Why Other Databases Are Unsuitable For Biomedical Data",
                    items: [
                        {
                            title: "Too Complex to Model",
                            // icon: "I'm the icon for proposition B",
                            description: "Current modelling techniques are only based on binary relationships which makes it difficult to model complex domains. Grakn's hyper-relational data model solves this. Using hyper-relationships, hyper-entities and type hierarchies, you will easily be able to create complex knowledge models that can evolve flexibly."
                        },
                        {
                            title: "Too Complex to Query",
                            // icon: "I'm the icon for proposition B",
                            description: "Current languages only allow you to query for explicitly stored data, making verbose queries hard to simplify. Grakn performs automated reasoning of entity and relationship types to perform real-time inference of implicit facts and associations during query runtime. This allows you to uncover hidden insights."
                        },
                        {
                            title: "Too Expensive Analytics",
                            // icon: "I'm the icon for proposition B",
                            description: "Automated distributed algorithms (BSP) are expensive and not reusable between data models (Pregel, MapReduce). Grakn makes big data frameworks easy to use, so you don't have to worry about the underlying distributed system. Just use Grakn's analytical methods that come built-in as part of the language."
                        }
                    ]
                }
            ],
            testimonials: [
                {
                    image: "src/pages/landingpages/images/testimonial_lifebit.png",
                    description: "Learn how Lifebit provides suggestions how to run genomic analyses in the cloud.",
                    imageUrl: "https://lifebit.ai/",
                    actions: [
                        {
                            title: "Download",
                            form: {
                                title: "Download the Lifebit Case Study",
                                downloadPath: "src/pages/landingpages/downloads/Case-study-Lifebit.pdf"
                            }
                        }
                    ]
                },
                {
                    image: "src/pages/landingpages/images/testimonial_ust.png",
                    description: "Discover how UST uses Grakn to create a health care benefits chatbot.",
                    imageUrl: "https://www.ust-global.com/",
                    actions: [
                        {
                            title: "Download",
                            form: {
                                title: "Download the UST Case Study",
                                downloadPath: "src/pages/landingpages/downloads/Case-study-UST.pdf"
                            }
                        }
                    ]
                },
                {
                    image: "src/pages/landingpages/images/testimonial_infosys.png",
                    description: "Find out how Infosys leverages Grakn for Data Lineage and Metadata Management.",
                    imageUrl: "https://www.infosys.com/",
                    actions: [
                        {
                            title: "Download",
                            form: {
                                title: "Download the InfoSys Case Study",
                                downloadPath: "src/pages/landingpages/downloads/Case-study-Infosys.pdf"
                            }
                        }
                    ]
                },
            ],
            footer: {
                headline: "Accelerate Your Biomedical Research With Grakn",
                // subHeadline: "I'm sub-headline",
                actions: [
                    {
                        title: "Download BioGrakn",
                        url: "https://github.com/graknlabs/biograkn",
                        isPrimary: true
                    },
                    {
                        title: "Download White Paper",
                        form: {
                            title: "Download Drug Discovery White Paper",
                            downloadPath: "src/pages/landingpages/downloads/Drug-Discovery.pdf"
                        }
                    }
                ]
            }
        };

        return (
            <TrackedPage pageTitle="Drug Discovery">
               <LandingPage data={factoryData} LeadCaptureForm={LeadCaptureForm} hubspotFormId="a1fc9340-6621-46e0-b0d0-1d5349eb1bbf" />
            </TrackedPage>
        )
    }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LifeSciencesLandingPage);