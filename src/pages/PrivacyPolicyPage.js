import React from 'react';
const tableCookie = [
  { item: 'Google Analytics', cookie: '_ga ', purpose: 'Used to distinguish users.'},
  { item: 'Google Analytics ', cookie: '_gat', purpose: 'Used to distinguish users.'},
  { item: 'Google Analytics ', cookie: '_gid', purpose: 'Used to distinguish users.'},
  { item: 'HotJar', cookie: 'hjClosedSurveyInvites', purpose: 'This cookie is set once a visitor interacts with a Survey invitation modal pop-up. It is used to ensure that the same invite does not re-appear if it has already been shown.'},
  { item: 'HotJar', cookie: '_hjDonePolls', purpose: 'This cookie is set once a visitor completes a Poll using the Feedback Poll widget. It is used to ensure that the same Poll does not re-appear if it has already been filled in.'},
  { item: 'HotJar', cookie: '_hjMinimizedPolls', purpose: 'This cookie is set once a visitor minimizes a Feedback Poll widget. It is used to ensure that the widget stays minimized when the visitor navigates through your site.'},
  { item: 'HotJar', cookie: '_hjDoneTestersWidgets', purpose: 'This cookie is set once a visitor submits their information in the Recruit User Testers widget. It is used to ensure that the same form does not re-appear if it has already been filled in.'},
  { item: 'HotJar', cookie: '_hjMinimizedTestersWidgets', purpose: 'This cookie is set once a visitor minimizes a Recruit User Testers widget. It is used to ensure that the widget stays minimized when the visitor navigates through your site.'},
  { item: 'HotJar', cookie: '_hjDoneSurveys', purpose: 'This cookie is set once a visitor completes a survey. It is used to only load the survey content if the visitor hasnt completed the survey yet.'},
  { item: 'HotJar', cookie: '_hjIncludedInSample', purpose: 'This session cookie is set to let Hotjar know whether that visitor is included in the sample which is used to generate funnels.'},
  { item: 'HotJar', cookie: '_hjShownFeedbackMessage', purpose: 'This cookie is set when a visitor minimizes or completes Incoming Feedback. This is done so that the Incoming Feedback will load as minimized immediately if they navigate to another page where it is set to show.'},
];

const renderTable = (table, title1="Premium", title2="Advanced") => {
  return (
    <div className="support-page__comparisson__table">
      <div className="support-page__comparisson__table__header">
        <span className="support-page__comparisson__table__header__item support-page__comparisson__table__header__item--empty" />
        <span className="support-page__comparisson__table__header__item">{title1}</span>
        <span className="support-page__comparisson__table__header__item">{title2}</span>
      </div>
    {
      table.map((elem, index) => {
        return (
          <div className="support-page__comparisson__table__row" key={`${elem.cookie}__table__desktop`}>
            <span className="support-page__comparisson__table__row__item support-page__comparisson__table__row__item__mod">{elem.item}</span>
            <span className="support-page__comparisson__table__row__item support-page__comparisson__table__row__item__mod">{elem.cookie}</span>
            <span className="support-page__comparisson__table__row__item support-page__comparisson__table__row__item__mod">{elem.purpose}</span>
          </div>
        );
      })
    }
    </div>
  )
}

const renderTableMobile = (table, title1="Premium", title2="Advanced") => {
  return (
    <div className="support-page__comparisson__table__mobile">
    {
      table.map((elem, index) => {
        return (
          <div className="support-page__comparisson__table__mobile__row" key={`${elem.cookie}__table__desktop`}>
            <span className="support-page__comparisson__table__mobile__row__item ">{elem.item}</span>
            <div className="support-page__comparisson__table__mobile__row__item support-page__comparisson__table__mobile__row__item--split support-page__comparisson__table__mobile__row__item__mod">
              <span>{title1}</span>
              <span>{elem.cookie}</span>
            </div>
            <div className="support-page__comparisson__table__mobile__row__item support-page__comparisson__table__mobile__row__item--split support-page__comparisson__table__mobile__row__item__mod">
              <span>{title2}</span>
              <span>{elem.purpose}</span>
            </div>
          </div>
        );
      })
    }
    </div>
  );
}

