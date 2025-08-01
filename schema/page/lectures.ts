import { defineField, defineType } from "@sanity/types";
import {
    collapsibleOptions, isVisibleField, requiredRule, SanityVisibleToggle, titleAndBodyFields,
} from "../common-fields";
import { SanitySectionBase, SectionBase } from "../component/section";
import { SanityLecture, lectureSchemaName } from "../resource/sanity";
import { SanityDataset, SanityReference } from "../sanity-core";
import { SanityTitleAndBody, TitleAndBody } from "../text";
import { PropsOf } from "../util";
import { Lecture } from "../resource/lecture";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

export interface SanityLecturesPage extends SanityPage {
    introSection: SanityIntroSection;
    featuredLecturesSection: SanityFeaturedLecturesSection;
    exploreLecturesSection: SanityExploreLecturesSection;
}

export interface SanityIntroSection extends SanityTitleAndBody {
    featuredLecture?: SanityReference<SanityLecture>;
}

export interface SanityFeaturedLecturesSection extends SanitySectionBase, SanityVisibleToggle {
    featuredLectures?: SanityReference<SanityLecture>[];
}

export interface SanityExploreLecturesSection extends SanitySectionBase, SanityVisibleToggle {}

export class LecturesPage extends Page {
    readonly introSection: IntroSection;
    readonly featuredLecturesSection?: FeaturedLecturesSection;
    readonly exploreLecturesSection?: ExploreLecturesSection;

    constructor(data: SanityLecturesPage, db: SanityDataset) {
        super(data, db);
        this.introSection = IntroSection.fromSanityIntroSection(data.introSection, db);
        this.featuredLecturesSection = data.featuredLecturesSection.isVisible
            ? FeaturedLecturesSection.fromSanity(data.featuredLecturesSection, db)
            : undefined;
        this.exploreLecturesSection = data.exploreLecturesSection.isVisible
            ? ExploreLecturesSection.fromSanity(data.exploreLecturesSection, db)
            : undefined;
    }
}

export class IntroSection extends TitleAndBody {
    featuredLecture?: Lecture;

    constructor(props: PropsOf<IntroSection>) {
        super(props);
        this.featuredLecture = props.featuredLecture;
    }

    static fromSanityIntroSection(data: SanityIntroSection, db: SanityDataset) {
        return new IntroSection(
            Object.assign(TitleAndBody.fromSanityTitleAndBody(data), {
                featuredLecture: data.featuredLecture
                    ? Lecture.fromSanity(db.resolveRef(data.featuredLecture), db)
                    : undefined,
            })
        );
    }
}

export class FeaturedLecturesSection extends SectionBase {
    featuredLectures?: Lecture[];

    constructor(props: PropsOf<FeaturedLecturesSection>) {
        super(props);
        this.featuredLectures = props.featuredLectures;
    }

    static override fromSanity(data: SanityFeaturedLecturesSection, db: SanityDataset) {
        return new FeaturedLecturesSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                featuredLectures: data.featuredLectures
                    ? data.featuredLectures.map((x) => Lecture.fromSanity(db.resolveRef(x), db))
                    : undefined,
            })
        );
    }
}

export class ExploreLecturesSection extends SectionBase {
    constructor(props: PropsOf<ExploreLecturesSection>) {
        super(props);
    }

    static override fromSanity(data: SanitySectionBase, db: SanityDataset) {
        return new ExploreLecturesSection(Object.assign(SectionBase.fromSanity(data, db), {}));
    }
}

export const lecturesPageSchemaName = "lecturesPage";
const introSectionSchemaName = `${lecturesPageSchemaName}_introSection`;
const featuredLecturesSectionSchemaName = `${lecturesPageSchemaName}_featuredLecturesSection`;
const exploreLecturesSectionSchemaName = `${lecturesPageSchemaName}_exploreLecturesSection`;

const introSectionSchema = defineType({
    name: introSectionSchemaName,
    title: "Section",
    type: "object",
    fields: [
        ...titleAndBodyFields,
        defineField({
            name: "featuredLecture",
            title: "Featured Lecture",
            description:
                "If unset, the next lecture will be displayed, or the most recent one if no lectures are scheduled",
            type: "reference",
            to: [{ type: lectureSchemaName }],
        }),
        isVisibleField,
    ],
});

const featuredLecturesSectionSchema = defineType({
    name: featuredLecturesSectionSchemaName,
    title: "Section",
    type: "object",
    fields: [
        ...titleAndBodyFields,
        defineField({
            name: "featuredLectures",
            title: "Featured Lectures",
            description:
                "If unset, the next 3 lectures will be displayed, falling back to the most recent ones if < 3 lectures are scheduled",
            type: "array",
            of: [{ type: "reference", to: [{ type: lectureSchemaName }] }],
        }),
        isVisibleField,
    ],
});

const exploreLecturesSectionSchema = defineType({
    name: exploreLecturesSectionSchemaName,
    title: "Section",
    type: "object",
    fields: [...titleAndBodyFields, isVisibleField],
});

const lecturesPageSchema = defineType({
    name: lecturesPageSchemaName,
    title: "Lectures Page",
    type: "document",
    fields: [
        metaTagsField,
        defineField({
            name: "introSection",
            title: "Intro Section",
            description: "The primary featured lecture will be displayed in this section",
            type: introSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
        defineField({
            name: "featuredLecturesSection",
            title: "Featured Lectures Section",
            description: "The secondary featured lectures will be displayed in this section",
            type: featuredLecturesSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
        defineField({
            name: "exploreLecturesSection",
            title: "Explore Lectures Section",
            description: "A searchable list of all our lectures will be displayed in this section",
            type: exploreLecturesSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
    ],
    preview: {
        prepare: (_selection) => ({ title: "Lectures Page" }),
    },
});

export const lecturesPageSchemas = [
    introSectionSchema, featuredLecturesSectionSchema, exploreLecturesSectionSchema, lecturesPageSchema,
];
