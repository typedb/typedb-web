import { escapeHtml, generateLink, Link } from "../shared";
import { sanitiseHtmlID } from "../shared/sanitise-html-id";
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
    const buttonEl = generateLink({
        content: button.text,
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
            return generateLink({
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
            const link = generateLink({
                content: `${icon}${text}`,
                link: getContactLink(contactMedia, communityResources),
                id: sanitiseHtmlID(`footer_${contactSectionTitle}_${contactMedias[contactMedia]}`),
                urlPrefix,
            });
            return `<li>${link}</li>`;
        })
        .join("");
    const contactList = `<ul>${contactItems}</ul>`;
    const contact = `<div class="td-footer-contact">${contactTitle}${contactList}</div>`;

    const sitemapColumns = columns
        .map(({ items, title }) => {
            const columnTitle = `<h3>${escapeHtml(title)}</h3>`;
            const columnItems = items
                .map(({ link, text }) => generateLink({
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
    // const copyrightYear = new Date().getFullYear();
    // const copyrightLine1 = `© ${copyrightYear} Vaticle Ltd`;
    // const copyrightLine2 = `Vaticle™, TypeDB™ and TypeQL™ are trademarks of Vaticle Ltd`;
    // const copyright = `<aside>${copyrightLine1} <br /> ${copyrightLine2}</aside>`;

    // return `<div class="td-footer-section td-footer-section-copyright">${copyright}</div>`;
    return `<div class="td-footer-section td-footer-section-copyright"></div>`;
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
