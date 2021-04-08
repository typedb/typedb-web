import { library as iconLibrary } from '@fortawesome/fontawesome-svg-core';

import {
    faCog,
    faExternalLinkAlt,
    faExternalLinkSquareAlt,
    faSignOut,
    faSync,
    faTimes,
    faPlus,
    faSpinner,
    faUserCog,
    faSquare,
    faCheck,
    faSignIn,
    faBolt,
    faNetworkWired,
} from '@fortawesome/pro-light-svg-icons';
import { faCaretDown, faLongArrowRight, faPlusCircle, faTimesCircle } from '@fortawesome/pro-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const initIconLibrary = (): void => {
    iconLibrary.add(
        faSync,
        faExternalLinkAlt,
        faExternalLinkSquareAlt,
        faGithub,
        faPlusCircle,
        faCog,
        faUserCog,
        faTimes,
        faPlus,
        faCaretDown,
        faSignOut,
        faLongArrowRight,
        faTimesCircle,
        faSpinner,
        faSquare,
        faCheck,
        faSignIn,
        faBolt,
        faNetworkWired
    );
};

export default initIconLibrary;
