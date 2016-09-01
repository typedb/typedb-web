## What is a Graph Database?
As [Wikipedia](https://en.wikipedia.org/wiki/Graph_database) explains, a graph database is "*...a database that uses graph structures for semantic queries with nodes, edges and properties to represent and store data. A key concept of the system is the graph (or edge or relationship), which directly relates data items in the store. The relationships allow data in the store to be linked together directly, and in most cases retrieved with a single operation.*".

Put another way: a graph database can store, manage and query complex and highly connected data, where there are a high number of relationships between data elements. This approach offers rich context through multiple connections and any-to-any data models. 

A graph is a structure composed of vertices and edges, which can have an arbitrary number of key/value-pairs called properties. 

Vertices represent entities: discrete objects such as a person, a place, or an event. 

Edges represent relationships between those objects. For instance, a person may know another person, have been involved in an event, or lives at a particular place. 

Properties express non-relational information about the vertices and edges. Example properties include a vertex having a name, an age and an edge having a timestamp and/or a weight.

<<< To do: Add a diagram >>>


### What is the difference between relational databases and graph databases?

Relational and graph databases differ in the way data is stored and accessed. The primary difference is how relationships between objects are prioritized and managed. A relational database connects entities in a secondary fashion using foreign keys, but in a graph database, the relationships between them (the 'edges') are of first order importance. The ability to map any-to-any relationships is what makes graph databases so powerful. 

### What is the difference between other NoSQL databases and graph databases?

<<< to do - Another short section to describe the difference in brief (maybe use a diagram) >>>

## What is MindmapsDB?

<<< to do - this needs significant rework from someone who knows what they're talking about >>>

MindmapsDB is essentially a graph database.


Mindmaps Engine provides a core API with an object model that enables the programmatic definition of an ontology. Data can then be interacted with solely in terms of the API, without having to consider the complexities of implementing it in a graph database. Mindmaps abstracts away nodes and edges in your graph and allows the data to be structured in terms of concepts, the relationships between them, and the roles they play in these relationships.


Graph computing can offer algorithms that support complex reasoning: path analysis, vertex clustering and ranking, subgraph identification, and more. 

In the past, an ontology would have been built by hand, but it is now possible for machine-assisted or inferred relationship mapping to generate an ontology from data and relationship meta-data. The ability to infer new relationships can derive additional context from data, which is presents new opportunities to business.

This is what MindmapsDB offers.


## Why use Mindmaps?


### Why would you use a graph database?

As we've discussed above, relationships are explicit in a graph data model.  If tracking the relationships between your data entities is a primary concern, it is often a good fit to use a graph database. 

### Why would you specifically choose Mindmaps?
<<< to do - Not a promotional thing here - what is the technical reason for choosing it rather than orientdb or neo4j? >>> 

### What can you build with Mindmaps?
Common uses for graph databases include geospatial problems, recommendation engines, network/cloud analysis, bioinformatics and financial analysis. 

We have several examples that show how Mindmaps can be used...

<<< TO DO - links and descriptions of examples >>>

### When a graph database is not a good solution

Much depends on your use case.  If the goal is to model or integrate large, interconnected systems, a graph store is invaluable.

As described by [PWC's recent database technology forecast](http://www.pwc.com/us/en/technology-forecast/2015/remapping-database-landscape/public-health-graph--databases.html): "*Depending on the use case, native graph stores can be overkill. If the immediate purpose is to capture or cache the data, then a key-value or column store is more appropriate. If the purpose is aggregation, then a document store may be best, at least for initial data ingestion. If transactional integrity and concurrency are critical requirements, then an RDBMS or a NewSQL store fits best.*"


In the past, graph stores haven’t been easy to use. The current generation of graph stores is resolving that issue.

### Database types compared 

<<< to do - WE NEED TO TALK ABOUT SPECIFICS - latency? transactional integrity? concurrency? Maybe adapt and use the table found here?

https://www.datastax.com/wp-content/uploads/2016/07/rdbmsgraphcompare2.jpg >>>



## What languages can I use to work with MindmapsDB?
At present, you can use Java. We also have Graql, a knowledge-oriented query language, which is allows you to express complex questions in simple and short pattern matching statements.    

Graql is declarative and therefore it handles the optimisation of the graph traversals needed to retrieve information.

## How can I start developing with MindmapsDB?
MindmapsDB is an open source project, which is available now on [Github](https://github.com/mindmapsdb/mindmapsdb). Our developer documentation provides a range of guides to getting started, and can be found at [mindmaps.io](https://mindmaps.io/pages/index.html).