import React from "react";
import {DefaultLayout} from "../../common/layout/default-layout";
import {vaticleStyles} from "../../common/styles/vaticle-styles";
import {legalPageStyles} from "./privacy-policy-styles";
import clsx from "clsx";
import { ClassProps } from "../../common/class-props";

interface Cookie {
    source: string;
    name: string;
    purpose: string;
}

export const PrivacyPolicyPage: React.FC = () => {
    const classes = vaticleStyles();

    const cookies: Cookie[] = [{
        source: "Google Analytics",
        name: "_ga",
        purpose: "Used to distinguish users.",
    }, {
        source: "Google Analytics",
        name: "_gat",
        purpose: "Used to distinguish users.",
    }, {
        source: "Google Analytics",
        name: "_gid",
        purpose: "Used to distinguish users.",
    }];

    return (
        <DefaultLayout>
            <Section className={classes.firstSection}>
                <Heading>Privacy Policy</Heading>

                <Paragraph>
                    This privacy policy is for this website (Vaticle) and governs the privacy of its users who choose to
                    use
                    it. The policy sets out the different areas where user privacy is concerned and outlines the
                    obligations
                    and requirements of the users, the website and website owners. Furthermore, the way this website
                    processes, stores and protects user data and information will also be detailed within this policy.
                </Paragraph>
            </Section>

            <Section>
                <Heading>The Website</Heading>

                <Paragraph>
                    Vaticle Ltd (“We”) take a proactive approach to user privacy and ensure the necessary steps are
                    taken to protect the privacy of its users throughout their visiting experience. This website
                    complies to all UK national laws and requirements for user privacy
                </Paragraph>
            </Section>

            <Section>
                <Heading>Use of Cookies</Heading>

                <Paragraph>
                    This website uses cookies to better the users experience while visiting the website. Where
                    applicable this website uses a cookie control system allowing the user on their first visit to the
                    website to allow or disallow the use of cookies on their computer / device. This complies with
                    recent legislation requirements for websites to obtain explicit consent from users before leaving
                    behind or reading files such as cookies on a user's computer / device.
                </Paragraph>

                <Paragraph>
                    Cookies are small files saved to the user's computers hard drive that track, save and store
                    information about the user's interactions and usage of the website. This allows the website, through
                    its server to provide the users with a tailored experience within this website.
                </Paragraph>

                <Paragraph>
                    Users are advised that if they wish to deny the use and saving of cookies from this website on to
                    their computers hard drive they should take necessary steps within their web browsers security
                    settings to block all cookies from this website and its external serving vendors.
                </Paragraph>

                <Paragraph>
                    This website uses tracking software to monitor its visitors to better understand how they use it.
                    This software is provided by Google Analytics and Hotjar which uses cookies to track visitor usage.
                    The software will save a cookie to your computer’s hard drive in order to track and monitor your
                    engagement and usage of the website, but will not store, save or collect personal information. For
                    further information, you can read Google's privacy policy <a
                    href="https://www.google.com/policies/privacy/" target="_blank">here</a>,
                    and Hotjar’s privacy policy <a href="https://www.hotjar.com/privacy" target="_blank">here</a>.
                </Paragraph>

                <Paragraph>
                    The cookies used by Vaticle website are described in the list below.
                </Paragraph>
            </Section>

            <Section>
                <Table>
                    <TableHeader titles={["Source", "Name", "Purpose"]}/>
                    <TableBody>
                        {cookies.map(({source, name, purpose}) => (
                            <tr>
                                <td>{source}</td>
                                <td>{name}</td>
                                <td>{purpose}</td>
                            </tr>
                        ))}
                    </TableBody>
                </Table>
            </Section>

            <Section>
                <Heading>Contact &amp; Communication</Heading>

                <Paragraph>
                    Users contacting Vaticle do so at their own discretion and provide any such personal details
                    requested
                    at their own risk. Your personal information is kept private and stored securely until a time it is
                    no longer required or has no use, as detailed in the Data Protection Act 1998. Every effort has been
                    made to ensure a safe and secure form to email submission process but advise users using such form
                    to email processes that they do so at their own risk.
                </Paragraph>

                <Paragraph>
                    We use any information submitted to provide you with further information about the products/services
                    we offer or to assist you in answering any questions or queries you may have submitted. This may
                    include using your details to subscribe you to any email newsletter program the website may operate
                    but only if this was made clear to you and your express permission was granted when submitting any
                    form to email process. Or whereby you the consumer have previously purchased from or enquired about
                    purchasing from the company a product or service that the email newsletter relates to. This is by no
                    means an entire list of your user rights in regard to receiving email marketing material. Your
                    details are not passed on to any third parties.
                </Paragraph>
            </Section>

            <Section>
                <Heading>Email Newsletter</Heading>

                <Paragraph>
                    We may operate an email newsletter program, used to inform subscribers about products and services
                    supplied by this website. Users can subscribe through an online automated process should they wish
                    to do so but do so at their own discretion. Some subscriptions may be manually processed through
                    prior written agreement with the user.
                </Paragraph>

                <Paragraph>
                    Subscriptions are taken in compliance with UK Spam Laws detailed in the Privacy and Electronic
                    Communications Regulations 2003. All personal details relating to subscriptions are held securely
                    and in accordance with the Data Protection Act 1998. No personal details are passed on to third
                    parties nor shared with companies/people outside of the company that operates this website. Under
                    the Data Protection Act 1998 you may request a copy of personal information held about you by this
                    website's email newsletter program. A small fee will be payable. If you would like a copy of the
                    information held on you, please write to the business address contained in the About Us page of
                    Vaticle.
                </Paragraph>

                <Paragraph>
                    Email marketing campaigns published by this website or its owners may contain tracking facilities
                    within the actual email. Subscriber activity is tracked and stored in a database for future analysis
                    and evaluation. Such tracked activity may include but is not limited to the opening of emails,
                    forwarding of emails, the clicking of links within the email content, times, dates and frequency of
                    activity. This information may be used to refine future email campaigns and supply the user with
                    more relevant content based around their activity.
                </Paragraph>

                <Paragraph>
                    In compliance with UK Spam Laws and the Privacy and Electronic Communications Regulations 2003
                    subscribers are given the opportunity to un-subscribe at any time through an automated system. This
                    process is detailed at the footer of each email campaign. If an automated un-subscription system is
                    unavailable clear instructions on how to un-subscribe will by detailed instead.
                </Paragraph>
            </Section>

            <Section>
                <Heading>External Links</Heading>

                <Paragraph>
                    Although Vaticle only looks to include quality, safe and relevant external links, users are advised
                    to adopt a policy of caution before clicking any external web links included throughout this
                    website. (External links are clickable text/icon/banner/image links to other websites.)
                </Paragraph>

                <Paragraph>
                    Clicking on any such link may send you to the external website through a referral program which may
                    use cookies and will may track the number of referrals sent from this website. This may include the
                    use of cookies which may in turn be saved on your computer’s hard drive.
                </Paragraph>

                <Paragraph>
                    Vaticle cannot guarantee or verify the contents of any externally linked website despite our best
                    efforts. Users should therefore note they click on external links at their own risk and this website
                    and its owners cannot be held liable for any damages or implications caused by visiting any external
                    links mentioned.
                </Paragraph>
            </Section>

            <Section>
                <Heading>Social Media Platforms</Heading>

                <Paragraph>
                    Communication, engagement and actions taken through external social media platforms that we
                    participate in are subject to the terms and conditions as well as the privacy policies held with
                    each social media platform respectively.
                </Paragraph>

                <Paragraph>
                    Users are advised to use social media platforms wisely and communicate/engage upon them with due
                    care and caution in regard to their own privacy and personal details. Vaticle will never ask for
                    personal or sensitive information through social media.
                </Paragraph>

                <Paragraph>
                    This website may use social sharing buttons which help share web content directly from web pages
                    to the social media platform in question. Users are advised before using such social sharing buttons
                    that they do so at their own discretion and note that the social media platform may track and save
                    your request to share a web page respectively through your social media platform account. We are not
                    responsible for any content generated by user while using this function.
                </Paragraph>
            </Section>

            <Section>
                <Heading>Shortened Links in Social Media</Heading>

                <Paragraph>
                    Vaticle Ltd through their social media platform accounts may share web links to relevant web
                    pages. By default, some social media platforms shorten lengthy URLs.
                </Paragraph>

                <Paragraph>
                    Users are advised to take caution and good judgment before clicking any shortened URLs published on
                    social media platforms by this website and its owners. Despite the best efforts to ensure only
                    genuine URLs are published many social media platforms are prone to spam and hacking and therefore
                    this website and its owners cannot be held liable for any damages or implications caused by
                    visiting any shortened links.
                </Paragraph>
            </Section>

            <Section>
                <Heading>Security of Your Information</Heading>

                <Paragraph>
                    We maintain electronic and procedural safeguards in connection with the collection, storage and
                    disclosure of personally identifiable user information. Our security procedures mean that we may
                    request proof of identity before we disclose personal information to you.
                </Paragraph>
            </Section>

            <Section>
                <Heading>Resources &amp; Further Information</Heading>

                <List>
                    <li><a href="https://www.legislation.gov.uk/ukpga/1998/29/contents" target="_blank">Data Protection
                        Act 1998</a></li>
                    <li><a href="https://www.legislation.gov.uk/uksi/2003/2426/contents/made" target="_blank">Privacy
                        and Electronic Communications Regulations 2003</a></li>
                    <li><a
                        href="https://www.ico.gov.uk/for_organisations/privacy_and_electronic_communications/the_guide.aspx"
                        target="_blank">Privacy and Electronic Communications Regulations 2003 - The Guide</a></li>
                    <li><a href="https://twitter.com/privacy" target="_blank">Twitter Privacy Policy</a></li>
                    <li><a href="https://www.facebook.com/about/privacy/" target="_blank">Facebook Privacy Policy</a>
                    </li>
                    <li><a href="https://www.google.com/privacy.html" target="_blank">Google Privacy Policy</a></li>
                    <li><a href="https://developers.facebook.com/policy" target="_blank">Facebook Platform Policies</a>
                    </li>
                    <li><a href="https://dev.twitter.com/overview/terms/agreement-and-policy" target="_blank">Developer
                        Agreement &amp; Policy | Twitter Developers</a></li>
                </List>
            </Section>

            <Section>
                <Heading>We may update this Policy</Heading>

                <Paragraph>
                    From time to time we may change our privacy policies. We will notify you of any material changes to
                    our Policy as required by law. We will also post an updated copy on our website. Please check our
                    site periodically for updates.
                </Paragraph>

                <Paragraph>
                    Vaticle Ltd., 3rd floor, East, 47-50 Margaret St, London W1W 8SE, UK
                </Paragraph>
            </Section>
        </DefaultLayout>
    );
};

