import React, { Component } from 'react';
import UseCase from 'templates/UseCase';

export const FinanceUseCasePage = () => (
  <UseCase
    title="Financial Services"
    text="Across the financial service industry, changes in technology, policy, and geopolitics have radically altered the data landscape in the past few years. By taking advantage of the most cutting-edge data infrastructure technologies, financial service firms can take full strategic advantage of the changing data landscape.<br /> <br />Grakn provides the ideal technical solution to model all the complex, hyper-relationships that characterise contemporary markets, allowing firms to power cutting-edge financial service applications.  From automating insurance claims and pricing premiums optimally, to regulatory compliance in investment activity and fraud detection, Grakn’s distributed knowledge graph and powerful, built-in analytics can keep financial service firms savvy and competitive."
    img="/assets/svg/usecase-finance.svg"
  />
);

export const HealthUseCasePage = () => (
  <UseCase 
    title="Health and Life Science"
    text="From pharmaceutical R&D and biomedical research to frontline healthcare delivery, the contemporary health and life science industries rely on data to power insight and improve care. Yet, despite advances in scientific knowledge and healthcare technologies, effective use of data remains a challenge.<br/> <br/> By providing the data infrastructure necessary to model the complexity and contextual depth of growing bodies of biomedical understanding, as well as of individual patient information, Grakn can power state-of-the-art tools to improve lives. From advanced drug discovery to personalized medical diagnostics, Grakn ensures that data are meaningfully interconnected and that significant patterns and relationships do not go unnoticed."
    img="/assets/svg/usecase-health.svg"
  />
);

export const SemanticUseCasePage = () => (
  <UseCase
    title="Semantic Search"
    text="With ever more massive volumes of stored data, it becomes increasingly difficult for organizations to effectively search for relevant results. By using a search platform that understands a query’s intent and the meaning of its terms, data’s meaning can be unlocked, and organizations can free themselves from the burden of ineffective search.<br /> <br />This is true everywhere from contextualized and comprehensive searching for relevant linkages in legal and medical contexts, to robust exploration of large, heterogeneous, multi-source data sets in academic and government research contexts. Grakn’s distributed knowledge graph provides the database technology needed for developing sophisticated semantic search applications. "
    img="/assets/svg/usecase-semantic.svg"
  />
);

export const BotsUseCasePage = () => (
  <UseCase
    title="Intelligent Bots"
    text="With recent advances in natural language processing technology, intelligent chat bots are beginning to revolutionise industries as diverse as retail, banking, and travel, along with many more. Yet, in order to deliver their full potential, chatbots must be able to efficiently and accurately contextualise user queries, and therefore must possess real knowledge in their conversational interactions. <br /> <br />Grakn provides exactly the kind of databases needed to manage the complex datasets of knowledge-oriented systems like chatbots. By using its pioneering distributed knowledge graph as a backend, developers will be able to build chatbots that readily disambiguate queries, retrieve context-specific knowledge, and generate the most useful possible responses for each user."
    img="/assets/svg/usecase-bots.svg"
  />
);

export const SecurityUseCasePage = () => (
  <UseCase
    title="Security"
    text="As technology permeates deeper into every aspect of our lives—with constant digital footprints and interconnected devices proliferating—the growth in potential damage and disruption from bad actors grows. Both individuals and firms must leverage their digital defences against an onslaught of increasingly sophisticated and globalized fraudsters. <br /> <br />To keep vulnerabilities limited and criminal activities at bay, systems must possess the most contextually precise and useful knowledge available. Grakn is built specifically for the knowledge-intensive tasks needed by contemporary security systems, from network monitoring and forensic analytics to more high-level defensive surveillance. "
    img="/assets/svg/usecase-security.svg"
  />
);
