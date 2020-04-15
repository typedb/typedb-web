import * as React from "react";

import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";
// import SlackPage from 'pages/SlackPage';
import CareersPage from "pages/CareersPage";
import CommunityPage from "pages/CommunityPage";
import ServicesPage from "pages/ServicesPage";
import SupportPage from "pages/SupportPage";
import GraknPage from "pages/GraknPage";
import DeploymentPage from "pages/DeploymentPage";
import KGMSPage from "pages/KGMSPage";
import LifeSciencesLandingPage from "pages/landingpages/LifeSciences";
import PrecisionMedicineLandingPage from "pages/landingpages/PrecisionMedicine";
import TextMiningLandingPage from "pages/landingpages/TextMining";
import DrugDiscoveryLandingPage from "pages/landingpages/DrugDiscovery";
import MachineLearningLandingPage from "pages/landingpages/MachineLearning";

import {
  FinanceUseCasePage,
  HealthUseCasePage,
  SemanticUseCasePage,
  BotsUseCasePage,
  SecurityUseCasePage,
} from "pages/UseCasePages";
import DownloadCentrePage from "pages/DownloadCentrePage";
import PrivacyPolicyPage from "pages/PrivacyPolicyPage";

import EventPage from "./factories/eventPage";
import eventsData from './pages/events';

const routes = [
    {
      path: "/",
      component: HomePage,
      exact: true,
    },
    {
      path: "/about",
      component: AboutPage,
      exact: true,
    },
    {
      path: "/careers",
      component: CareersPage,
      exact: true,
    },
    {
      path: "/community",
      component: CommunityPage,
      exact: true,
    },
    {
      path: "/services",
      component: ServicesPage,
      exact: true,
    },
    {
      path: "/deployment",
      component: DeploymentPage,
      exact: true,
    },
    {
      path: "/support",
      component: SupportPage,
      exact: true,
    },
    {
      path: "/download",
      component: DownloadCentrePage,
      exact: true,
    },
    {
      path: "/grakn-core",
      component: GraknPage,
      exact: true,
    },
    {
      path: "/grakn-kgms",
      component: KGMSPage,
      exact: true,
    },
    {
      path: "/lifesciences",
      component: LifeSciencesLandingPage,
      exact: true,
    },
    {
      path: "/precision-medicine",
      component: PrecisionMedicineLandingPage,
      exact: true,
    },
    {
      path: "/text-mining",
      component: TextMiningLandingPage,
      exact: true,
    },
    {
      path: "/drug-discovery",
      component: DrugDiscoveryLandingPage,
      exact: true,
    },
    {
      path: "/machine-learning",
      component: MachineLearningLandingPage,
      exact: true,
    },
    {
      path: "/usecase-finance",
      component: FinanceUseCasePage,
      exact: true,
    },
    {
      path: "/usecase-health",
      component: HealthUseCasePage,
      exact: true,
    },
    {
      path: "/usecase-bots",
      component: BotsUseCasePage,
      exact: true,
    },
    {
      path: "/usecase-search",
      component: SemanticUseCasePage,
      exact: true,
    },
    {
      path: "/usecase-security",
      component: SecurityUseCasePage,
      exact: true,
    },
    {
      path: "/privacy-policy",
      component: PrivacyPolicyPage,
      exact: true,
    },
];

// dynamicall create route objects for events
const eventRoutes = eventsData.map((event) => {
  return {
    path: event.path,
    component: () => <EventPage event={event} allEvents={eventsData} />,
    exact: true,
  };
});

routes.push(...eventRoutes);

export default routes;
