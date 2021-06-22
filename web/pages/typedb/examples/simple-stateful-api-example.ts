import { Code } from "../../../common/code/code";

export const simpleStatefulAPIExample: Code[] = [{
    language: "java",
    body: `
try (TypeDBClient client = TypeDB.coreClient("localhost:1729")) {
    try (TypeDBSession session = client.session("my-typedb", DATA)) {
        try (TypeDBTransaction tx = session.transaction(WRITE)) {
            tx.query().insert(TypeQL.insert(var().isa("person")));
            tx.commit();
        }
        try (TypeDBTransaction tx = session.transaction(READ)) {
            Stream<ConceptMap> answers = tx.query().match(TypeQL.match(var("x").isa("person")));
        }
    }
}
`
}, {
    language: "python",
    body: `
with TypeDB.core_client("localhost:1729") as client:
    with client.session("my-typedb", SessionType.DATA) as session:
        with session.transaction(TransactionType.WRITE) as tx:
            tx.query().insert("insert $_ isa person;")
            tx.commit()
        
        with session.transaction(TransactionType.READ) as tx:
            answers: Iterator[ConceptMap] = tx.query().match("match $x isa person")
`
}, {
    language: "javascript",
    body: `
let client, session, tx;
try {
    client = TypeDB.coreClient("localhost:1729");
    session = await client.session("my-typedb");
    tx = session.transaction(TransactionType.WRITE);
    tx.query().insert("insert $_ isa person");
    tx.commit()
    tx = session.transaction(TransactionType.READ);
    const answer = tx.query().match("match $x isa person");
} finally {
    if (tx) tx.close(); if (session) session.close(); if (client) client.close();
}
`
}, {
    language: "console",
    body: `$
$ ./typedb console
>
> transaction my-typedb data write
my-typedb::data::write> insert $x isa person;
my-typedb::data::write> commit
>
> transaction my-typedb data read
my-typedb::data::read> match $x isa person;
...
`
}];
