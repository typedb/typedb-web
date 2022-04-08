import clsx from "clsx";
import React from "react";
import LearningAndTrainingIcon from "../../assets/icons/learning-and-training.svg";
import KnowledgeModellingIcon from "../../assets/icons/knowledge-modelling.svg";
import MigrationAndIntegrationIcon from "../../assets/icons/migration-and-integration.svg";
import ContextualiseIcon from "../../assets/icons/contextualise.svg";
import ScalingIcon from "../../assets/icons/scaling.svg";
import { VaticleButton } from "../../common/button/button";
import { ClassProps } from "../../common/class-props";
import { vaticleStyles } from "../../common/styles/vaticle-styles";
import { hashRoutes } from "../router";
import { servicesPageStyles } from "./services-styles";

interface ServiceOfferingData {
    name: string;
    icon: React.FC;
    description: string;
    features: string[];
}

const serviceOfferings: ServiceOfferingData[] = [{
    name: "Learning and Training",
    icon: LearningAndTrainingIcon,
    description: "Become a TypeDB expert in a matter of days. With trainings worldwide, learn from experienced " +
        "TypeDB engineers to go from understanding project goals and development strategy, to engineering the most " +
        "scalable knowledge graph for you, your team and your business.",
    features: [
        "Hands-on development tutorials",
        "Dedicated knowledge engineer per course",
        "From install, configure to scale",
        "Basic and advanced knowledge engineering",
    ]
}, {
    name: "Knowledge Modelling",
    icon: KnowledgeModellingIcon,
    description: "Good engineering starts with good architecture. Learn from our experienced engineers the best way " +
        "to model and architect your knowledge graph, following industry best practices. There is no domain too " +
        "complex to model in TypeDB, and we’ll help you achieve it.",
    features: [
        "Project architecture design",
        "Domain schema modelling",
        "Database schema consolidation",
        "Expert schema review",
    ]
}, {
    name: "Migration and Integration",
    icon: MigrationAndIntegrationIcon,
    description: "Migrating over from your current databases is not something to fear. The process can be smooth and " +
        "painless, and we can help you with that. We can help integrate your data streams into your new TypeDB " +
        "knowledge graph, no matter how big the throughput is.",
    features: [
        "Migrate from any database",
        "Migrate from any data lake",
        "Integrate data streams and pipeline",
    ]
}, {
    name: "Custom Development APIs",
    icon: ContextualiseIcon,
    description: "You may want to use TypeDB while developing with a specific programming language. You may want " +
        "TypeDB to output a specific data format. Or you may want to connect your system to TypeDB using specific " +
        "drivers. We can help you build these custom APIs so you can focus on building your application.",
    features: [
        "Custom response formats",
        "Programming language drivers",
        "Custom input data interfaces",
    ]
}, {
    name: "Deployment and Scaling",
    icon: ScalingIcon,
    description: "As you focus on building your application and your business, let us help you with deploying and " +
        "scaling your infrastructure. Have our experienced engineers make sure your infrastructure is state of the " +
        "art, meets all your system requirements and scales as your company grows, as you launch your business into " +
        "the future!",
    features: [
        "On-premise cluster deployment",
        "Cloud-based deployment",
        "Cluster configuration & optimisation",
    ]
}];

export const ServiceOfferingsSection: React.FC<ClassProps> = ({className}) => {
    const classes = Object.assign({}, vaticleStyles(), servicesPageStyles());

    return (
        <>
            <section className={clsx(classes.serviceOfferingsSection, className)}>
                {serviceOfferings.map(offering => <ServiceOffering {...offering}/>)}

            </section>
            <div className={clsx(classes.mainActionList, classes.contentMargin)}>
                <VaticleButton size="small" type="secondary" to={hashRoutes.contactSection}>Get in touch</VaticleButton>
            </div>
        </>
    )
}

const ServiceOffering: React.FC<ServiceOfferingData> = ({name, icon, description, features}) => {
    const classes = Object.assign({}, vaticleStyles(), servicesPageStyles());

    return (
        <div>
            <div className={classes.serviceOfferingHeader}>
                <div className={classes.serviceOfferingIconContainer}>{React.createElement(icon)}</div>
                <h4 className={classes.h4}>{name}</h4>
            </div>
            <div className={classes.serviceOfferingBody}>
                <p className={clsx(classes.serviceOfferingDescription, classes.mediumText)}>{description}</p>
                <ul className={classes.serviceOfferingFeatureList}>{features.map(feature => <ServiceOfferingFeature feature={feature}/>)}</ul>
            </div>
        </div>
    )
}

const ServiceOfferingFeature: React.FC<{feature: string}> = ({feature}) => {
    const classes = Object.assign({}, vaticleStyles(), servicesPageStyles());

    return (
        <li className={classes.serviceOfferingFeature}>
            <span className={clsx(classes.check, classes.checkGreen)}/>
            <p className={classes.mediumText}><strong>{feature}</strong></p>
        </li>
    )
}
