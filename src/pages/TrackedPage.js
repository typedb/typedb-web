import React, { Component } from 'react';
import api from 'api';
import Cookies from 'js-cookie';

export default class TrackedPage extends Component {

    componentDidMount() {
        api.track({
            "utk": Cookies.get('hubspotutk'),
            "platform": "website",
            "action": "visit"
        });
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}