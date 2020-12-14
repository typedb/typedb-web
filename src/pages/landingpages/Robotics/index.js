import * as React from "react";
import { connect } from 'react-redux';
import LandingPage from "../../../factories/landingPage";
import LeadCaptureForm from "../LeadCaptureForm";
import TrackedPage from "../../TrackedPage";

class RoboticsLandingPage extends React.Component {
    render() {
        const factoryData = {
            pageInfo: {
                title: "Robotics",
                url: "https://grakn.ai/robotics",
            },
            header: {
                headline: "Knowledge Graphs for Intelligent Robotics Systems",
                // subHeadline: "I'm sub-headline",
                actions: [
                    {
                        title: "Install Grakn and give it a go",
                        url: "https://github.com/graknlabs/grakn",
                        isPrimary: true
                    }
                ]
            },
            briefCopy: {
                title: "Autonomous Robotics Systems",
                description: "A robotic system that operates autonomously in the real-world requires a realistic knowledge-structure of its operational environment that can be updated on-the-fly as the robot observes and learns new aspects of the real world. Grakn’s hypergraph model enables engineers to create such realistic knowledge-structures and provides the dynamic flexibility to instantiate known concepts or infer new ones through its automated reasoner.",
                action: {
                    title: "Download White Paper",
                    form: {
                        title: "Download Robotics White Paper",
                        downloadPath: "src/pages/landingpages/downloads/Robotics-TNO.pdf"
                    }
                },
                videoUrl: "https://www.youtube.com/embed/3oAu4_bxjAg" 
            },
            sneakPeek: {
                title: "Enabling Engineers to Build More Intelligent Robotic Systems",
                url: "src/pages/landingpages/Robotics/images/sneak-peek.png"
            },
            propositions: [
                {
                    title: " Building Robotic Systems with Real-World Understanding",
                    items: [
                        {
                            title: "Automated Reasoning to Improve Spatial Awareness",
                            // icon: "I'm the icon for proposition A",
                            description: "Grakn enables robots that operate in the real-world to map and reason over real world concepts, e.g. roads, houses, kitchens and fridges. Grakn also deals with a robot’s internal concepts such as its perception and planning modules. A robot is then able to reason about the external world and infer new facts, e.g. to locate itself on a map and plan a route in order to move itself towards a position to execute any given task."
                        },
                        {
                            title: "Flexible Schema to Increase Autonomy",
                            // icon: "I'm the icon for proposition A",
                            description: "Grakn enables robotic systems to dynamically take into account changes to its outside environment and immediately make any necessary adjustments to its own tasks and operations. This is possible as Grakn makes it easy to represent the real world in its schema. Any changes to the model can be made on the fly. Grakn becomes an embedded knowledge-structure within the robotic system."
                        },
                        {
                            title: "Enabling Machine Learning for Situational Understanding",
                            // icon: "I'm the icon for proposition A",
                            description: "Grakn’s automated reasoner is even more valuable with machine learning, allowing for inferencing with a rich situational understanding. Grakn makes it easy to accurately represent the physical world to feed into the learner. Representing any entity that exists in the real world, and all the complex roles and relations that exist between. Grakn’s enhanced ER model makes it straightforward to model any complex domain."
                        }
                    ]
                },
                {
                    title: "Why Other Databases Are Insufficient for Robotics Systems",
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
                headline: "Start your journey with Grakn",
                // subHeadline: "I'm sub-headline",
                actions: [
                    {
                        title: "Install Grakn",
                        url: "/download#core",
                        isPrimary: true
                    },
                    {
                        title: "Download White Paper",
                        form: {
                            title: "Download Robotics White Paper",
                            downloadPath: "src/pages/landingpages/downloads/Robotics-TNO.pdf"
                        }
                    }
                ]
            }
        };

        return (
            <TrackedPage pageTitle="Robotics">
               <LandingPage data={factoryData} LeadCaptureForm={LeadCaptureForm} hubspotFormId="e84ba4a8-5db6-466c-93dd-f2d4c80ea109" />
            </TrackedPage>
        )
    }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RoboticsLandingPage);
