import { escapeHtml, linkHtml, Link, sanitiseHtmlID } from "../shared";
import { FooterData } from "./footer-query";

interface GenerateParams {
    data: FooterData;
    urlPrefix: string;
}

export const generateFooter = (data: FooterData, urlPrefix = ""): string => {
    const params: GenerateParams = { data, urlPrefix };
    const socialSection = generateSocialSection(params);
    const navSection = generateNavSection(params);
    const copyrightSection = generateCopyrightSection();
    return `<footer class="td-footer">${socialSection}${navSection}${copyrightSection}</footer>`;
};

const generateSocialSection = (params: GenerateParams) => {
    const {
        data: {
            footer: { button, socialMediaLinks },
            communityResources,
        },
        urlPrefix,
    } = params;

    const buttonClasses = [`button-${button.style}`, "text-p2"].join(" ");
    const buttonEl = linkHtml({
        content: `<span>${escapeHtml(button.text)}</span>`,
        link: button.link,
        id: sanitiseHtmlID(`footer_${button.text}`),
        urlPrefix,
        attributes: { class: buttonClasses, tabindex: "0" },
    });

    const links = socialMediaLinks
        .map((socialMedia) => {
            const socialMedias: Record<string, string> = {
                discord: "Discord",
                meetup: "Meetup",
                twitter: "Twitter",
                youtube: "YouTube",
                linkedin: "LinkedIn",
            };
            const classes = ["td-footer-icon", `td-footer-icon-${socialMedia}`].join(" ");
            const content = `<span class="${classes}">${socialMedias[socialMedia]}</span>`;
            return linkHtml({
                content,
                link: {
                    destination: { current: communityResources[`${socialMedia}URL`] },
                    opensNewTab: false,
                    type: "external",
                },
                id: sanitiseHtmlID(`footer_socials_${socialMedia}`),
                urlPrefix,
            });
        })
        .join("");
    const linksEl = `<div class="td-footer-social-links">${links}</div>`;

    return `<div class="td-footer-section td-footer-section-social">${buttonEl}${linksEl}</div>`;
};

const generateNavSection = (params: GenerateParams) => {
    const {
        data: {
            footer: { columns, contactMediaLinks, contactSectionTitle },
            communityResources,
        },
        urlPrefix,
    } = params;

    const contactTitle = `<h3>${escapeHtml(contactSectionTitle)}</h3>`;
    const contactItems = contactMediaLinks
        .map((contactMedia) => {
            const contactMedias: Record<string, string> = {
                forum: "Discuss on Forum",
                discord: "Chat on Discord",
                contactForm: "Contact Us",
                feedbackForm: "Provide Feedback",
            };
            const iconClasses = ["td-footer-icon", `td-footer-icon-${contactMedia}`].join(" ");
            const icon = `<span class="${iconClasses}"></span>`;
            const text = `<p>${contactMedias[contactMedia]}</p>`;
            const link_ = linkHtml({
                content: `${icon}${text}`,
                link: getContactLink(contactMedia, communityResources),
                id: sanitiseHtmlID(`footer_${contactSectionTitle}_${contactMedias[contactMedia]}`),
                urlPrefix,
            });
            return `<li>${link_}</li>`;
        })
        .join("");
    const contactList = `<ul>${contactItems}</ul>`;
    const contact = `<div class="td-footer-contact">${contactTitle}${contactList}</div>`;

    const sitemapColumns = columns
        .map(({ items, title }) => {
            const columnTitle = `<h3>${escapeHtml(title)}</h3>`;
            const columnItems = items
                .map(({ link, text }) => linkHtml({
                    content: escapeHtml(text),
                    link,
                    id: sanitiseHtmlID(`footer_${title}_${text}`),
                    urlPrefix,
                }))
                .map((link) => {
                    return `<li>${link}</li>`;
                })
                .join("");
            const columnList = `<ul>${columnItems}</ul>`;
            return `<div>${columnTitle}${columnList}</div>`;
        })
        .join("");
    const sitemap = `<div class="td-footer-sitemap">${sitemapColumns}</div>`;

    return `<nav class="td-footer-section td-footer-section-nav">${contact}${sitemap}</nav>`;
};

const generateCopyrightSection = () => {
    const copyrightYear = new Date().getFullYear();
    const copyrightLine1 = `© ${copyrightYear} TypeDB Ltd`;
    const copyrightLine2 = `TypeDB™ and TypeQL™ are trademarks of TypeDB Ltd`;
    const copyright = `<aside class="text-muted">${copyrightLine1} <br /> ${copyrightLine2}</aside>`;

    return `<div class="td-footer-section td-footer-section-copyright">${copyright}</div>`;
};

const getContactLink = (contactMedia: string, communityResources: Record<string, string>): Link | null => {
    switch (contactMedia) {
        case "contactForm":
            return { destination: { current: "?dialog=contact" }, type: "route", opensNewTab: false };
        case "discord":
            return {
                destination: { current: communityResources["discordURL"] || "" },
                type: "external",
                opensNewTab: true,
            };
        case "forum":
            return {
                destination: { current: communityResources["discussionForumURL"] || "" },
                type: "external",
                opensNewTab: false,
            };
        case "feedbackForm":
            return { destination: { current: "?dialog=feedback" }, type: "route", opensNewTab: false };
    }
    return null;
};
