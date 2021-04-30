import { homePageStyles } from "./home-styles";
import React from "react";
import clsx from "clsx";
import HighAvailabilityIcon from "../assets/icons/high-availability-icon.svg";
import ElasticThroughputIcon from "../assets/icons/elastic-throughput-icon.svg";
import FingerprintIcon from "../assets/icons/fingerprint-icon.svg";
import EnterpriseSupportIcon from "../assets/icons/enterprise-support-icon.svg";
import ClusterManagementIcon from "../assets/icons/cluster-management-icon.svg";
import BackupAndRecoveryIcon from "../assets/icons/backup-and-recovery-icon.svg";
import { VaticleButton } from "../common/ui/button/button";
import { commonStyles } from "../common/ui/common-styles";

export interface ClusterSectionProps {
    className?: string;
}

interface ClusterFeature {
    name: string;
    description: string;
    icon: React.FC;
    linkTo?: string;
    comingSoon?: true;
}

export const ClusterSection: React.FC<ClusterSectionProps> = ({className}) => {
    const classes = Object.assign({}, commonStyles(), homePageStyles());

    const allFeatures: ClusterFeature[] = [{
        name: "High Availability",
        description: "Replicate your data across multiple servers while maintaining transactional behaviour and up-time.",
        icon: HighAvailabilityIcon,
    }, {
        name: "Elastic Throughput",
        description: "Read and write throughput scales linearly as new machines are added to the TypeDB Cluster.",
        icon: ElasticThroughputIcon,
    }, {
        name: "Secure Authentication",
        description: "Ensuring only authenticated access and appropriately privileged users are allowed to access the database.",
        icon: FingerprintIcon,
    }, {
        name: "Enterprise Support",
        description: "Access to advance support SLA with faster response time and problem resolution.",
        icon: EnterpriseSupportIcon,
    }, {
        name: "Cluster Management",
        description: "Easily deploy and scale up/down your database with tools that automate the orchestration of your cluster.",
        icon: ClusterManagementIcon,
        comingSoon: true,
    }, {
        name: "Backup and Recovery",
        description: "Protect your database from data loss through automatic periodic backups and reconstruction tools.",
        icon: BackupAndRecoveryIcon,
        comingSoon: true,
    }];

    return (
        <section className={className}>
            <h1 className={classes.h1}>Scale your database with Vaticle TypeDB Cluster</h1>
            <p className={classes.largeText}>
                Vaticle TypeDB Cluster is the distributed database designed to scale with your enterprise. Whether
                you have a growing dataset, application workload, or user request, TypeDB Cluster will provide the
                tools you need to take you from development to production and scale.
            </p>

            <div className={clsx(classes.featurePanelList, classes.sectionMarginSmall)}>
                {allFeatures.map(({name, description, icon, comingSoon}) => (
                    <a className={classes.featurePanel}>
                        {comingSoon && <div className={classes.featurePanelBanner}>coming soon</div>}
                        {React.createElement(icon)}
                        <h3 className={clsx(classes.h3, classes.textMarginLarge)}>{name}</h3>
                        <p className={clsx(classes.mediumText, classes.textMarginSmall)}>{description}</p>
                    </a>
                ))}
            </div>

            <div className={clsx(classes.mainActionList, classes.sectionMarginSmall)}>
                <VaticleButton size="small" type="secondary">Learn More</VaticleButton>
                <VaticleButton size="small" type="primary" to="/cloud">Cloud Deployment</VaticleButton>
            </div>
        </section>
    );
}
