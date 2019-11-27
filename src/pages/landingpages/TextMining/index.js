import * as React from "react";
import { connect } from 'react-redux';
import LandingPage from "../../../factories/landingPage";
import LeadCaptureForm from "../LeadCaptureForm";
import TrackedPage from "../../TrackedPage";

class TextMiningLandingPage extends React.Component {
    render() {
        const factoryData = {
            pageInfo: {
                title: "Text Mining",
                url: "https://grakn.ai/text-mining",
            },
            header: {
                headline: "Text Mined Knowledge Graphs",
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
                title: "Going Beyond Text Mining",
                description: "Text is the medium used to store the tremendous wealth of scientific knowledge regarding the world we live in. However, with its ever increasing magnitude and throughput; analysing this unstructured data has become an impossibly tedious task. This has led to the rise of Text Mining and Natural Language Processing techniques and tools as the go-to for examining and processing large amounts of natural text data.\n\nBut once we have some text mined output, what to we do then? Do these text mining techniques simply produce the insights we are trying to uncover?\n\nGrakn, addressed these questions in a simple and intuitive manner.",
                action: {
                    title: "Download White Paper",
                    form: {
                        title: "Download Text Mining White Paper",
                        downloadPath: "src/pages/landingpages/downloads/Text-Mining.pdf"
                    }
                },
                videoUrl: "https://www.youtube.com/embed/cG6KRSc_WBk"
            },
            sneakPeek: {
                title: "Building a Text Mined Knowledge Graph is Easy",
                url: "src/pages/landingpages/TextMining/images/sneak-peek.png"
            },
            propositions: [
                {
                    title: "Grakn Makes it Easy",
                    items: [
                        {
                            title: "Fast Ingestion and \nIntegration of Data",
                            // icon: "I'm the icon for proposition A",
                            description: "Grakn works with any type of data, wherever it comes from. Grakn's expressive query language enables you to create your own semantically rich knowledge graphs by ingesting and integrating extremely heterogeneous text mined output in an intuitive and flexible way."
                        },
                        {
                            title: "Contexualise Relations within your data",
                            // icon: "I'm the icon for proposition A",
                            description: "Grakn enables you to iteratively and quickly contextualise newly generated insights in order to understand how it interacts and connects with all your data sources. Grakn becomes your unified representation of contextualised Text Mined knowledge."
                        },
                        {
                            title: "Discover and Explain New Insights",
                            // icon: "I'm the icon for proposition A",
                            description: "Grakn discovers new connections and uncovers hidden insights within your text mined output through its in-built automated deductive reasoning engine. Rather than being a black box, Grakn gives you full explainability of every single insights contained across text in a scalable and efficient way."
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
                            title: "Download Text Mining White Paper",
                            downloadPath: "src/pages/landingpages/downloads/Text-Mining.pdf"
                        }
                    }
                ]
            }
        };

        return (
            <TrackedPage pageTitle="Text Mining">
               <LandingPage data={factoryData} LeadCaptureForm={LeadCaptureForm} hubspotFormId="89945ea8-efbb-47c7-82c6-ed252f826da8" />
            </TrackedPage>
        )
    }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TextMiningLandingPage);
