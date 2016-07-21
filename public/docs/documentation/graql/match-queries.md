# Match Queries

```sql
match
$x isa pokemon, id "Pikachu";
(pokemon-with-type $x, $y);
```
```java
qb.match(
    var("x").isa("pokemon").id("Pikachu"),
    var().rel("pokemon-with-type", "x").rel("y")
);
```

A match query will search the graph for any subgraphs that match the given
[patterns](#variable-patterns). A result is produced for each match found,
containing any variables in the query. The results of the query can be modified
with various [modifiers](#modifiers).

## Variable Patterns

A pattern is a pattern to match in the graph. Patterns can be combined into a
disjunction ('or') and grouped together with curly braces. Patterns are
separated by semicolons, each pattern is independent of the others.

```sql
match
$x isa pokemon;
{
  $x id "Mew"
} or {
  ($x, $y);
  $y isa pokemon-type, id "water";
}
```
```java
qb.match(
  var("x").isa("pokemon"),
  or(
    var("x").id("Mew"),
    and(
      var().rel("x").rel("y"),
      var("y").isa("pokemon-type").id("water")
    )
  )
);
```


A variable pattern is a pattern describing [properties](#properties) of a
particular concept. The variable pattern can optionally be bound to a variable
or an ID.

## Properties

### isa

```sql
match $x isa pokemon
```
```java
qb.match(var("x").isa("pokemon"));
```

Match instances that have the given type.

### id

```sql
match $x id "Articuno"
```

Match concepts that have an `id` which matches the [predicate](#predicates).

### value

```sql
match $x value contains "lightning";
```

Match concepts that have a `value`. If a [predicate](#predicates) is provided,
the resource must match that predicate.

### has

```sql
match $x has pokedex-no < 20
```

Match concepts that have a resource of `type`. If a [predicate](#predicates) is
provided, the resource must match that predicate.

### relation

```sql
match
$x isa pokemon;
(ancestor $x, $y)
```
```java
qb.match(
  var("x").isa("pokemon"),
  var().rel("ancestor", "x").rel("y")
);
```

Match concepts that are relations between the given variables. If a role type
is provided, the role player must be playing that role type.

## Type Properties

The following properties only apply to types.

### ako

```sql
match $x ako mm-type
```

Match types that are a subclass of the given type.

### has-role

```sql
match evolution has-role $x
```

Match relation types that have the given role.

### plays-role

```sql
match $x plays-role ancestor
```

Match concept types that play the given role.

## Predicates

A predicate is a boolean function applied to values.

If a concept doesn't have a value, all predicates are considered false.

### Comparators

```sql
match $x has height = 19, has weight > 1500
```

There are several standard comparators, `=`, `!=`, `>`, `>=`, `<` and `<=`. For
longs and doubles, these sort by value. Strings are ordered lexicographically.

### Contains

```sql
match $x has description contains "underground"
select $x(id, has description)
```

Asks if the given string is a substring.

### Regex

```sql
match $x value /.*(fast|quick).*/
```

Checks if the value matches a regular expression. This match is across the
entire string, so if you want to match something within a string, you must
surround the expression with `.*`.

### And and Or

```sql
match $x has weight >20 and <30
```

`and` and `or` allows combining predicates using boolean logic.

## Modifiers

```sql
match $x isa pokemon
select $x(has pokedex-no, id)
limit 30, offset 10, distinct, order by $x(has pokedex-no) asc
```
```java
qb.match(var("x").isa("pokemon"))
    .select("x")
    .limit(30)
    .offset(10)
    .distinct()
    .orderBy("x", "pokedex-no", true);
```

### limit
Limit the query to the given number of results.

### offset
Offset the query by the given number of results.

### distinct
Remove any duplicate results.

### order
Order the results by the given variable's degree. If a type is provided, order
by the resource of that type on that concept. Order is ascending by default.

### select

Indicates which variables to include in the results as well as optionally some
[getters](#getters), e.g. `$x(id)`. If no getters are provided, the query will
get the [id](#section-id), [value](#section-value) and [isa](#section-isa) from
each result.

#### Getters

```sql
match $x isa pokemon
select $x(id, has pokedex-no, has description)
```

A getter indicates a property to get from a variable. Getters are supported in
the Graql shell, but are not supported in [Java Graql](java-graql.md).

##### isa
Get the type of a concept.

##### id
Get the `id` of a concept.

##### value
Get the `value` of a concept.

##### has
Get all resources of the given type on this concept.
