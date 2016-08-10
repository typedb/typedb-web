'use strict';

window.MNDMPS = window.MNDMPS || {};

/**
 * Makes all the ajax calls. 
 * Also contains some context specific methods like a call for Angel.co jobs.
 */

window.MNDMPS.Ajax = {

    _data: {},

    /**
     * Makes an ajax call. Returns a promise.
     *
     * @param {object} obj - An object containing data and parametres
     * @param {string} obj.method - Method to use for the call. POST, GET etc.
     * @param {string} obj.url - The URL ta make the call to
     * @param {string} obj.contentType - Content-type header if need one
     * @param {(string|object)} obj.data - Data to send along with the request
     */

    call: function(obj) {

        var promise = new Promise(function(resolve, reject) {

            var client = new XMLHttpRequest();
            client.open(obj.method, obj.url, true);

            if (obj.contentType) {
                client.setRequestHeader("Content-type", obj.contentType);
            }

            client.send(obj.data);

            client.onload = function() {
                if (this.status >= 200 && this.status < 300) {
                    resolve(this.response);
                } else {
                    reject(this.statusText);
                }
            };

            client.onerror = function() {
                reject(this.statusText);
            };
        });

        return promise;
    },

    /**
     * Gets the doc html
     *
     * @param {object} obj - An object containing parametres
     * @param {string} obj.type - The documentation type
     * @param {string} obj.url - The url of the page
     */

    getDocsPage: function(obj) {

        return this.call({
            method: 'GET',
            url: '/docs/' + obj.type + '/documentation' + obj.url
        });
    },

    /**
     * Gets the docs menu
     *
     * @param {string} type - The docs type to use as a part of the url
     */

    getDocsMenu: function(type) {

        return this.call({
            method: 'GET',
            url: '/docs/' + type + '/navigation.html'
        });
    },

    /**
     * Gets the job list from Angel.co
     */

    getAngelJobs: function() {

        return this.call({
            method: 'GET',
            url: '/angel_jobs.php'
        });
    },

    /**
     * Sends the subscribe request 
     *
     * @param {object} obj - An object containing parametres
     * @param {object} obj.data - An object containing user information
     */

    sendSubscribe: function(obj) {

        return this.call({
            method: 'POST',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify(obj.data),
            url: '/mail/'
        });
    }
};