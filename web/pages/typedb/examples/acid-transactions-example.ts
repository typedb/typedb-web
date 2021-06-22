export const acidTransactionsExampleCode = `$
$ ./typedb console
>
> transaction my-typedb data write
my-typedb::data::write> insert $x isa person;
my-typedb::data::write> rollback
my-typedb::data::write> insert $x isa person;
my-typedb::data::write> commit
>
> transaction my-typedb data read
my-typedb::data::read> match $x isa person;
...
`;
