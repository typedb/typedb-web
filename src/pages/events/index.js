import * as yup from "yup";

const tags = {
  analytics: "#analytics",
  devtools: "#devtools",
  expertsystem: "#expertsystem",
  finance: "#finance",
  grakndev: "#grakndev",
  iot: "#iot",
  lifesciences: "#life-sciences",
  ml: "#ml",
  nlp: "#nlp",
  robotics: "#robotics",
  security: "#security",
  telecom: "#telecom",
  graql: "#graql",
  masterdatamgmt: "#master-data-management",
  customer360: "customer 360",
  antimoneylaundering: "#anti-money-laundering",
  comparison: "#comparison",
  rdf: "#rdf",
  lpg: "#labeled-property-graph"
};

const types = {
  webinar: "webinar",
};

const speakers = {
  tomasSabat: {
    fullName: "Tomás Sabat",
    imageUrl: "src/pages/events/images/speaker-tomas-sabat.jpeg",
    bio:
      "Tomás is the Chief Operating Officer at Grakn Labs, dedicated to building a distributed Knowledge Graph for intelligent systems. He works directly with Grakn's open source and enterprise users so they can fulfil their potential with Grakn and change the world. He focuses mainly in finance, life sciences and robotics.",
  },
  jamesFletcher: {
    fullName: "James Fletcher",
    imageUrl: "src/pages/events/images/speaker-james-fletcher.jpeg",
    bio:
      "James is the Principal Scientist at Grakn, primarily working on educating the world on how to use a knowledge graph such as Grakn to build cognitive/intelligent systems. For this, he is implementing examples as templates and ideas for how clients and community members can innovative in their own specific projects. With a background in Computer Vision, having co-founded his own startup in veterinary diagnostics, James's priority is to research the new kinds of intelligent systems that are enabled by using Grakn as a knowledge graph.",
  },
  KonradMysliwiec: {
    fullName: "Konrad Mysliwiec",
    imageUrl: "",
    bio:
      "Konrad is a senior engineer at GSK and has been in the Grakn Community for some time now. His contributions to the BioGrakn Covid project are focused on expanding the datasets and providing domain knowledge for the schema/model."
  },
  KimWager: {
    fullName: "Kim Wager",
    imageUrl: "src/pages/events/images/speaker-kim-wager.jpeg",
    bio:
      "Kim is a Communications Consultant at Oxford PharmaGenesis. Following on from his academic career, he is focused on rare diseases, particularly lysosomal storage disorders."
  },
  };

