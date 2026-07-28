/**
 * Migrates `illustration` fields from the legacy reference shape to the inline object shape
 * (kind selector + one content field), WRITING DRAFTS ONLY - published documents are never modified.
 *
 *  - Documents with an existing draft: the migration is applied to the draft.
 *  - Documents without a draft: a new draft is created from the published version.
 *  - References to imageIllustration documents are replaced by inlining the wrapped image;
 *    all other targets (code, video, graph, split pane) stay as references, moved into the
 *    matching content field.
 *  - featureGridCell illustrations are skipped (still on the legacy reference schema).
 *
 * Idempotent: already-migrated fields (no `_ref`) are left untouched.
 *
 * Usage (from the sanity/ directory). Dry run (default, writes nothing):
 *   npx sanity exec scripts/migrate-illustration-fields.ts --with-user-token
 * Actually write the drafts:
 *   $env:MIGRATE_WRITE="1"; npx sanity exec scripts/migrate-illustration-fields.ts --with-user-token
 */
import { getCliClient } from "sanity/cli"

const dryRun = process.env.MIGRATE_WRITE !== "1"

const client = getCliClient({ apiVersion: "2025-07-01" })

const KIND_BY_TYPE: Record<string, string> = {
    imageIllustration: "image",
    codeSnippet: "code",
    polyglotSnippet: "code",
    videoEmbed: "video",
    graphVisualisation: "graph",
    splitPaneIllustration: "splitPane",
}

// object types whose `illustration` field keeps the legacy reference shape for now
const SKIP_PARENT_TYPES = new Set(["featureGridCell"])

interface Stats {
    paths: string[]
    warnings: string[]
}

async function main() {
    // perspective "raw" is essential: newer API versions default to the "published" perspective,
    // which hides drafts.* documents - draft detection would silently break without it
    const allDocs = await client.fetch<any[]>(
        `*[!(_id in path("_.**")) && !(_type in ["sanity.imageAsset", "sanity.fileAsset"])]`,
        {},
        { perspective: "raw" }
    )
    const byId = new Map<string, any>(allDocs.map((doc) => [doc._id, doc]))
    const resolveDoc = (ref: string) => byId.get(`drafts.${ref}`) ?? byId.get(ref)

    const migrateRef = (value: any, path: string, stats: Stats): any | undefined => {
        const target = resolveDoc(value._ref)
        if (!target) {
            stats.warnings.push(`${path}: unresolvable reference ${value._ref} - left unchanged`)
            return undefined
        }
        const kind = KIND_BY_TYPE[target._type]
        if (!kind) {
            stats.warnings.push(`${path}: unexpected target type '${target._type}' - left unchanged`)
            return undefined
        }
        if (kind === "image") {
            if (!target.image?.asset) {
                stats.warnings.push(`${path}: image illustration ${value._ref} has no image - left unchanged`)
                return undefined
            }
            return { _type: "illustration", kind, image: target.image }
        }
        return { _type: "illustration", kind, [kind]: { _type: "reference", _ref: value._ref } }
    }

    const walk = (node: any, path: string, stats: Stats): any => {
        if (Array.isArray(node)) return node.map((item, i) => walk(item, `${path}[${i}]`, stats))
        if (node === null || typeof node !== "object") return node
        const out: Record<string, any> = {}
        for (const [key, value] of Object.entries(node)) {
            const childPath = path ? `${path}.${key}` : key
            if (
                key === "illustration" && value != null && typeof value === "object" &&
                "_ref" in (value as object) && !SKIP_PARENT_TYPES.has(node._type)
            ) {
                const migrated = migrateRef(value, childPath, stats)
                if (migrated) {
                    out[key] = migrated
                    stats.paths.push(childPath)
                    continue
                }
            }
            out[key] = walk(value, childPath, stats)
        }
        return out
    }

    const logicalIds = [...new Set(allDocs.map((doc) => doc._id.replace(/^drafts\./, "")))].sort()
    const writes: any[] = []
    let warningCount = 0

    for (const id of logicalIds) {
        const draft = byId.get(`drafts.${id}`)
        const base = draft ?? byId.get(id)
        if (!base) continue
        const stats: Stats = { paths: [], warnings: [] }
        const migrated = walk(base, "", stats)
        stats.warnings.forEach((warning) => {
            console.warn(`WARN ${id}: ${warning}`)
            warningCount++
        })
        if (stats.paths.length === 0) continue
        const { _rev, _updatedAt, ...rest } = migrated
        writes.push({ ...rest, _id: `drafts.${id}` })
        console.log(`${draft ? "update draft" : "create draft"}: ${id} (${base._type})`)
        stats.paths.forEach((path) => console.log(`    ${path}`))
    }

    console.log(`\n${writes.length} draft(s) to write, ${warningCount} warning(s). Published documents are never modified.`)
    if (dryRun) {
        console.log("Dry run - nothing written. Set MIGRATE_WRITE=1 to write the drafts.")
        return
    }

    for (let i = 0; i < writes.length; i += 50) {
        const tx = client.transaction()
        writes.slice(i, i + 50).forEach((doc) => tx.createOrReplace(doc))
        await tx.commit()
        console.log(`Committed ${Math.min(i + 50, writes.length)}/${writes.length}`)
    }
    if (writes.length > 0) console.log("Done. Review and publish the drafts in the Studio to complete the migration.")
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
