import * as React from "react";
import { connect } from 'react-redux';
import LandingPage from "../../../factories/landingPage";
import LeadCaptureForm from "../LeadCaptureForm";
import TrackedPage from "../../TrackedPage";

class MachineLearningLandingPage extends React.Component {
    render() {
        const factoryData = {
            pageInfo: {
                title: "Machine Learning",
                url: "https://grakn.ai/machine-learning",
            },
            header: {
                headline: "Machine Learning for Knowledge Graphs",
                // subHeadline: "I'm sub-headline",
                actions: [
                    {
                        title: "Install kglib for free",
                        url: "https://github.com/graknlabs/kglib",
                        isPrimary: true
                    }
                ]
            },
            briefCopy: {
                title: "Make Predictions Using Knowledge Graph Convolutional Networks (KGCNs)",
                description: "Grakn’s kglib is the home of the latest ML techniques for knowledge graph completion, which combines logical reasoning with machine learning. Build learners to detect new connections, classify nodes, and interface to other ML pipelines using Knowledge Graph Convolutional Networks. Our ready-to-use framework gives you machine learning functionality over your Grakn database with our Python library.",
                action: {
                    title: "Download White Paper",
                    form: {
                        title: "Download KGCN White Paper",
                        downloadPath: "src/pages/landingpages/downloads/Knowledge-Graph-Convolutional-Networks.pdf"
                    }
                },
                videoUrl: "https://www.youtube.com/embed/JlcGfwb6CDE"
            },
            sneakPeek: {
                title: "Build Embeddings or Make Predictions",
                url: "src/pages/landingpages/MachineLearning/images/sneak-peek.png"
            },
            propositions: [
                {
                    title: "KGCNs Make Predictions over Grakn",
                    items: [
                        {
                            title: "Data Agnostic",
                            // icon: "I'm the icon for proposition A",
                            description: "KGCNs have a generic method with a simple network architecture. You can quickly use this to learn over any kind of data stored in Grakn. It is no longer necessary to build a new network for each use case."
                        },
                        {
                            title: "Customisable Objective",
                            // icon: "I'm the icon for proposition A",
                            description: "KGCNs have been designed to be tailored to your needs. The TensorFlow pipeline can be customised to optimise for any objective. Directly build models for the tasks you want to perform."
                        },
                        {
                            title: "Learning with Reasoning",
                            // icon: "I'm the icon for proposition A",
                            description: "KGCNs use Grakn’s built-in reasoner, combined with a neural network to predict new elements in a knowledge graph. Find new attributes, discover new relations, or build generic embeddings of Grakn Concepts."
                        }
                    ]
                },
                {
                    title: "Why Other Databases Are Insufficient for Machine Learning",
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
            footer: {
                headline: "Start learning over your Grakn knowledge graph",
                // subHeadline: "I'm sub-headline",
                actions: [
                    {
                        title: "Install kglib",
                        url: "https://github.com/graknlabs/kglib",
                        isPrimary: true
                    },
                    {
                        title: "Download White Paper",
                        form: {
                            title: "Download KGCN White Paper",
                            downloadPath: "src/pages/landingpages/downloads/Knowledge-Graph-Convolutional-Networks.pdf"
                        }
                    }
                ]
            }
        };

        return (
            <TrackedPage pageTitle="Machine Learning">
               <LandingPage data={factoryData} LeadCaptureForm={LeadCaptureForm} hubspotFormId="a1fc9340-6621-46e0-b0d0-1d5349eb1bbf" />
            </TrackedPage>
        )
    }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MachineLearningLandingPage);
