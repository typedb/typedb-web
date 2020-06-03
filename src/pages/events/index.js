import * as yup from "yup";

const tags = {
  analytics: "#analytics",
  devtools: "#devtools",
  expertsystem: "#expertsystem",
  finance: "#finance",
  grakndev: "#grakndev",
  iot: "#iot",
  lifesciences: "#lifesciences",
  ml: "#ml",
  nlp: "#nlp",
  robotics: "#robotics",
  security: "#security",
  telecom: "#telecom",
  graql: "#graql",
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
  }
}

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
        date: new Date("June 04 2020 18:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
      {
        date: new Date("June 11 2020 18:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
      {
        date: new Date("June 18 2020 18:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
      {
        date: new Date("June 25 2020 18:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
      {
        date: new Date("July 02 2020 18:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      },
      {
        date: new Date("July 09 2020 18:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_TRNpROP-R7mG-wkf5QjHWA",
      }
    ],
    speaker: speakers.tomasSabat
  },

  {
    title: "How can we complete a Knowledge Graph?",
    path: "/webinar-kgcn",
    rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_tgNmzvOtRza3d-K7jfi4iA",
    tags: [tags.ml, tags.grakndev, tags.graql],
    type: types.webinar,
    description: `A Knowledge Graph is as valuable as the insights we can derive from it. So, what do we do when our Knowledge Graph doesn’t contain the answers? We need to complete it.

    We know that Grakn’s logical reasoner can help us to deduce insights. However, when our answers can’t be deduced we need to turn to statistical methods to infer new facts - making predictions inductively, by example. This could be relations, attributes or even rules.
    
    In this talk, we will delve into the advanced graph learning systems that we can construct and use on top of Grakn to create intelligent systems. This is the core of the research that we conduct at Grakn Labs - all of which is made available in KGLIB.`,
    imageUrl: "src/pages/events/images/event-intro-to-kg.jpeg",
    slots: [
      {
        date: new Date("June 09 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_tgNmzvOtRza3d-K7jfi4iA",
      },
      {
        date: new Date("July 15 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_UpbEswCPQlCKUCYv87HlZA",
      },
      {
        date: new Date("August 11  2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_m9ClAIFkRDiZ7tziS1fZZA",
      },
      {
        date: new Date("September 02  2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_m9ClAIFkRDiZ7tziS1fZZA",
      },
    ],
    speaker: speakers.jamesFletcher
  },

  {
    title: "Beyond Text Mining - Text Mined Knowledge Graphs",
    path: "/webinar-textmining",
    rsvpUrl: "https://zoom.us/webinar/register/WN_2Hog2n86TnuSTwcaUk8a_A",
    tags: [tags.grakndev, tags.nlp, tags.graql],
    type: types.webinar,
    description: `Text is the medium used to store the tremendous wealth of scientific knowledge regarding the world we live in. However, with its ever-increasing magnitude and throughput, analysing this unstructured data has become a tedious task. This has led to the rise of Natural Language Processing (NLP), as the go-to for examining and processing large amounts of natural language data.

    This involves the automatic extraction of structured semantic information from unstructured machine-readable text. The identification of these explicit concepts and relationships help in discovering multiple insights contained in text in a scalable and effective way.
    
    A major challenge is the mapping of unstructured information from raw texts into entities, relationships and attributes in the knowledge graph. In this talk, we demonstrate how Grakn can be used to create a text mining knowledge graph capable of modelling, storing, and exploring beneficial information extracted from medical literature.`,
    imageUrl: "src/pages/events/images/event-intro-to-kg.jpeg",
    slots: [
      {
        date: new Date("June 10 2020 12:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_2Hog2n86TnuSTwcaUk8a_A",
      },
      {
        date: new Date("July 21 2020 18:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_t7ehO8K7QoC0B9l4FBRbmw",
      },
    ],
    speaker: speakers.tomasSabat
  },

  {
    title: "Drug Discovery with Grakn",
    path: "/webinar-drugdiscovery",
    rsvpUrl: "https://zoom.us/webinar/register/WN_D9mK_i3tQY2Js5dYw1kthw",
    tags: [tags.grakndev, tags.nlp, tags.graql],
    type: types.webinar,
    description: `Combinatorial chemistry has produced a huge amount of chemical libraries and data banks which include prospective drugs. Despite all of this progress, the fundamental problem still remains: how do we take advantage of this data to identify the prospective nature of a compound as a vital drug? Traditional methodologies fail to provide a solution to this.

    Knowledge graphs, however, provide the framework which can make drug discovery much more efficient, effective and approachable. This radical advancement in technology can model biological knowledge complexity as it is found at its core. With concepts such as hyper relationships, type hierarchies, automated reasoning and analytics we can finally model, represent, and query biological knowledge at an unprecedented scale.`,
    imageUrl: "src/pages/events/images/event-intro-to-kg.jpeg",
    slots: [
      {
        date: new Date("June 16 2020 16:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_D9mK_i3tQY2Js5dYw1kthw",
      },
      {
        date: new Date("July 28 2020 18:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_07w-i2aETACD-N2C4kWdXA",
      },
    ],
    speaker: speakers.tomasSabat
  },

  {
    title: "Beyond SQL | comparing SQL to Graql",
    path: "/webinar-sql-to-graql",
    rsvpUrl: "https://zoom.us/webinar/register/WN_J23_-ccVQH6nYclU9jkgog",
    tags: [tags.grakndev, tags.graql],
    type: types.webinar,
    description: `Using SQL to query relational databases is easy. As a declarative language, it’s straightforward to write queries and build powerful applications. However, relational databases struggle when working with complex data. When querying such data in SQL, challenges especially arise in the modelling and querying of the data.

    For example, due to the large number of necessary JOINs, it forces us to write long and verbose queries. Such queries are difficult to write and prone to mistakes.
    
    Graql is the query language used in Grakn. Just as SQL is the standard query language in relational databases, Graql is Grakn’s query language. It’s a declarative language, and allows us to model, query and reason over our data.
    
    In this talk, we will look at how Graql compares to SQL. Why and when should you use Graql over SQL? How do we do outer/inner joins in Graql? We'll look at the common concepts, but mostly talk about the differences between the two.`,
    imageUrl: "src/pages/events/images/event-intro-to-kg.jpeg",
    slots: [
      {
        date: new Date("June 23 2020 11:30"),
        rsvpUrl: "https://zoom.us/webinar/register/WN_J23_-ccVQH6nYclU9jkgog",
      },
      {
        date: new Date("July 14 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_msz1m9ozTiC4csETWSvzPg",
      },
      {
        date: new Date("September 01 2020 16:30"),
        rsvpUrl: "https://us02web.zoom.us/webinar/register/WN_OTB-9fQQTRGJJHSsjXr9ZA",
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
