import { ResourceLink } from "../resource/base";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { SanityHotTopicsSection, SectionCore } from "./section";

// Lives outside section.ts deliberately: importing ResourceLink there at runtime closes the
// module cycle section.ts -> resource/base.ts -> resource/section.ts -> section.ts, which
// breaks Sanity's schema extraction ("Class extends value undefined").
export class HotTopicsSection extends SectionCore {
    readonly hotTopics: ResourceLink[];

    constructor(props: PropsOf<HotTopicsSection>) {
        super(props);
        this.hotTopics = props.hotTopics;
    }

    static override fromSanity(data: SanityHotTopicsSection, db: SanityDataset) {
        return new HotTopicsSection(Object.assign(SectionCore.fromSanity(data, db), {
            hotTopics: data.hotTopics?.flatMap((x) => {
                const resource = db.tryResolveRef(x);
                // A missing resource document leaves nothing to render - skip the entry
                if (!resource) console.warn(`Hot topics section references a resource that could not be resolved: `, x);
                return resource ? [ResourceLink.fromSanity(resource, db, false)] : [];
            }) || [],
        }));
    }
}