const PrivacyPolicyPage = () => (
  <div className="privacy-policy">
    <div className="container section__container privacy-policy__container">
      <h3 className="privacy-policy__header">Privacy Policy</h3>
      <span className="privacy-policy__text">
      This privacy policy is for this website (Grakn) and governs the privacy of its users who choose to use it.
      The policy sets out the different areas where user privacy is concerned and outlines the obligations and requirements of the users, the website and website owners. Furthermore, the way this website processes, stores and protects user data and information will also be detailed within this policy.
      </span>

      <h3 className="privacy-policy__header">The Website</h3>
      <span className="privacy-policy__text">
      Grakn Labs Ltd (“We”) take a proactive approach to user privacy and ensure the necessary steps are taken to protect the privacy of its users throughout their visiting experience. This website complies to all UK national laws and requirements for user privacy
      </span>
      <h3 className="privacy-policy__header">Use of Cookies</h3>
      <span className="privacy-policy__text">
      This website uses cookies to better the users experience while visiting the website. Where applicable this website uses a cookie control system allowing the user on their first visit to the website to allow or disallow the use of cookies on their computer / device. This complies with recent legislation requirements for websites to obtain explicit consent from users before leaving behind or reading files such as cookies on a user's computer / device.
      <br /><br />
      Cookies are small files saved to the user's computers hard drive that track, save and store information about the user's interactions and usage of the website. This allows the website, through its server to provide the users with a tailored experience within this website.
      <br /><br />
      Users are advised that if they wish to deny the use and saving of cookies from this website on to their computers hard drive they should take necessary steps within their web browsers security settings to block all cookies from this website and its external serving vendors.
      <br /><br />
      This website uses tracking software to monitor its visitors to better understand how they use it. This software is provided by Google Analytics and Hotjar which uses cookies to track visitor usage. The software will save a cookie to your computer’s hard drive in order to track and monitor your engagement and usage of the website, but will not store, save or collect personal information. For further information, you can read Google's privacy policy <a href="https://www.google.com/policies/privacy/" className="animated__link animated__link--purple" target="_blank">here</a>, and Hotjar’s privacy policy <a href="https://www.hotjar.com/privacy" className="animated__link animated__link--purple" target="_blank">here</a>.
      <br /> <br />
      The cookies used by GRAKN.AI website are described in the list below. 
      </span>
      {renderTable(tableCookie, "Name", "Purpose")}
      {renderTableMobile(tableCookie, "Name", "Purpose")}
      <h3 className="privacy-policy__header">Contact & Communication</h3>
      <span className="privacy-policy__text">
      Users contacting Grakn do so at their own discretion and provide any such personal details requested at their own risk. Your personal information is kept private and stored securely until a time it is no longer required or has no use, as detailed in the Data Protection Act 1998. Every effort has been made to ensure a safe and secure form to email submission process but advise users using such form to email processes that they do so at their own risk.
      <br /> <br />
      We use any information submitted to provide you with further information about the products/services we offer or to assist you in answering any questions or queries you may have submitted. This may include using your details to subscribe you to any email newsletter program the website may operate but only if this was made clear to you and your express permission was granted when submitting any form to email process. Or whereby you the consumer have previously purchased from or enquired about purchasing from the company a product or service that the email newsletter relates to. This is by no means an entire list of your user rights in regard to receiving email marketing material. Your details are not passed on to any third parties.
      </span>

      <h3 className="privacy-policy__header">Email Newsletter</h3>
      <span className="privacy-policy__text">
      We may operate an email newsletter program, used to inform subscribers about products and services supplied by this website. Users can subscribe through an online automated process should they wish to do so but do so at their own discretion. Some subscriptions may be manually processed through prior written agreement with the user.
      <br /> <br />
      Subscriptions are taken in compliance with UK Spam Laws detailed in the Privacy and Electronic Communications Regulations 2003. All personal details relating to subscriptions are held securely and in accordance with the Data Protection Act 1998. No personal details are passed on to third parties nor shared with companies/people outside of the company that operates this website. Under the Data Protection Act 1998 you may request a copy of personal information held about you by this website's email newsletter program. A small fee will be payable. If you would like a copy of the information held on you, please write to the business address contained in the About Us page of Grakn.
      <br /><br />
      Email marketing campaigns published by this website or its owners may contain tracking facilities within the actual email. Subscriber activity is tracked and stored in a database for future analysis and evaluation. Such tracked activity may include but is not limited to the opening of emails, forwarding of emails, the clicking of links within the email content, times, dates and frequency of activity. This information may be used to refine future email campaigns and supply the user with more relevant content based around their activity.
      <br /><br />
      In compliance with UK Spam Laws and the Privacy and Electronic Communications Regulations 2003 subscribers are given the opportunity to un-subscribe at any time through an automated system. This process is detailed at the footer of each email campaign. If an automated un-subscription system is unavailable clear instructions on how to un-subscribe will by detailed instead.
      </span>

      <h3 className="privacy-policy__header">External Links</h3>
      <span className="privacy-policy__text">
      Although Grakn only looks to include quality, safe and relevant external links, users are advised to adopt a policy of caution before clicking any external web links included throughout this website. (External links are clickable text/icon/banner/image links to other websites.)
      <br /> <br />
      Clicking on any such link may send you to the external website through a referral program which may use cookies and will may track the number of referrals sent from this website. This may include the use of cookies which may in turn be saved on your computer’s hard drive.
      <br /><br />
      Grakn cannot guarantee or verify the contents of any externally linked website despite our best efforts. Users should therefore note they click on external links at their own risk and this website and its owners cannot be held liable for any damages or implications caused by visiting any external links mentioned.
      </span>

      <h3 className="privacy-policy__header">Social Media Platforms</h3>
      <span className="privacy-policy__text">
      Communication, engagement and actions taken through external social media platforms that we participate in are subject to the terms and conditions as well as the privacy policies held with each social media platform respectively.
      <br /> <br />
      Users are advised to use social media platforms wisely and communicate/engage upon them with due care and caution in regard to their own privacy and personal details. Grakn will never ask for personal or sensitive information through social media.
      <br /><br />
      This website may use social sharing buttons which help share web content directly from web pages to the social media platform in question. Users are advised before using such social sharing buttons that they do so at their own discretion and note that the social media platform may track and save your request to share a web page respectively through your social media platform account. We are not responsible for any content generated by user while using this function.
      <br /> <br />
      </span>

      <h3 className="privacy-policy__header">Shortened Links in Social Media</h3>
      <span className="privacy-policy__text">
      Grakn Labs Ltd through their social media platform accounts may share web links to relevant web pages. By default, some social media platforms shorten lengthy URLs.
      <br /> <br />
      Users are advised to take caution and good judgment before clicking any shortened URLs published on social media platforms by this website and its owners. Despite the best efforts to ensure only genuine URLs are published many social media platforms are prone to spam and hacking and therefore this website and its owners cannot be held liable for any damages or implications caused by visiting any shortened links.
      </span>

      <h3 className="privacy-policy__header">Security of Your Information</h3>
      <span className="privacy-policy__text">
      We maintain electronic and procedural safeguards in connection with the collection, storage and disclosure of personally identifiable user information. Our security procedures mean that we may request proof of identity before we disclose personal information to you.
      </span>

      <h3 className="privacy-policy__header">Resources & Further Information</h3>
      <span className="privacy-policy__text">
        <a href="https://www.legislation.gov.uk/ukpga/1998/29/contents" className="animated__link animated__link--purple privacy-policy__link" target="_blank">Data Protection Act 1998</a>
        <a href="https://www.legislation.gov.uk/uksi/2003/2426/contents/made" className="animated__link animated__link--purple privacy-policy__link" target="_blank">Privacy and Electronic Communications Regulations 2003</a>
        <a href="https://www.ico.gov.uk/for_organisations/privacy_and_electronic_communications/the_guide.aspx" className="animated__link animated__link--purple privacy-policy__link" target="_blank">Privacy and Electronic Communications Regulations 2003 - The Guide
        </a>
        <a href="https://twitter.com/privacy" className="animated__link animated__link--purple privacy-policy__link" target="_blank">Twitter Privacy Policy
        </a>
        <a href="https://www.facebook.com/about/privacy/" className="animated__link animated__link--purple privacy-policy__link" target="_blank">Facebook Privacy Policy
        </a>
        <a href="https://www.google.com/privacy.html" className="animated__link animated__link--purple privacy-policy__link" target="_blank">Google Privacy Policy
        </a>
        <a href="https://developers.facebook.com/policy" className="animated__link animated__link--purple privacy-policy__link" target="_blank">Facebook Platform Policies
        </a>
        <a href="https://dev.twitter.com/overview/terms/agreement-and-policy" className="animated__link animated__link--purple privacy-policy__link" target="_blank">Developer Agreement & Policy | Twitter Developers
        </a>
      </span>
      
      <h3 className="privacy-policy__header">We may update this Policy</h3>
      <span className="privacy-policy__text">
      From time to time we may change our privacy policies. We will notify you of any material changes to our Policy as required by law. We will also post an updated copy on our website. Please check our site periodically for updates.
      <br /> <br />
      Grakn Labs Ltd., Unit 22, 8 Hornsey Street, London, N7 9EG
      </span>
    </div>
  </div>
);

export default PrivacyPolicyPage;