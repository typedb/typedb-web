import createClient from "@sanity/client";
import { token } from "./credentials/token";
import { config } from "../config";

const TYPE = "organisationLogosPanel";

// Run this script from within your project folder in your terminal with: `sanity exec scripts/migrateDocumentType.js`

const client = createClient({
    projectId: config.projectId,
    dataset: 'production',
    token: token,
});

const fetchDocuments = () => client.fetch(`*[_type == $type][0...10] {_id}`, { type: TYPE });

const buildMutations = docs => docs.map(x => {
    console.log(`Deleting ${x._id}`);
    return { delete: x._id };
});

const createTransaction = mutations => {
    return mutations.reduce((tx, mutation) => {
        return tx.delete(mutation.delete);
    }, client.transaction());
};

const deleteNextBatch = async () => {
    const documents = await fetchDocuments();
    if (documents.length === 0) {
        console.log("No more documents to delete!");
        return null;
    }
    const mutations = buildMutations(documents);
    const transaction = createTransaction(mutations);
    await transaction.commit();
    return deleteNextBatch();
};

deleteNextBatch().catch(err => {
    console.error(JSON.stringify(err, null, 2));
    process.exit(1);
});
