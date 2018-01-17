const visualiserItems = require('config/visualiserItems');

module.exports = {
  ER: {
    code: `${visualiserItems.ER.code}`,
    text: `Grakn allows you to model your domain using the well-known Entity-Relationship model at its full expressivity. It is composed of entity types - which classify independent things of interest, relationship types - how things relate to each other, and attribute types - which represent the properties that something can have.
    Unlike other modelling languages, Grakn allows you to define hyper-entities, hyper-relations, and rules to build complex knowledge models.`
  },
  Types: {
    code: `${visualiserItems.Types.code}`,
    text: `Grakn provides to easily to quickly model type inheritance into the knowledge model. Following the object-oriented principle, this allows data types to inherit the behaviour and properties of their parent.
    With Grakn’s type inheritance, rich object modelling can now be done at the database level, rather than application code.`
  },
  Rules: {
    code: `${visualiserItems.Rules.code}`,
    text: `Grakn allows you to define rules in your knowledge schema, that extends the expressivity of your model as it enables the system to derive new conclusion when a certain logical form in your dataset is satisfied.
    Like functions in programming, that rules can chain itself to another, creating abstractions of behaviour at the data level.`
  },
  Inference: {
    code: `${visualiserItems.Inference.code}`,
    text: `Grakn’s inference facility enables you to transform one query into another logically equivalent version of itself, and along the way, discover new conclusions that could be derived from your data. This happens through two mechanisms: type-based and rule-based inference.
    Not only it allows you to uncover relationships that would otherwise be hidden, but it also enables the abstraction of complex patterns into simple queries.`
  },
  Analytics: {
    code: `${visualiserItems.Analytics.code}`,
    text: `Distributed analytics is a set of scalable algorithms that allows you perform computation over large amounts of data in a distributed fashion. They tend to belong to either the family of MapReduce or Pregel algorithms (BSP). Ofen, this requires challenging implementation of the algorithms.
    In Grakn, these distributed analytics algorithms are built-in as native functionalities of the language.`
  },
}