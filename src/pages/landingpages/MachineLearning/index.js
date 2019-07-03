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
                        title: "Install kglib",
                        url: "https://github.com/graknlabs/kglib",
                        isPrimary: true
                    }
                ]
            },
            briefCopy: {
                title: "Make Predictions using Knowledge Graph Convolutional Networks (KGCNs)",
                description: "GRAKN’s kglib is the home of the latest ML techniques for knowledge graph completion, which combines logical reasoning with machine learning. Build learners to detect new connections, classify nodes, and interface to other ML pipelines using Knowledge Graph Convolutional Networks. Our ready-to-use framework gives you machine learning functionality over your GRAKN database with our Python library. All provided under an open-source Apache licence.",
                action: {
                    title: "Download White Paper",
                    form: {
                        title: "Download KGCN White Paper",
                        downloadPath: "src/pages/landingpages/downloads/Knowledge-Graph-Convolutional-Networks.pdf"
                    }
                },
                videoUrl: "https://www.youtube.com/watch?v=JlcGfwb6CDE"
            },
            sneakPeek: {
                title: "Build Embeddings or Make Predictions",
                url: "src/pages/landingpages/MachineLearning/images/sneak-peek.png"
            },
            propositions: [
                {
                    title: "KGCNs make predictions over GRAKN",
                    items: [
                        {
                            title: "Data Agnostic",
                            // icon: "I'm the icon for proposition A",
                            description: "KGCNs have a generic method with simple network architecture. You can quickly use this to learn over any kind of data stored in GRAKN."
                        },
                        {
                            title: "Customisable Objective",
                            // icon: "I'm the icon for proposition A",
                            description: "KGCNs have been designed to be tailored to your needs. The TensorFlow pipeline can be customised to optimise for any objective. Directly build models for the tasks you want to perform."
                        },
                        {
                            title: "Combine Learning and Reasoning",
                            // icon: "I'm the icon for proposition A",
                            description: "KGCNs use GRAKN’s built-in reasoner, combined with a neural network to predict new elements in a knowledge graph. Find new attributes, discover new relations, or build generic embeddings of GRAKN Concepts."
                        }
                    ]
                },
            ],
            footer: {
                headline: "Start learning over you knowledge graph",
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
               <LandingPage data={factoryData} LeadCaptureForm={LeadCaptureForm} hubspotFormId="TODO add this" />
            </TrackedPage>
        )
    }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MachineLearningLandingPage);
