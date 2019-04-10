import * as React from "react";
import { connect } from 'react-redux';
import LandingPage from "../../../factories/landingPage";
import LeadCaptureForm from "./LeadCaptureForm";

class BiomedLandingPage extends React.Component {
    render() {
        const factoryData = {
            header: {
                headline: "Biomedical Knowledge Graphs",
                // subHeadline: "I'm sub-headline",
                actions: [
                    {
                        title: "Try BioGrakn for free",
                        url: "https://github.com/graknlabs/biograkn/tree/master",
                        isPrimary: true
                    }
                ]
            },
            briefCopy: {
                title: "Accelerating Biomedical Knowledge Discovery with Grakn",
                description: "Systems biology produces a tremendous amount of heterogeneous data which present challenges in their integration due to their complex nature and rich semantics. However, analysing large volumes of biological data through traditional database systems is troublesome and challenging.\n\nWith Grakn, working with biological data becomes much easier to accelerate the knowledge discovery process.",
                action: {
                    title: "Download White Paper",
                    form: {
                        title: "Download BioGrakn White Paper",
                        downloadPath: "src/pages/landingpage/Biomed/downloads/Grakn-Intro-in-Biotech.pdf"
                    }
                },
                videoUrl: "https://www.youtube.com/embed/Mc1VXKYJEpk"
            },
            sneakPeek: {
                title: "Discover and Explain New Connections in Complex Networks of Data",
                url: "src/pages/landingpage/Biomed/images/sneak-peek.png"
            },
            propositions: [
                {
                    title: "Grakn Makes it Easy to work with Biomedical Data",
                    items: [
                        {
                            title: "Fast Ingestion and \nIntegration of Data",
                            // icon: "I'm the icon for proposition A",
                            description: "Grakn works with any type of data, wherever it comes from. Grakn’s expressive query language enables you to create your own knowledge graphs by ingesting and integrating heterogeneous heterogeneous biomedical data sets in an intuitive and flexible way."
                        },
                        {
                            title: "Contexualise Newly \nGenerated Insights",
                            // icon: "I'm the icon for proposition A",
                            description: "Your research moves much faster with Grakn because it enables you to iteratively and quickly contextualise newly generated insights in order to understand how it interact and connects with all of your other data sources ............................... ............................"
                        },
                        {
                            title: "Explain New Connections \nin Complex Networks",
                            // icon: "I'm the icon for proposition A",
                            description: "Grakn finds new connections and insights in your data through its in-built automated reasoning engine. For every insight, the knowledge graph will give you full explainability of the internal mechanics in human terms ....................................... ......................."
                        }
                    ]
                },
                {
                    title: "Why Other Databases Are Unsuitable For Biomedical Data",
                    items: [
                        {
                            title: "Too Complex to Model",
                            // icon: "I'm the icon for proposition B",
                            description: "Current modelling techniques are only based on binary relationships which makes it difficult to model complex domains. Grakn’s hyper-relational data model solves this. Using hyper-relationships, hyper-entities and type hierarchies, you will easily be able to create complex knowledge models that can evolve flexibly."
                        },
                        {
                            title: "Too Complex to Model",
                            // icon: "I'm the icon for proposition B",
                            description: "Current languages only allow you to query for explicitly stored data, making verbose queries hard to simplify. Grakn performs automated reasoning of entity and relationship types to perform real-time inference of implicit facts and associations during runtime of OLTP queries. This allows the discovery of ........................."
                        },
                        {
                            title: "Too Expensive Analytics",
                            // icon: "I'm the icon for proposition B",
                            description: "Automated distributed algorithms (BSP) are expensive and not reusable between data models. Grakn makes big data frameworks easy to use, so you don’t have to worry about the underlying distributed system. Just use Grakn’s analytical methods that come as part of the language ..................."
                        }
                    ]
                }
            ],
            testimonials: [
                {
                    image: "src/pages/landingpage/Biomed/images/testimonial_lifebit.png",
                    description: "Description for the Lifebit case study.",
                    actions: [
                        {
                            title: "Download Case Study",
                            form: {
                                title: "Download Case Study of Lifebit",
                                downloadPath: "src/pages/landingpage/Biomed/downloads/Case-study-Lifebit.pdf"
                            }
                        }
                    ]
                },
                {
                    image: "src/pages/landingpage/Biomed/images/testimonial_ust.png",
                    description: "Description for the UST case study.",
                    actions: [
                        {
                            title: "Download Case Study",
                            form: {
                                title: "Download Case Study of UST",
                                downloadPath: "src/pages/landingpage/Biomed/downloads/Case-study-UST.pdf"
                            }
                        }
                    ]
                },
                {
                    image: "src/pages/landingpage/Biomed/images/testimonial_infosys.png",
                    description: "Description for the InfoSys case study.",
                    actions: [
                        {
                            title: "Download Case Study",
                            form: {
                                title: "Download Case Study of InfoSys",
                                downloadPath: "src/pages/landingpage/Biomed/downloads/Case-study-Infosys.pdf"
                            }
                        }
                    ]
                },
            ],
            footer: {
                headline: "Accelarate  Your Biomedical Research With Grakn",
                // subHeadline: "I'm sub-headline",
                actions: [
                    {
                        title: "Download BioGrakn",
                        url: "https://github.com/graknlabs/biograkn/tree/master",
                        isPrimary: true
                    },
                    {
                        title: "Download White Paper",
                        form: {
                            title: "Download BioGrakn White Paper",
                            downloadPath: "src/pages/landingpage/Biomed/downloads/Grakn-Intro-in-Biotech.pdf",
                        }
                    }
                ]
            }
        };

        return <LandingPage data={factoryData} LeadCaptureForm={LeadCaptureForm} />;
    }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BiomedLandingPage);