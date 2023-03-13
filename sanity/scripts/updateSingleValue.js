import createClient from "@sanity/client";
import { token } from "./credentials/token";
import { config } from "../config";

const client = createClient({
    projectId: config.projectId,
    dataset: 'production',
    token: token,
});

// Run this script from within your project folder in your terminal with: `sanity exec scripts/updateSingleValue.js`
const fetchDocument = () =>
    client.fetch(`*[_type == 'topbarAndFooter' && _id == 'websiteHeaderAndFooter-migrated'][0] {_id, _rev}`)

const buildPatch = doc => ({
    id: doc._id,
    patch: {
        set: {_id: "topbarAndFooter"},
        // this will cause the transaction to fail if the documents has been
        // modified since it was fetched.
        ifRevisionID: doc._rev
    }
})

const createTransaction = patch => client.transaction().patch(patch.id, patch.patch)

const commitTransaction = tx => tx.commit()

const migrateNextBatch = async () => {
    const document = await fetchDocument()
    if (!document) {
        console.log('No document was found matching the specified criteria')
        return null
    }
    const patch = buildPatch(document)
    console.log(
        `Migrating batch:\n %s`,
        `${patch.id} => ${JSON.stringify(patch.patch)}`
    )
    const transaction = createTransaction(patch)
    await commitTransaction(transaction)
    return migrateNextBatch()
}

migrateNextBatch().catch(err => {
    console.error(err)
    process.exit(1)
})
