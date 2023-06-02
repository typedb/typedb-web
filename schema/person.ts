import { UserIcon } from "@sanity/icons";
import { defineField, defineType, SanityDocument } from "@sanity/types";
import { nameField, requiredRule } from "./common-fields";
import { Organisation, organisationSchemaName, SanityOrganisation } from "./organisation";
import { SanityDataset, SanityImage, SanityReference } from "./sanity-core";
import { PropsOf } from "./util";

export interface SanityPerson extends SanityDocument {
    name: string;
    organisation: SanityReference<SanityOrganisation>;
    jobTitle: string;
    headshot: SanityImage;
    linkedInURL?: string;
}

export class Person {
    readonly name: string;
    readonly organisation: Organisation;
    readonly jobTitle: string;
    readonly headshotURL: string;
    readonly linkedInURL?: string;

    constructor(props: PropsOf<Person>) {
        this.name = props.name;
        this.organisation = props.organisation;
        this.jobTitle = props.jobTitle;
        this.headshotURL = props.headshotURL;
        this.linkedInURL = props.linkedInURL;
    }

    static fromSanity(data: SanityPerson, db: SanityDataset) {
        return new Person({
            name: data.name,
            organisation: new Organisation(db.resolveRef(data.organisation), db),
            jobTitle: data.jobTitle,
            headshotURL: db.resolveRef(data.headshot.asset).url,
            linkedInURL: data.linkedInURL,
        });
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
            name: "organisation",
            title: "Organisation",
            type: "reference",
            to: [{type: organisationSchemaName}],
            validation: requiredRule,
        }),
        defineField({
            name: "jobTitle",
            title: "Job Title",
            type: "string",
            validation: requiredRule,
        }),
        defineField({
            name: "headshot",
            title: "Headshot",
            type: "image",
            validation: requiredRule,
        }),
        defineField({
            name: "linkedInURL",
            title: "LinkedIn URL",
            type: "url",
        }),
    ],
});

export const personSchemas = [personSchema];
