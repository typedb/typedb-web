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
};

const types = {
  webinar: "webinar",
};

const eventsData = [
  {
    title: "Introduction to Knowledge Graphs with Grakn and Graql",
    path: "/event",
    rsvpUrl: "a",
    tags: [tags.ml, tags.nlp],
    type: types.webinar,
    description: `Cognitive/AI systems process knowledge that is far too complex for current databases. They require an expressive data model and an intelligent query language to perform knowledge engineering over complex datasets.

    In this talk, we will discuss how Grakn, a database to organise complex networks of data and make it queryable, provides the knowledge graph foundation for intelligent systems to manage complex data.
    
    We will discuss how Graql, Grakn's reasoning (through OLTP) and analytics (through OLAP) query language, provides the tools required to do the job: a knowledge schema, a logical inference language, a distributed analytics framework.
    
    And finally, we will discuss how Graql’s language serves as unified data representation of data for cognitive systems.`,
    imageUrl: "src/pages/events/images/event-intro-to-kg.jpeg",
    slots: [
      {
        date: new Date("April 10 2020 18:30"),
        rsvpUrl: "a",
      },
      {
        date: new Date("April 16 2020 18:30"),
        rsvpUrl: "a",
      },
      {
        date: new Date("April 30 2020 18:30"),
        rsvpUrl: "a",
      },
    //   {
    //     date: new Date("May 07 2020 18:30"),
    //     rsvpUrl: "a",
    //   },
    //   {
    //     date: new Date("May 14 2020 18:30"),
    //     rsvpUrl: "a",
    //   }
    ],
    speaker: {
      fullName: "Tomás Sabat",
      imageUrl: "src/pages/events/images/speaker-tomas-sabat.jpeg",
      bio:
        "Tomás is the Chief Operating Officer at Grakn Labs, dedicated to building a distributed Knowledge Graph for intelligent systems. He works directly with Grakn's open source and enterprise users so they can fulfil their potential with Grakn and change the world. He focuses mainly in finance, life sciences and robotics.",
    },
  },

  {
    title: "Introduction to Knowledge Graphs with Grakn and Graql",
    path: "/event-a",
    rsvpUrl: "a",
    tags: [tags.ml, tags.nlp],
    type: types.webinar,
    description: `Cognitive/AI systems process knowledge that is far too complex for current databases. They require an expressive data model and an intelligent query language to perform knowledge engineering over complex datasets.

    In this talk, we will discuss how Grakn, a database to organise complex networks of data and make it queryable, provides the knowledge graph foundation for intelligent systems to manage complex data.
    
    We will discuss how Graql, Grakn's reasoning (through OLTP) and analytics (through OLAP) query language, provides the tools required to do the job: a knowledge schema, a logical inference language, a distributed analytics framework.
    
    And finally, we will discuss how Graql’s language serves as unified data representation of data for cognitive systems.`,
    imageUrl: "src/pages/events/images/event-intro-to-kg.jpeg",
    slots: [
      {
        date: new Date("April 10 2020 18:30"),
        rsvpUrl: "a",
      },
      {
        date: new Date("April 16 2020 18:30"),
        rsvpUrl: "a",
      },
      {
        date: new Date("April 30 2020 18:30"),
        rsvpUrl: "a",
      },
    //   {
    //     date: new Date("May 07 2020 18:30"),
    //     rsvpUrl: "a",
    //   },
    //   {
    //     date: new Date("May 14 2020 18:30"),
    //     rsvpUrl: "a",
    //   }
    ],
    speaker: {
      fullName: "Tomás Sabat",
      imageUrl: "src/pages/events/images/speaker-tomas-sabat.jpeg",
      bio:
        "Tomás is the Chief Operating Officer at Grakn Labs, dedicated to building a distributed Knowledge Graph for intelligent systems. He works directly with Grakn's open source and enterprise users so they can fulfil their potential with Grakn and change the world. He focuses mainly in finance, life sciences and robotics.",
    },
  },

  {
    title: "Introduction to Knowledge Graphs with Grakn and Graql",
    path: "/event-b",
    rsvpUrl: "a",
    tags: [tags.ml, tags.nlp],
    type: types.webinar,
    description: `Cognitive/AI systems process knowledge that is far too complex for current databases. They require an expressive data model and an intelligent query language to perform knowledge engineering over complex datasets.

    In this talk, we will discuss how Grakn, a database to organise complex networks of data and make it queryable, provides the knowledge graph foundation for intelligent systems to manage complex data.
    
    We will discuss how Graql, Grakn's reasoning (through OLTP) and analytics (through OLAP) query language, provides the tools required to do the job: a knowledge schema, a logical inference language, a distributed analytics framework.
    
    And finally, we will discuss how Graql’s language serves as unified data representation of data for cognitive systems.`,
    imageUrl: "src/pages/events/images/event-intro-to-kg.jpeg",
    slots: [
      {
        date: new Date("April 10 2020 18:30"),
        rsvpUrl: "a",
      },
      {
        date: new Date("April 16 2020 18:30"),
        rsvpUrl: "a",
      },
      {
        date: new Date("April 30 2020 18:30"),
        rsvpUrl: "a",
      },
    //   {
    //     date: new Date("May 07 2020 18:30"),
    //     rsvpUrl: "a",
    //   },
    //   {
    //     date: new Date("May 14 2020 18:30"),
    //     rsvpUrl: "a",
    //   }
    ],
    speaker: {
      fullName: "Tomás Sabat",
      imageUrl: "src/pages/events/images/speaker-tomas-sabat.jpeg",
      bio:
        "Tomás is the Chief Operating Officer at Grakn Labs, dedicated to building a distributed Knowledge Graph for intelligent systems. He works directly with Grakn's open source and enterprise users so they can fulfil their potential with Grakn and change the world. He focuses mainly in finance, life sciences and robotics.",
    },
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
