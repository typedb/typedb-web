# Insert Queries

```sql
insert
$p isa pokemon, id "Pichu", has pokedex-no 172;
(descendant Pikachu, ancestor $p) isa evolution;
```
```java
qb.insert(
    var("p").isa("pokemon").id("Pichu").has("pokedex-no", 172),
    var().isa("evolution")
        .rel("descendant", var().id("Pikachu"))
        .rel("ancestor", "p")
).execute();",
```

An insert query will insert the specified [variable
patterns](#variable-patterns) into the graph. If a [match
query](match-queries.md) is provided, the query will insert the given variable
patterns for every result of the match query.

A variable pattern is a pattern describing [properties](#properties) to set on
a particular concept. The variable pattern can optionally be bound to a
variable, an ID or a "new-type".

Variable patterns that are not bound, bound to a variable or bound to a
"new-type" are inserted. Variable patterns bound to a type are not
automatically inserted. "new-type" is indicated with the keyword `type`
followed by a string.

## Properties

### isa

```sql
insert id "Totodile" isa pokemon;
```

Set the type of this concept.

### id

```sql
insert id "Pikachu" isa pokemon
```

Create a concept with the given id, or retrieve it if one with that id exists.
The created or retrieved concept can then be modified with further properties.

### value

```sql
insert id "trained-by" isa mm-relation-type, value "Trained By";
```

Set the value of the concept.

### has

```sql
insert id "Pichu" isa pokemon has height 30;
```

Add a resource of the given type to the concept.

### relation

```java
qb.insert(
  var()
    .rel("pokemon-with-type", "Pichu")
    .rel("type-of-pokemon", "electric")
    .isa("has-type")
);",
```
```sql
insert (pokemon-with-type Pichu, type-of-pokemon electric) isa has-type;
```

Make the concept a relation that relates the given role players, playing the
given roles.

## Type Properties

The following properties only apply to types.

### ako

```sql
insert id "gen2-pokemon" ako pokemon;
```

Set the super type of this concept type.

### has-role

```sql
insert
id "trained-by" isa mm-relation-type,
  has-role trainer, has-role pokemon-trained;
```

Add a role to this relation type.

### plays-role

```sql
insert pokemon plays-role pokemon-trained;
```

Allow the concept type to play the given role.
