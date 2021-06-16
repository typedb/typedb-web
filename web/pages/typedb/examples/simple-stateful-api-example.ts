import { Code } from "../../../common/code/code";

export const simpleStatefulAPIExampleSources: Code[] = [{
    language: "java",
    body: `
try (TypeDBClient client = TypeDB.coreClient("localhost:1729")) {
    client.databases().create("my-typedb");
    try (TypeDBSession session = client.session("my-typedb", DATA)) {
        try (TypeDBTransaction tx = session.transaction(WRITE)) {
            ...
            ...
        }
    }
}`
}, {
    language: "python",
    body: `
with TypeDB.core_client("localhost:1729") as client:
    client.databases().create("my-typedb")
    with client.session("my-typedb", SessionType.DATA) as session:
        with session.transaction(TransactionType.WRITE) as write_transaction:
            ...
            ...
`
}, {
    language: "javascript",
    body: `
const client = TypeDB.coreClient("localhost:1729");
client.databases().create("my-typedb");
const session = await client.session("my-typedb");
try {
    const tx = session.transaction(TransactionType.WRITE);
    ...
} finally {
    session.close();
}
`
}, {
    language: "console",
    body: `
$ ./typedb console

Welcome to TypeDB Console. You are now in TypeDB Wonderland!
Copyright (C) 2021 Vaticle

> database create my-typedb
Database 'my-typedb' created

> transaction typedb schema write
typedb::schema::write> ...

> exit
`
}];
