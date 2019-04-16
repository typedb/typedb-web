const scores = {
    "website": {
        "visit": 0.2,
        "formSubmission": {
            "contact": 1,
            "newsletter": 1,
            "download": 1,
        },
        "download": {
            "Grakn": 1,
            "BioGrakn White Paper": 1,
            "Lifebit Case Study": 1,
            "UST Case Study": 1,
            "InfoSys Case Study": 1,
        }
    },
    "documentation": {
        "visit": 0.3
    },
    "discuss": {
        "signup": 1,
        "visit": 0.1,
        "topicCreation": 2,
    }
}

// TODO: we ought to write tests for this
// updates `activities` based on the given specific action on the given platform
const updatedPlatformActivities = (activities, platform, action, subject, subjectSpecificData) => {
    const now = new Date().toLocaleString();

    switch (platform) {
        case "website":
            switch (action) {
                case "visit":
                    const websiteVisitedPage = subject;
                    if (activities.visit[websiteVisitedPage]) {
                        activities.visit[websiteVisitedPage].times += 1;
                        activities.visit[websiteVisitedPage].last = now;
                    } else {
                        activities.visit[websiteVisitedPage] = { times: 1, first: now, last: now };
                    }
                    break;

                case "download":
                    const websiteDownloadedDocument = subject;
                    if (activities.download[websiteDownloadedDocument]) {
                        activities.download[websiteDownloadedDocument].push(now);
                    } else {
                        activities.download[websiteDownloadedDocument] = [now];
                    }
                    break;

                case "formSubmission":
                    const websiteFormTitle = subject;
                    const websiteFormPage = subjectSpecificData.pageTitle;

                    if (activities.formSubmission[websiteFormTitle]) {
                        activities.formSubmission[websiteFormTitle].push({ page: websiteFormPage, when: now });
                    } else {
                        activities.formSubmission[websiteFormTitle] = [{ page: websiteFormPage, when: now }];
                    }
            }
            break;

        case "documentation":
            switch (action) {
                case "visit":
                    const docsVisitedPage = subject;
                    if (activities.visit[docsVisitedPage]) {
                        activities.visit[docsVisitedPage].times += 1;
                        activities.visit[docsVisitedPage].last = now;
                    } else {
                        activities.visit[docsVisitedPage] = { times: 1, first: now, last: now };
                    }
                    break;
            }
            break;

        case "discuss":
            switch (action) {
                case "signup":
                    activities.signup = now;
                    break;

                case "topicCreation":
                    const discussCreatedTopic = subject;
                    activities.topicCreation[discussCreatedTopic] = now;
                    break;

                case "visit":
                    const discussVisitedTopic = subject;
                    if (activities.visit[discussVisitedTopic]) {
                        activities.visit[discussVisitedTopic].times += 1;
                        activities.visit[discussVisitedTopic].last = now;
                    } else {
                        activities.visit[discussVisitedTopic] = { times: 1, first: now, last: now };
                    }
                    break;
            }
            break;
    }

    return activities;
};

export default {
    scores,
    updatedPlatformActivities
}