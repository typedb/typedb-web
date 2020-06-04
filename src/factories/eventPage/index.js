import * as React from "react";
import strftime from "strftime";
import ReadMoreReact from 'read-more-react';
 

class EventPage extends React.Component {
  constructor(props) {
    super(props);

    this.openShareWindow = this.openShareWindow.bind(this);
    this.getUpperSidebarContent = this.getUpperSidebarContent.bind(this);
    this.getSortedSlots = this.getSortedSlots.bind(this);
  }

  openShareWindow(url, title) {
    window.open(url, title, "width=600,height=600");
    return false;
  }

  getSortedSlots() {
    return this.props.event.slots.sort((a, b) => a.date - b.date);
  }

  getUpperSidebarContent(slots, imageUrl) {
      return (
          <div>
            <img className="a-event-image" src={imageUrl} />
            <div className="o-event-timelocation">
                <div className="m-event-date">
                    <i className="icon fa fa-calendar-o"></i>
                    <span className="text">{strftime("%A, %d %B", slots[0].date)}</span>
                </div>
                <div className="a-event-time">
                    <span className="text">{strftime("%I:%M %p", slots[0].date)} <span style={{fontSize: "14px"}}>GMT+1</span></span>
                </div>
                <hr />
                <div className="m-event-location">
                    <i className="icon fa fa-map-marker"></i>
                    <span className="text">Grakn Labs Online</span>
                </div>
            </div>
            
            <div className="a-event-attendBtn">
                <a href={slots[0].rsvpUrl} className="a-event-attendBtn button button--red">
                    Attend
                </a>
            </div>
        </div>
      );
  }

  getLowerSidebarContent(slots) {
      const upcomingDates = this.getSortedSlots().filter((slot) => slot.date > Date.now()).splice(1);
      return (
        <div>
            {upcomingDates.length > 0 && <div className="o-event-dates">
                <h2>Can't make it?</h2>
                <h3>Join an upcoming date below.</h3>
              {upcomingDates.slice(0, 3).map((slot, index) => {
                return (
                  <a
                    href={slot.rsvpUrl}
                    key={index}
                    className="m-event-date button button--transparent"
                  >
                    <i className="icon fa fa-calendar-o"></i>
                    <span className="text">{strftime("%d %b - %H:%M", slot.date)} <span style={{fontSize: "12px"}}>GMT+1</span></span>
                  </a>
                );
              })}
            </div>}

            <div className="m-event-updates">
              <p>
                Get updates from the team and stay connected to the community.
              </p>
              <a href="/community" className="button button--transparent">Stay tuned</a>
            </div>

            <div className="m-event-share-links">
              <a onClick={() => this.openShareWindow("https://www.facebook.com/sharer/sharer.php", "Post on Facebook")}>
                <i className="facebook fa fa-facebook-square"></i>
              </a>

              <a onClick={() => this.openShareWindow(`https://twitter.com/intent/tweet?url=${location.href}`, "Tweet")}>
                <i className="twitter fa fa-twitter-square"></i>
              </a>

              <a onClick={() => this.openShareWindow(`https://www.linkedin.com/shareArticle?mini=true&url=${location.href}&source=grakn.ai`, "Share on LinkedIn")}>
                <i className="linkedin fa fa-linkedin-square"></i>
              </a>
            </div>
        </div>
      );
  }

  render() {
    const {
      title,
      path,
      tags,
      type,
      description,
      speaker,
      imageUrl,
      slots,
    } = this.props.event;

    const otherEvents = this.props.allEvents.filter((event) => {
      return (
        event.slots.some((slot) => slot.date >= Date.now()) && event.path !== path
      );
    });

    return (
      <div className="o-eventpage section__container container">
        <div className="o-event-content">
          <div className="o-event-details">
            <h1 style={{marginBottom: "20px"}}>{title}</h1>
            {tags && tags.length && (
              <div className="o-event-tags">
                {tags.map((tag, index) => {
                  return (
                    <div
                      key={index}
                      className={`m-event-tag ${tag.replace("#", "")}`}
                    >
                      <p>{tag}</p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="o-event-mobile-upperSidebar">
                {this.getUpperSidebarContent(slots, imageUrl)}
            </div>

            <h2 style={{ marginTop: "20px" }}>Description</h2>
            <p className="o-event-description">{description}</p>
            <div className="o-event-mobile-description">
                <ReadMoreReact text={description} min={290} ideal={300} max={310} />
            </div>

            <div className="o-event-speaker">
              <h2 style={{ marginBottom: "20px" }}>Speaker</h2>
              <div className="o-speaker-container">
                <div className="m-speaker-frame">
                  <img src={speaker.imageUrl} />
                </div>
                <div className="m-speaker-info">
                  <h3>{speaker.fullName}</h3>
                  {speaker.bio && <p>{speaker.bio}</p>}
                </div>
              </div>
            </div>

            <div className="o-event-mobile-lowerSidebar">
                {this.getLowerSidebarContent(slots, imageUrl)}
            </div>
          </div>


          <div className="o-event-sidebar">
            {this.getUpperSidebarContent(slots, imageUrl)}
            {this.getLowerSidebarContent(slots)}
          </div>
        </div>

        <div className="o-event-others">
          <h2>Events Coming Up</h2>
          <hr />
          <div className="o-event-others-list">
            {otherEvents.map((event, index) => {
              const nextImmediateDate = event.slots.find((slot) => slot.date >= Date.now()).date;
              return (
                <a href={event.path} className="o-event-other" key={index}>
                  <img src={event.imageUrl} />
                  <h3>{event.title}</h3>
                  <div className="o-event-other-details">
                    <div className="m-event-other-detail">
                        <i className="icon fa fa-calendar-o"></i>
                        <span className="text">{strftime("%d %b - %H:%M", nextImmediateDate)} <span style={{fontSize: "12px"}}>GMT+1</span></span>
                    </div>
                    <div className="m-event-other-detail">
                        <i className="icon fa fa-map-marker"></i>
                        <span className="text">Grakn Labs Online</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default EventPage;
