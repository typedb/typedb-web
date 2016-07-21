# Overview

One of the most important features of a Mindmaps graph is that it formalizes a
structure on top of a graph data base. Mindmaps itself is not a graph database
but merely operates on one. 

For the moment mindmaps supports [Tinkerpop
3](http://tinkerpop.incubator.apache.org/) compliant vendors. Mindmaps Graph
Factory houses methods which can instantiate different Mindmaps Graphs on top
of different Tinkerpop 3 vendors. For the moment this list includes
[TitanDB](http://titan.thinkaurelius.com/) and
[TinkerGraph](http://tinkerpop.apache.org/javadocs/3.1.2-SNAPSHOT/full/org/apache/tinkerpop/gremlin/tinkergraph/structure/TinkerGraph.html).

> **Feeling Curious?**
>
> As a member of EAP you can attempt to integrate Mindmaps with other Tinkerpop
> 3 vendors which we have not yet formally supported through these factory
> methods. This is a simple matter of:
> ```java
> Graph graph = someTinkerPop3Vendor();
> mindmapsGraph = new MindmapsGraphImpl(graph);
> ```