const Section: React.FC<ClassProps> = ({children, className}) => {
    const classes = Object.assign({}, vaticleStyles(), legalPageStyles());
    // NOTE: className overrides contentMargin class
    return <section className={clsx(classes.legalSection, className || classes.contentMargin)}>{children}</section>;
}

const Heading: React.FC = ({children}) => {
    const classes = Object.assign({}, vaticleStyles(), legalPageStyles());
    return <h2 className={classes.h2}>{children}</h2>;
}

const Paragraph: React.FC = ({children}) => {
    const classes = Object.assign({}, vaticleStyles(), legalPageStyles());
    return <p className={clsx(classes.mediumText, classes.legalParagraph)}>{children}</p>;
}

const List: React.FC = ({children}) => {
    const classes = Object.assign({}, vaticleStyles(), legalPageStyles());
    return <ul className={clsx(classes.mediumText, classes.legalList)}>{children}</ul>;
}

const Table: React.FC = ({children}) => {
    const classes = Object.assign({}, vaticleStyles(), legalPageStyles());
    return <table className={clsx(classes.comparisonTable)}>{children}</table>;
}

interface TableHeaderProps {
    titles: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({titles}) => {
    const classes = Object.assign({}, vaticleStyles(), legalPageStyles());
    return (
        <thead className={clsx(classes.comparisonTableHeader)}>
        {titles.map(title => <th className={classes.comparisonTableHeaderItem}>{title}</th>)}
        </thead>
    );
}

const TableBody: React.FC = ({children}) => {
    const classes = legalPageStyles();
    return (
        <tbody className={clsx(classes.comparisonTableBody)}>
        {children}
        </tbody>
    );
}
