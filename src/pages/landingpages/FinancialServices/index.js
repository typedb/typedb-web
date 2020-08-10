import * as React from "react";
import { connect } from 'react-redux';
import LandingPage from "../../../factories/landingPage";
import LeadCaptureForm from "../LeadCaptureForm";
import TrackedPage from "../../TrackedPage";

class FinancialServicesLandingPage extends React.Component {
    render() {
        const factoryData = {
            pageInfo: {
                title: "Financial Services",
                url: "https://grakn.ai/financial-services",
            },
            header: {
                headline: "Knowledge Graphs for Financial Services",
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
                title: "Master Data Management | Customer 360",
                description: "Grakn serves as the database to represent all of an enterprise's disparate data sources, enabling and empowering employees to capture more insights from the data at their disposal. Grakn makes it possible to build an enterprise Master Data Management system with true Customer 360 views. ",
                action: {
                    title: "Download White Paper",
                    form: {
                        title: "Download Master Data Management White Paper",
                        downloadPath: "src/pages/landingpages/downloads/Financial-Services-MDM.pdf"
                    }
                },
                videoUrl: "https://www.youtube.com/embed/cVjjnquz4-o" 
            },
            sneakPeek: {
                title: "Discover and Explain New Connections in Complex Networks of Data",
                url: "src/pages/landingpages/FinancialServices/images/sneak-peek.png"
            },
            propositions: [
                {
                    title: "Achieve a true 360 view across your organisation's data with Grakn",
                    items: [
                        {
                            title: "Unify all your organisation's master data in one place",
                            // icon: "I'm the icon for proposition A",
                            description: "A Master Data Management System built with Grakn enables a 360 view of all master data, giving enterprises esessential access and context from departments and their internal applications. Cross domain access and this context is invaluable when making decisions about customers. Moreover, in today's world, personalisation is an expectation not a option."
                        },
                        {
                            title: "Generate insights, discover new revenue streams",
                            // icon: "I'm the icon for proposition A",
                            description: "Using Grakn's reasoning engine we can ask for product recommendations; and Grakn will infer them based on what we know about the customer. It gets exciting when you add accounts, previous transactions or a subsidiary's data. You begin to recommend products that add real value to the customer, building trust and ultimately increasing customer lifetime value."
                        },
                        {
                            title: "Breakdown data silos and reduce operational cost",
                            // icon: "I'm the icon for proposition A",
                            description: "By unifiying your master data, you'll be able to generate significant operational cost savings. Gone is the need to manage duplicate data sources, third party data that you may be using. Data cleanup costs, internal or outsourced, are reduced with one database. Information delivery, resources spent requesting, processing, etc, all reduced via a master data management system."
                        }
                    ]
                },
                {
                    title: "Why Other Databases Are Insufficient for Financial Services",
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
                            title: "Download Master Data Management White Paper",
                            downloadPath: "src/pages/landingpages/downloads/Financial-Services-MDM.pdf"
                        }
                    }
                ]
            }
        };

        return (
            <TrackedPage pageTitle="Financial Services">
               <LandingPage data={factoryData} LeadCaptureForm={LeadCaptureForm} hubspotFormId="5a3f54d8-96a6-430d-ab58-e035bc01b621" />
            </TrackedPage>
        )
    }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FinancialServicesLandingPage);