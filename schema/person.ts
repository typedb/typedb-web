import { UserIcon } from "@sanity/icons";
import { defineField, defineType, SanityDocument, Slug } from "@sanity/types";
import { nameField, nameFieldName, required, titleFieldName } from "./common-fields";
import { Organisation, organisationSchemaName, SanityOrganisation } from "./organisation";
import { SanityDataset, SanityImage, SanityReference } from "./sanity-core";
import { PropsOf } from "./util";

export interface SanityPerson extends SanityDocument {
    name: string;
    internalName?: Slug;
    organisation: SanityReference<SanityOrganisation>;
    jobTitle: string;
    headshot: SanityImage;
    linkedInURL?: string;
    bio?: string;
}

export class Person {
    readonly name: string;
    readonly organisation: Organisation;
    readonly jobTitle: string;
    readonly headshotURL: string;
    readonly linkedInURL?: string;
    readonly bio?: string;

    constructor(props: PropsOf<Person>) {
        this.name = props.name;
        this.organisation = props.organisation;
        this.jobTitle = props.jobTitle;
        this.headshotURL = props.headshotURL;
        this.linkedInURL = props.linkedInURL;
        this.bio = props.bio;
    }

    static fromSanity(data: SanityPerson, db: SanityDataset) {
        return new Person({
            name: data.name,
            organisation: new Organisation(db.resolveRef(data.organisation), db),
            jobTitle: data.jobTitle,
            headshotURL: db.resolveRef(data.headshot.asset).url,
            linkedInURL: data.linkedInURL,
            bio: data.bio,
        });
    }

    jobDescription(): string {
        return this.jobTitle
            ? this.organisation ? `${this.jobTitle} at ${this.organisation.name}` : this.jobTitle
            : this.organisation ? this.organisation.name : "";
    }
}

export const personSchemaName = "person";

const personSchema = defineType({
    name: personSchemaName,
    title: "Person",
    icon: UserIcon,
    type: "document",
    fields: [
        nameField,
        defineField({
            name: "internalName",
            title: "Internal Name (optional)",
            description: "In case we need to duplicate an actual person to override fields under certain conditions - e.g. they wrote a testimonial while holding a previous position",
            type: "slug",
        }),
        defineField({
            name: "organisation",
            title: "Organisation",
            type: "reference",
            to: [{type: organisationSchemaName}],
            validation: required,
        }),
        defineField({
            name: "jobTitle",
            title: "Job Title",
            type: "string",
            validation: required,
        }),
        defineField({
            name: "headshot",
            title: "Headshot",
            type: "image",
            validation: required,
        }),
        defineField({
            name: "linkedInURL",
            title: "LinkedIn URL",
            type: "url",
        }),
        defineField({
            name: "bio",
            title: "Bio",
            type: "text",
        }),
    ],
    preview: {
        select: { name: nameFieldName, internalName: "internalName.current", organisationName: "organisation.name", jobTitle: "jobTitle", headshot: "headshot" },
        prepare: (selection) => ({
            title: selection.internalName || selection.name,
            subtitle: `${selection.jobTitle}, ${selection.organisationName}`,
            media: selection.headshot,
        }),
    },
});

export const personSchemas = [personSchema];
