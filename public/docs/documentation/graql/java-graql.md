# Java Graql

As well as the Graql shell, users can also construct and execute Graql queries
programmatically in Java.

Add the following to your `pom.xml`:

```xml
<dependency>
  <groupId>io.mindmaps.graql</groupId>
  <artifactId>graql-core</artifactId>
  <version>0.2.1</version>
</dependency>
```

## QueryBuilder

The `QueryBuilder` class is how you begin building Graql queries.

`QueryBuilder` and `ValuePredicate` contains several useful static methods such
as `var` and `eq`, so it's recommended that you use a static import:

```java
import io.mindmaps.graql.api.query.QueryBuilder;
import static io.mindmaps.graql.api.query.QueryBuilder.*;
import static io.mindmaps.graql.api.query.ValuePredicate.*;
```

A `QueryBuilder` is constructed by providing a Mindmaps Graph:

```java
MindmapsGraph graph = TinkerGraphFactory.getInstance().getGraph();
QueryBuilder qb = new QueryBuilder(graph);
```

The `QueryBuilder` class provides methods for building `match`, `ask`,
`insert` and `delete` queries.

## Match Queries

Match queries are constructed using the `match` method and include all
modifiers:

```java
MatchQuery tallPokemon = qb.match(var("x").isa("pokemon").has("height", gt(10))).limit(50);
```

`MatchQuery` is `Iterable` and has a `stream` method. Each result is a
`Map<String, Concept>`, where the keys are the variable names in the query.

```java
for (Map<String, Concept> result : tallPokemon) {
  System.out.println(result.get("x").getValue());
}

tallPokemon.stream()
  .map(r -> r.get("x"))
  .map(Concept::getValue)
  .forEach(System.out::println);
```

## Ask Queries

Ask queries execute as soon as `execute()` is called:

```java
if (qb.ask(var().isa("pokemon-type").value("dragon"))) {
  System.out.println("Dragons are real!");
}
```

## Insert Queries

Insert queries execute as soon as `execute()` is called:

```java
InsertQuery addPichu = qb.insert(var().id("Pichu").isa("pokemon"));

addPichu.execute();

// Make everything dragons!
qb.match(
  var("x").isa("pokemon")
).insert(
  var().isa("has-type")
    .rel("pokemon-with-type", "x")
    .rel("type-of-pokemon", var().id("dragon"))
).execute();
```

## Delete Queries

Delete queries are executed when `execute()` is called:

```java
qb.match(var("x").id("Pichu")).delete("x").execute();
```

## Query Parser

```xml
<dependency>
  <groupId>io.mindmaps.graql</groupId>
  <artifactId>graql-parser</artifactId>
  <version>0.2.1</version>
</dependency>
```

The `QueryParser` allows the user to parse Graql query strings into Java Graql
objects:

```java
QueryParser parser = new QueryParser(graph);

parser.parseMatchQuery("match $x isa pokemon").getMatchQuery().get("x").forEach(System.out::println);

if (parser.parseAskQuery("match water isa pokemon-type ask").execute()) {
  System.out.println("Water is a pokemon type!");
}

parser.parseInsertQuery("insert id 'pichu' isa pokemon").execute();

parser.parseDeleteQuery("match $x isa pokemon delete $x");
```
