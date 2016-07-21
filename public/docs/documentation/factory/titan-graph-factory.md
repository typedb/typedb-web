# Titan Graph Factory

mindmaps.zip comes with an embedded instance of TitanDB running on top of
cassandra. We recommend using this to get the most of your Early Access
experience. 

## Initialising a Mindmaps Graph

First we must create the correct factory:

```java
MindmapsGraphFactory mindmapsGraphFactory = MindmapsTitanGraphFactory.getInstance();
```

Now we can create new transactions on top of the graph:

```java
mindmapsGraph = mindmapsGraphFactory.newGraph(config);
```

> Each instance of a Mindmaps Titan Graph encapsulates its own transaction.
> That way transactions may behave independently of each other.

## Configuration

For the most part it is recommended that you use one of the configurations
provided in mindmaps.zip . However if you desire more control you may modify
these configurations. For this purpose we recommend looking directly
[here](http://s3.thinkaurelius.com/docs/titan/1.0.0/titan-config-ref.html)
