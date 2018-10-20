const visualiserItems = require('config/visualiserItems');

module.exports = {
  ER: {
    code: `${visualiserItems.ER.code}`,
    text: `Grakn allows you to model your domain using the well-known Entity-Relationship model at its full expressivity. It is composed of entity types, relationship types, and attribute types.
    <br><br>Unlike other modelling languages, Grakn allows you to define type hierarchies, hyper-entities, hyper-relations, and rules to build rich knowledge models.`
  },
  Types: {
    code: `${visualiserItems.Types.code}`,
    text: `Grakn provides to easily and quickly model type inheritance into the knowledge model. Following the object-oriented principle, this allows data types to inherit the behaviour and properties of their parent.
    <br><br>Like functions in programming, rules can chain themselves to one another, creating abstractions of behaviour at the data level.`
  },
  Rules: {
    code: `${visualiserItems.Rules.code}`,
    text: `Grakn allows you to define rules in your knowledge schema, which extends the expressivity of your model as it enables the system to derive new conclusions when a certain logical form in your dataset is satisfied.
    <br><br>Like functions in programming, that rules can chain itself to another, creating abstractions of behaviour at the data level.`
  },
  Inference: {
    code: `${visualiserItems.Inference.code}`,
    text: `Grakn's inference facility translates one query into all of its other interpretations. This happens through two mechanisms: type-based and rule-based inference.
    <br><br>Not only does this derive new conclusions and uncovers relationships that would otherwise be hidden, but it also enables the abstraction of complex patterns into simple queries.`
  },
  Analytics: {
    code: `${visualiserItems.Analytics.code}`,
    text: `Distributed analytics is a set of scalable algorithms that allows you to perform computation over large amounts of data in a distributed fashion. They tend to belong to the family of MapReduce or Pregel algorithms (BSP). Often, this requires the implementation of challenging algorithms.
    <br><br>In Grakn, these distributed analytics algorithms are built-in as native functionalities of the language.`
  },
}
