import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

import { BlogPost } from "typedb-web-schema";

export interface BlogPostingSchema {
    "@context": "https://schema.org";
    "@type": "BlogPosting";
    headline: string;
    description?: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    author: {
        "@type": "Person";
        name: string;
        url?: string;
    };
    publisher: {
        "@type": "Organization";
        name: string;
        logo?: {
            "@type": "ImageObject";
            url: string;
        };
    };
    mainEntityOfPage: {
        "@type": "WebPage";
        "@id": string;
    };
}

export interface BlogSchema {
    "@context": "https://schema.org";
    "@type": "Blog";
    name: string;
    description?: string;
    url: string;
    publisher: {
        "@type": "Organization";
        name: string;
        logo?: {
            "@type": "ImageObject";
            url: string;
        };
    };
}

@Injectable({
    providedIn: "root",
})
export class JsonLdService {
    private scriptElement: HTMLScriptElement | null = null;

    private readonly PUBLISHER = {
        "@type": "Organization" as const,
        name: "TypeDB",
        logo: {
            "@type": "ImageObject" as const,
            url: "https://typedb.com/assets/meta/android-chrome-512x512.png",
        },
    };

    constructor(@Inject(DOCUMENT) private doc: Document) {}

    setForBlogPost(post: BlogPost, pageUrl: string): void {
        const schema: BlogPostingSchema = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title.toPlainText(),
            description: post.shortDescription,
            image: post.heroImageURL(),
            datePublished: post.date.toISOString(),
            author: {
                "@type": "Person",
                name: post.author.name,
            },
            publisher: this.PUBLISHER,
            mainEntityOfPage: {
                "@type": "WebPage",
                "@id": pageUrl,
            },
        };

        this.setJsonLd(schema);
    }

    setForBlogListing(name: string, description: string | undefined, pageUrl: string): void {
        const schema: BlogSchema = {
            "@context": "https://schema.org",
            "@type": "Blog",
            name,
            description,
            url: pageUrl,
            publisher: this.PUBLISHER,
        };

        this.setJsonLd(schema);
    }

    remove(): void {
        if (this.scriptElement && this.scriptElement.parentNode) {
            this.scriptElement.parentNode.removeChild(this.scriptElement);
            this.scriptElement = null;
        }
    }

    private setJsonLd(schema: BlogPostingSchema | BlogSchema): void {
        this.remove();

        this.scriptElement = this.doc.createElement("script");
        this.scriptElement.type = "application/ld+json";
        this.scriptElement.text = JSON.stringify(schema);
        this.doc.head.appendChild(this.scriptElement);
    }
}
