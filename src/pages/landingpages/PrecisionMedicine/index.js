import * as React from "react";
import { connect } from 'react-redux';
import LandingPage from "../../../factories/landingPage";
import LeadCaptureForm from "../LeadCaptureForm";
import TrackedPage from "../../TrackedPage";

class PrecisionMedicineLandingPage extends React.Component {
    render() {
        const factoryData = {
            pageInfo: {
                title: "Precision Medicine",
                url: "https://grakn.ai/precision-medicine",
            },
            header: {
                headline: "Precision Medicine Knowledge Graphs",
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
                title: "Discover Early Diagnoses and Relevant Therapeutic Regimes",
                description: "One of the biggest challenges in our current state of medicine is to provide relevant, personalised and precise diagnoses and treatments. Rather than treating all patients the same, the opportunity is to fully take into account a person’s demographics and genetic profile while treating them.\n\nWith Grakn, the promise of Precision Medicine gets much closer, faster, easier. ",
                action: {
                    title: "Download White Paper",
                    form: {
                        title: "Download Precision Medicine White Paper",
                        downloadPath: "src/pages/landingpages/downloads/Precision-Medicine.pdf"
                    }
                },
                videoUrl: "https://www.youtube.com/embed/videoseries?list=PLtEF8_xCPklbAvt0CGEYPH2F9tCgdfr7V"
            },
            sneakPeek: {
                title: "Building a Precision Medicine Knowledge Graph is Easy",
                url: "src/pages/landingpages/PrecisionMedicine/images/sneak-peek.png"
            },
            propositions: [
                {
                    title: "Grakn Makes it Easy to work with Biomedical Data",
                    items: [
                        {
                            title: "Fast Ingestion and \nIntegration of Data",
                            // icon: "I'm the icon for proposition A",
                            description: "Grakn works with any type of data, wherever it comes from. Grakn's expressive query language enables you to create your own semantically rich knowledge graphs by ingesting and integrating extremely heterogeneous patient profiles and biomedical data sets in an intuitive and flexible way."
                        },
                        {
                            title: "Contexualise Relations within your data",
                            // icon: "I'm the icon for proposition A",
                            description: "With Grakn, your development moves magnitudes faster because it enables you to iteratively and quickly contextualise newly generated insights in order to understand how it interacts and connects with all your data sources. Grakn becomes your unified representation of contextualised knowledge."
                        },
                        {
                            title: "Discover and Explain New Connections \nin Complex Networks",
                            // icon: "I'm the icon for proposition A",
                            description: "Grakn discovers new connections and uncovers hidden insights within your data through its in-built automated deductive reasoning engine. Rather than being a black box, Grakn gives you full explainability of every single insight such as early diagnoses or relevant therapeutic regimes."
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
                            title: "Download Precision Medicine White Paper",
                            downloadPath: "src/pages/landingpages/downloads/Precision-Medicine.pdf"
                        }
                    }
                ]
            }
        };

        return (
            <TrackedPage pageTitle="Precision Medicine">
               <LandingPage data={factoryData} LeadCaptureForm={LeadCaptureForm} hubspotFormId="5a5e9e87-9032-4614-8177-fdd681345d44" />
            </TrackedPage>
        )
    }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PrecisionMedicineLandingPage);