const eventsData = [
  {
    title: "Introduction to Knowledge Graphs with Grakn and Graql",
    path: "/introtograkn",
    rsvpUrl: "https://zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
    tags: [tags.graql, tags.grakndev],
    type: types.webinar,
    description: `Cognitive/AI systems process knowledge that is far too complex for current databases. They require an expressive data model and an intelligent query language to perform knowledge engineering over complex datasets.

    In this talk, we will discuss how Grakn, a database to organise complex networks of data and make it queryable, provides the knowledge graph foundation for intelligent systems to manage complex data.
    
    We will discuss how Graql, Grakn's reasoning (through OLTP) and analytics (through OLAP) query language, provides the tools required to do the job: a knowledge schema, a logical inference language, a distributed analytics framework.
    
    And finally, we will discuss how Graql’s language serves as unified data representation of data for cognitive systems.`,
    imageUrl: "src/pages/events/images/event-intro-to-kg.jpeg",
    slots: [
      {
        date: new Date("August 27 2020 18:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
      {
        date: new Date("September 10 2020 18:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
      {
        date: new Date("September 24 2020 18:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
      {
        date: new Date("October 8 2020 18:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
      {
        date: new Date("October 22 2020 18:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
      {
        date: new Date("November 05 2020 18:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
      {
        date: new Date("November 19 2020 16:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
      {
        date: new Date("December 03 2020 16:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
      {
        date: new Date("December 17 2020 16:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
      {
        date: new Date("January 07 2021 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
      {
        date: new Date("January 21 2021 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
      {
        date: new Date("February 04 2021 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
      {
        date: new Date("February 18 2021 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
    ],
    speaker: speakers.tomasSabat
  },

  {
    title: "How can we complete a Knowledge Graph?",
    path: "/webinar-kgcn",
    rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_DPpCGTP5Q7ex0kciaSvV7Q",
    tags: [tags.ml, tags.grakndev, tags.graql],
    type: types.webinar,
    description: `A Knowledge Graph is as valuable as the insights we can derive from it. So, what do we do when our Knowledge Graph doesn’t contain the answers? We need to complete it.

    We know that Grakn’s logical reasoner can help us to deduce insights. However, when our answers can’t be deduced we need to turn to statistical methods to infer new facts - making predictions inductively, by example. This could be relations, attributes or even rules.
    
    In this talk, we will delve into the advanced graph learning systems that we can construct and use on top of Grakn to create intelligent systems. This is the core of the research that we conduct at Grakn Labs - all of which is made available in KGLIB.`,
    imageUrl: "src/pages/events/images/event-kgcn.jpg",
    slots: [
      {
        date: new Date("September 09 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_DPpCGTP5Q7ex0kciaSvV7Q",
      },
      {
        date: new Date("October 05 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_XMoe9MA9QyOPtblokyGO0A",
      },
      {
        date: new Date("November 23 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_uZMOU3k-TwuUJtKaHOWj5w",
      },
      {
        date: new Date("January 12 2021 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_hHpo4qsoRdawbTL9yHrKOA",
      },
    ],
    speaker: speakers.jamesFletcher
  },

  {
    title: "Beyond Text Mining - Text Mined Knowledge Graphs",
    path: "/webinar-textmining",
    rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_OLshO8mwQLazlwxvO7Lbkg",
    tags: [tags.grakndev, tags.nlp, tags.graql],
    type: types.webinar,
    description: `Text is the medium used to store the tremendous wealth of scientific knowledge regarding the world we live in. However, with its ever-increasing magnitude and throughput, analysing this unstructured data has become a tedious task. This has led to the rise of Natural Language Processing (NLP), as the go-to for examining and processing large amounts of natural language data.

    This involves the automatic extraction of structured semantic information from unstructured machine-readable text. The identification of these explicit concepts and relationships help in discovering multiple insights contained in text in a scalable and effective way.
    
    A major challenge is the mapping of unstructured information from raw texts into entities, relationships and attributes in the knowledge graph. In this talk, we demonstrate how Grakn can be used to create a text mining knowledge graph capable of modelling, storing, and exploring beneficial information extracted from medical literature.`,
    imageUrl: "src/pages/events/images/event-text-mining.png",
    slots: [
      {
        date: new Date("August 25 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_OLshO8mwQLazlwxvO7Lbkg",
      },
      {
        date: new Date("September 15 2020 18:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_KLOdSPQLS4Wz46yYnRi89w",
      },
      {
        date: new Date("October 6 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_wGt2gKbBRhi8MJfE6G5G4A"
      },
      {
        date: new Date("November 4 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_jELKOqj0QcKg8JrZuXUAlQ"
      },
      {
        date: new Date("January 13 2021 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_FLHd9D0yTuO4P8jNtqUFgA"
      },
    ],
    speaker: speakers.tomasSabat
  },

  {
    title: "Drug Discovery with Grakn",
    path: "/webinar-drugdiscovery",
    rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_F_eqlc7qR5KjXBDrmUetkg",
    tags: [tags.grakndev, tags.nlp, tags.lifesciences],
    type: types.webinar,
    description: `Combinatorial chemistry has produced a huge amount of chemical libraries and data banks which include prospective drugs. Despite all of this progress, the fundamental problem still remains: how do we take advantage of this data to identify the prospective nature of a compound as a vital drug? Traditional methodologies fail to provide a solution to this.

    Knowledge graphs, however, provide the framework which can make drug discovery much more efficient, effective and approachable. This radical advancement in technology can model biological knowledge complexity as it is found at its core. With concepts such as hyper relationships, type hierarchies, automated reasoning and analytics we can finally model, represent, and query biological knowledge at an unprecedented scale.`,
    imageUrl: "src/pages/events/images/event-drug-discovery.png",
    slots: [
      {
        date: new Date("September 22 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_6HjsvIdkRNecHhosb4veUg",
      },
      {
        date: new Date("October 7 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_F_eqlc7qR5KjXBDrmUetkg",
      },
      {
        date: new Date("November 9 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_RN_t7I-RQiSqZ7-IH6Xrmw",
      },
      {
        date: new Date("January 14 2021 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_1fd2-u6SQeG_u_f0dH_GVA"
      },
    ],
    speaker: speakers.tomasSabat
  },

  {
    title: "Introducing a Covid-19 Knowledge Graph | BioGrakn",
    path: "/webinar-biograkn",
    rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_b-Qs0KsEQlChwVJLaAVvqw",
    tags: [tags.grakndev, tags.nlp, tags.lifesciences],
    type: types.webinar,
    description: `In partnership with our community members, Konrad Mysliwiec - Sr. Engineer GSK - and Kim Wager - Oxford Pharmagenosis - we’re excited to release an open source knowledge graph to speed up the research into Covid-19. 
    
    Our goal is to provide a way for researchers to easily analyse and query large amounts of data and papers related to the virus.

    BioGrakn Covid makes it easy to quickly trace information sources and identify articles and the information therein. This first release includes entities extracted from Covid-19 papers, and from additional datasets including, proteins, genes, disease-gene associations, coronavirus proteins, protein expression, biological pathways, and drugs.`,
    imageUrl: "src/pages/events/images/event-drug-discovery.png",
    slots: [
      {
        date: new Date("September 03 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_b-Qs0KsEQlChwVJLaAVvqw",
      },
      {
        date: new Date("January 19 2021 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_0UPL8HpaQCyZmZaAiujBrg"
      },
    ],
    speaker: speakers.tomasSabat
  },

  {
    title: "Comparing SQL to Graql",
    path: "/webinar-sql-to-graql",
    rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_OTB-9fQQTRGJJHSsjXr9ZA",
    tags: [tags.grakndev, tags.graql, tags.comparison],
    type: types.webinar,
    description: `Using SQL to query relational databases is easy. As a declarative language, it’s straightforward to write queries and build powerful applications. However, relational databases struggle when working with complex data. When querying such data in SQL, challenges especially arise in the modelling and querying of the data.

    For example, due to the large number of necessary JOINs, it forces us to write long and verbose queries. Such queries are difficult to write and prone to mistakes.
    
    Graql is the query language used in Grakn. Just as SQL is the standard query language in relational databases, Graql is Grakn’s query language. It’s a declarative language, and allows us to model, query and reason over our data.
    
    In this talk, we will look at how Graql compares to SQL. Why and when should you use Graql over SQL? How do we do outer/inner joins in Graql? We'll look at the common concepts, but mostly talk about the differences between the two.`,
    imageUrl: "src/pages/events/images/event-sql.jpeg",
    slots: [
      {
        date: new Date("September 1 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_OTB-9fQQTRGJJHSsjXr9ZA",
      },
      {
        date: new Date("September 29th 2020 18:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_-RENGqLjTZij9KZIeAkRNw",
      },
      {
        date: new Date("October 15 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_g3pGCdEmS1OgdMd7ov66QQ",
      },
      {
        date: new Date("November 17 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_axly5fllS9WBVwbE47QQ0g"
      },
      {
        date: new Date("December 15 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_DksK519RQ1CJxMqfxgLWJA"
      },
    ],
    speaker: speakers.tomasSabat
  },

  {
    title: "Knowledge Graphs for Financial Services",
    path: "/webinar-financial-services",
    rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_0baUrwvmQMawQxAmNsKjQA",
    tags: [tags.finance, tags.masterdatamgmt,tags.customer360],
    type: types.webinar,
    description: `Covid has had a massive impact on the financial services industry. Existing changes in technology, regulation, and geopolitics are radically changing the data landscape. Faced with this environment, financial services firms can take full strategic advantage of the most cutting-edge data infrastructure technologies to thrive in these unprecedented times.

    In this talk, we’ll explore how Grakn can be used to make the most of current challenges. We’ll explore how to unite data silos into a federated model and analyse data across an enterprise in real time, enabling use cases such as customer 360, risk & compliance and anti money laundering.`,
    imageUrl: "src/pages/events/images/event-fin-serve.png",
    slots: [
      {
        date: new Date("August 26 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_0baUrwvmQMawQxAmNsKjQA",
      },
      {
        date: new Date("September 8 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_ycjZdfI-TKeH_YbM-PPokQ",
      },
      {
        date: new Date("September 30 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_jGwW9YaJQKyRNL1e6A216g",
      },
      {
        date: new Date("October 14 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_d8GoWQmJSbuffzQe3p4TVw"
      },
      {
        date: new Date("November 3 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_X46h0o3RRtuyrgzgcUdDrg"
      },
    ],
    speaker: speakers.tomasSabat
  },
  {
    title: "Comparing Semantic Web Technologies with Grakn",
    path: "/webinar-rdf-to-grakn",
    rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_HY6mMf9PQ3CcH1Zy41W41g",
    tags: [tags.comparison, tags.grakndev, tags.rdf],
    type: types.webinar,
    description: `Semantic Web technologies enable us to represent and query for very complex and heterogeneous datasets. We can add semantics and reason over large bodies of data on the web. However, despite a lot of educational material available, they have failed to achieve mass adoption outside academia.

    Grakn works at a higher level of abstraction and enables developers to be more productive when working with complex data. Grakn is easier to learn, reducing the barrier to entry and enabling more developers to access semantic technologies. Instead of using a myriad of standards and technologies, we just use one language - Graql.
    
    In this talk:
    - we will look at how Graql compares to Semantic Web standards, specifically RDF, SPARQL RDFS, OWL and SHACL.
    - cover questions such as, how do we represent hyper-relations in Grakn? How to use rdfs:domain and rdfs:range in Grakn? And how do the modelling philosophies compare?`,
    imageUrl: "src/pages/events/images/event-rdf.jpg",
    slots: [
      {
        date: new Date("September 02 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_HY6mMf9PQ3CcH1Zy41W41g",
      },
      {
        date: new Date("September 23 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_6hd7u1ZtQ-aGu6TDu6_UTA",
      },
      {
        date: new Date("October 13 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_riravNSBQhCjLSdeoD-lQg",
      },
      {
        date: new Date("November 18 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_GMFHykrYTFig36MFskZvhA"
      },
      {
        date: new Date("December 14 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_WB4WAUOqQb-bEO59uJm1Qw"
      },
    ],
    speaker: speakers.tomasSabat
  },
  {
    title: "Comparing Labeled Property Graphs to Grakn",
    path: "/webinar-grakn-vs-graph-database",
    rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_ZHx3v4ZKQHmhk-WYEMNjtA",
    tags: [tags.comparison, tags.grakndev, tags.lpg],
    type: types.webinar,
    description: `Graph databases have matured into mainstream technologies and deliver tremendous value to organisations across any industry. They are more flexible than traditional relational databases as they enable us to leverage the relationships in our data in a way relational databases cannot do. In the time of AI and Big Data, this creates opportunities for any organisation. However, developing with graph databases requires us to overcome plenty of challenges when it comes to data modelling, maintaining consistency of our data among others. 
    
    In this talk, we discuss how Grakn compares to labelled property graphs, and how it addresses these challenges. While both technologies share similarities, they are fundamentally different. We'll cover how to read & write data, how to model complex domains and we'll also look at Grakn's ability to perform machine reasoning at scale.`,
    imageUrl: "src/pages/events/images/event-sql.jpeg",
    slots: [
      {
        date: new Date("December 16 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_ZHx3v4ZKQHmhk-WYEMNjtA",
      },
    ],
    speaker: speakers.tomasSabat
  },
];

const eventSchema = yup.object({
  title: yup.string().required(),
  path: yup.string().matches(new RegExp("^/.*")).required(),
  rsvpUrl: yup.string().required(),
  tags: yup.array().of(yup.string()),
  type: yup.string().oneOf(Object.values(types)).required(),
  description: yup.string().required(),
  imageUrl: yup.string().required(),
  slots: yup.array().min(1).of(yup.object({
      date: yup.mixed().required(),
      rsvpUrl: yup.string().required()
  })),
  speaker: yup.object({
    fullName: yup.string().required(),
    imageUrl: yup.string().required(),
    bio: yup.string(),
  }),
});

eventsData.forEach((event) =>
  eventSchema.validate(event).catch((error) => {
    alert("Validation error in event data. check the console for more details");
    console.error("validation error: ", error);
    console.error("invalid event object: ", event);
  })
);

export default eventsData;
