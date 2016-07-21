# Tinker Graph Factory

> Tinkergraph is n in-memory data structure only, so this backed serves as a
> good toy to familiarise yourself with the API.

Initialising a Mindmaps graph on top of a TinkerGraph is as simple as:

```java
MindmapsGraphFactory mindmapsGraphFactory = MindmapsTinkerGraphFactory.getInstance();
mindmapsGraph = mindmapsGraphFactory.newGraph();
```

A Tinkergraph requires no configuration files and does not support
transactions. So this is the simplest way to initialise a Mindmaps Graph.
