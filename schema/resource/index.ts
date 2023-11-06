import { Link } from "../link";
import { PropsOf } from "../util";
import { ApplicationArticle, articleSchemas, BlogPost, BlogPostLink, FundamentalArticle } from "./article";
import { Resource, ResourceLink } from "./base";
import { GenericResource, genericResourceSchema } from "./generic";
import { LiveEvent, liveEventSchema } from "./live-event";
import { Webinar, webinarSchemas } from "./webinar";
import { WhitePaper, whitePaperSchema } from "./white-paper";

export function resourceLinkOf(resource: Resource): ResourceLink {
    const commonProps: PropsOf<ResourceLink> = {
        title: resource.shortTitle,
        description: resource.shortDescription,
        link: resourceLinkProp(resource),
    };
    if (isBlogPost(resource)) { // TODO: should use 'instanceof' but TransferState won't support it
        return new BlogPostLink(Object.assign(commonProps, {
            author: resource.author,
            imageURL: resource.heroImageURL(),
        }));
    } else return new ResourceLink(commonProps);
}

function isBlogPost(resource: Resource): resource is BlogPost {
    return "level" in resource;
}

export function blogPostLinkOf(post: BlogPost): BlogPostLink {
    return resourceLinkOf(post) as BlogPostLink;
}

function resourceUrl(resource: Resource): string {
    if (resource instanceof FundamentalArticle) return `/learn/fundamentals/${resource.slug}`;
    else if (resource instanceof ApplicationArticle) return `/learn/applications/${resource.slug}`;
    else if (resource instanceof BlogPost) return `/blog/${resource.slug}`;
    else if (resource instanceof Webinar) return `/webinars/${resource.slug}`;
    else if (resource instanceof WhitePaper) return `/white-papers/${resource.slug}`;
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

export const resourceSchemas = [...articleSchemas, genericResourceSchema, liveEventSchema, ...webinarSchemas, whitePaperSchema];
