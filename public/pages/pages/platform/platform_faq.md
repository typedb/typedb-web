## What is MindmapsDB?

**<<< to do - this needs significant rework from someone who knows what they're talking about >>>**

MindmapsDB is a distributed semantic database that provides a flexible object-oriented schema and a knowledge-oriented query language, capable of real-time analytics and reasoning.

Let's break that down a bit and explain what it means.

*"MindmapsDB is a distributed semantic database..."*   

MindmapsDB is built on top of a graph database, the benefits of which, we will discuss in a moment. The fact that it is "distributed" means that different portions of the database may be stored in multiple physical locations, over a network of interconnected computers. The advantages of this approach include reliability, cost and extensibility. A semantic database is one in which the data defines its meaning within the context of its interrelationships with other data. 

*"...that provides a flexible object-oriented schema..."*   

MindmapsDB provides a core API with an object model that enables the programmatic definition of an ontology. Data can then be interacted with solely in terms of the API, without having to consider the complexities of the underlying graph. MindmapsDB abstracts away nodes and edges and structures data in terms of concepts, the relationships between them, and the roles they play in these relationships.


*"...and a knowledge-oriented query language..."*    

Our query language, Graql, uses pattern matching to retrieve explicitly stored and implicitly derived knowledge from the data.

*"...capable of real-time analytics and reasoning..."*   

In the past, a model of the relationships within a dataset would have to be built by hand. It is now possible for machine-assisted or inferred relationship mapping to derive this model. In doing so, this presents new opportunities to business by inferring new relationships and additional context from data. 


### What is a Graph Database?
As [Wikipedia](https://en.wikipedia.org/wiki/Graph_database) explains, a graph database is "*...a database that uses graph structures for semantic queries with nodes, edges and properties to represent and store data. A key concept of the system is the graph (or edge or relationship), which directly relates data items in the store. The relationships allow data in the store to be linked together directly, and in most cases retrieved with a single operation.*".

Put another way: a graph database can store, manage and query complex and highly-connected data (that is, data where there are a high number of relationships between the elements). A graph database is well-suited for uncovering common attributes and anomalies within a given volume of data, and are designed to express the relatedness of that data, allowing them to  uncover patterns that are otherwise difficult to detect.    

A graph is a structure composed of vertices and edges, which can have an arbitrary number of key/value-pairs called properties. 

Vertices represent entities: discrete objects such as a person, a place, or an event. 

Edges represent relationships between those objects. For instance, a person may know another person, have been involved in an event, or lives at a particular place. 

Properties express non-relational information about the vertices and edges. Example properties include a vertex having a name, an age and an edge having a timestamp and/or a weight.



### What is the difference between relational databases and graph databases?

Relational and graph databases differ in the way data is stored and accessed. The primary difference is how relationships between objects are prioritized and managed. A relational database connects entities in a secondary fashion using foreign keys, but in a graph database, the relationships between them (the 'edges') are of first order importance. The ability to map any-to-any relationships is what makes graph databases so powerful. A graph database can be likened to a pre-joined RDBMS.

Graph computing can offer algorithms that support complex reasoning: path analysis, vertex clustering and ranking, subgraph identification, and more. 

**Temporary graphic - would need to redraw**
![](http://www.pwc.com/content/dam/pwc/us/en/technology-forecast/2015/remapping-database-landscape/features/assets/mw-15-1351-the-power-of-graph-databases-in-public-health-modal-chart-2-modal.png)


### What is the difference between other NoSQL databases and graph databases?   

**<<< to do - Another short section to describe the difference in brief (maybe just use a diagram) >>>**

**Temporary graphic - discuss and redraw**

![](https://www.datastax.com/wp-content/uploads/2016/07/databases.jpg)


## Why use MindmapsDB?

This section explains why you may consider using MindmapsDB. We will start by examining when using a graph database makes sense, and then explain what additional value our stack offers.

### Why would you use a graph database?

As we've discussed above, relationships are explicit in a graph data model.  If tracking the relationships between your data entities is a primary concern, it is often a good fit to use a graph database.

Some common use cases for graph databases include:

- Recommendation and Personalization   - Security and Fraud Detection   
- IoT and Networking

### Why would you specifically choose MindmapsDB?   

**<<< to do - Not a promotional thing here - what is the technical reason for choosing it rather than orientdb or neo4j? What are the problems that we specifically solve? >>> **

### What can you build with MindmapsDB?   

Common uses for graph databases include geospatial problems, recommendation engines, network/cloud analysis, bioinformatics and financial analysis. 

We have several examples that show how MindmapsDB can be used...

**<<< TO DO - links and descriptions of examples >>>**

### When a graph database is not a good solution   

Much depends on your use case.  If the goal is to model or integrate large, interconnected systems, a graph store is invaluable.

As described by [PWC's recent database technology forecast](http://www.pwc.com/us/en/technology-forecast/2015/remapping-database-landscape/public-health-graph--databases.html): "*Depending on the use case, native graph stores can be overkill. If the immediate purpose is to capture or cache the data, then a key-value or column store is more appropriate. If the purpose is aggregation, then a document store may be best, at least for initial data ingestion. If transactional integrity and concurrency are critical requirements, then an RDBMS or a NewSQL store fits best.*"


### Database types compared   

**Temporary graphic - discuss and redraw**   

![](https://www.datastax.com/wp-content/uploads/2016/07/rdbmsgraphcompare2.jpg)


## What languages can I use to work with MindmapsDB?   

At present, you can use Java. We also have Graql, a knowledge-oriented query language, which is allows you to express complex questions in simple and short pattern matching statements.    

Graql is declarative and therefore it handles the optimisation of the graph traversals needed to retrieve information.

## How can I start developing with MindmapsDB?   

MindmapsDB is an open source project, which is available now on [Github](https://github.com/mindmapsdb/mindmapsdb). Our developer documentation provides a range of guides to getting started, and can be found at [mindmaps.io](https://mindmaps.io/pages/index.html).
