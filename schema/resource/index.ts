import { Link } from "../link";
import { PropsOf } from "../util";
import { ApplicationArticle, Article, articleSchemas, BlogPost, BlogPostLink, FundamentalArticle } from "./article";
import { SiteResource, ResourceLink } from "./base";
import { GenericResource, genericResourceSchema } from "./generic";
import { LiveEvent, liveEventSchema } from "./live-event";
import { Lecture, lectureSchemas } from "./lecture";
import { sectionSchemas } from "./section";
import { Paper, paperSchema } from "./paper";

export type Resource = SiteResource | GenericResource;

export function resourceLinkOf(resource: Resource, useLongTitle = false): ResourceLink {
    if (resource instanceof GenericResource) {
        return new ResourceLink(resource);
    }
    const commonProps: PropsOf<ResourceLink> = {
        title: useLongTitle ? resource.title.toPlainText() : resource.shortTitle,
        description: resource.shortDescription,
        link: resourceLinkProp(resource),
        linkText: resourceLinkText(resource),
    };
    if (resource instanceof BlogPost) {
        return new BlogPostLink(Object.assign(commonProps, {
            author: resource.author,
            imageURL: resource.heroImageURL(),
        }));
    } else return new ResourceLink(commonProps);
}

export function blogPostLinkOf(post: BlogPost): BlogPostLink {
    return resourceLinkOf(post, true) as BlogPostLink;
}

function resourceUrl(resource: Resource): string {
    if (resource instanceof FundamentalArticle) return `/fundamentals/${resource.slug}`;
    else if (resource instanceof ApplicationArticle) return `/applications/${resource.slug}`;
    else if (resource instanceof BlogPost) return `/blog/${resource.slug}`;
    else if (resource instanceof Lecture) return `/lectures/${resource.slug}`;
    else if (resource instanceof Paper) return `/papers/${resource.slug}`;
    else if (resource instanceof LiveEvent) return `/events/${resource.slug}`;
    else if (resource instanceof GenericResource) return resource.link.destination;
    else return "";
}

function resourceLinkProp(resource: Resource): Link {
    if (resource instanceof GenericResource) return resource.link;
    else return new Link({
        destination: resourceUrl(resource),
        type: "route",
        opensNewTab: false,
    });
}

function resourceLinkText(resource: Resource): string {
    if (resource instanceof Article) return `Read article`;
    else if (resource instanceof Lecture) return `Watch lecture`;
    else if (resource instanceof Paper) return `Read paper`;
    else if (resource instanceof LiveEvent) return `Go to event`;
    else if (resource instanceof GenericResource) return resource.linkText;
    else return "";
}

export const resourceSchemas: any[] = [...articleSchemas, genericResourceSchema, liveEventSchema, ...lectureSchemas, ...sectionSchemas, paperSchema];
