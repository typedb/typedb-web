# Overview

> You should checkout the [Quickstart
> Tutorial](documentation/basic-tutorial.md) before looking through here. It
> is also recommended looking at the example code provided in mindmaps.zip

Mindmaps Core API is the implementation of the object model discussed in
[Mindmaps Basics](documentation/mindmaps-basics.md). It allows you to create
Mindmaps Graphs using Java 8. It supports any
[Tinkerpop](http://tinkerpop.incubator.apache.org/docs/3.0.2-incubating/) 3.0.z
version. 

Mindmaps Core API is catered towards constructing Mindmaps Graphs. Graql is
catered towards querying in more complex manners.

## Core API Construction

Let's jump into the deep end of and create an ontology which can be used in the
domain of movies:

```java
RoleType prodCast = mindmapsGraph.putRoleType("Production with Cast");
RoleType prodRole = mindmapsGraph.putRoleType("Role within the production");
RoleType actor = mindmapsGraph.putRoleType("Actor");

RelationType casting = mindmapsGraph.putRelationType("Casting")
    .hasRole(prodCast).hasRole(prodRole).hasRole(actor);
    
EntityType production = mindmapsGraph.putEntityType("Production").playsRole(prodCast);
EntityType tvShow = mindmapsGraph.putEntityType("Tv Show").superConcept(production);
EntityType movie = mindmapsGraph.putEntityType("Movie").superConcept(production);
    
Type character = mindmapsGraph.putType("Character").playsRole(prodRole);
    
EntityType person = mindmapsGraph.putEntityType("Person").playsRole(actor);
EntityType man = mindmapsGraph.putEntityType("Man").supertype(person);
EntityType woman = mindmapsGraph.putEntityType("Man").superType(person);",
```

Now some data:

```java
Entity godfather = mindmapsGraph.putEntity("Godfather", movie);
Entity alPacino = mindmapsGraph.putEntity("Al Pacino", man);
Entity michaelCorleone = mindmapsGraph.putEntity("Michael Corleone", character);

mindmapsGraph.putRelation(casting)
    .putRolePlayer(prodCast, godfather)
    .putRolePlayer(prodRole, michaelCorleone)
    .putRolePlayer(actor, alPacino);
```

Bang a graph which represents that Al Pacino was in the movie Godfather where
he played the role of Michael Corleone:

![](/docs/images/example_core.png)
