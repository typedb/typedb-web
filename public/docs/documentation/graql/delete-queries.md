# Delete Queries

```sql
match $x isa pokemon delete $x
```
```java
qb.match(var("x").isa("pokemon")).delete("x").execute();
```

A delete query will delete the specified [variable
patterns](#variable-patterns) for every result of the [match
query](match-query.md). If a variable pattern indicates just a variable, then
the whole concept will be deleted. If it is more specific (such as indicating
the `id` or `isa`) it will only delete the specified properties.

## Variable Patterns

A variable pattern is a pattern describing [properties](#properties) to delete
on a particular concept. The variable pattern is always bound to a variable
name.

If a variable pattern has no properties, then the concept itself is deleted.
Otherwise, only the specified properties are deleted.

## Properties

### has-role

```sql
match $x id "evolution" delete $x has-role descendant;
```

Removes the given role from the relation type.

### plays-role

```sql
match $x id "type" delete $x plays-role attacking-type;
```

Disallows the concept type from playing the given role.

### has

```sql
match $x id "Bulbasaur" delete $x has weight;
```

Deletes the resources of the given type on the concept. If a value is given,
only delete resources matching that value.
