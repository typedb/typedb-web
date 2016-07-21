# Ask Queries

```sql
match dragon isa pokemon-type
ask
```
```java
qb.match(getType("dragon").isa("pokemon-type")).ask().execute();
```

An ask query will return whether the given [match query](match-query.md) has
any results.
