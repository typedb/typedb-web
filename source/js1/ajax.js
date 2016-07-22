'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.ajax = {

    _data: {},

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

    getAngelJobs: function() {

        return this.call({
            method: 'GET',
            url: '/angel_jobs.php'
        });
    },

    sendSubscribe: function(obj) {

        return this.call({
            method: 'POST',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify(obj.data),
            url: '/mail/'
        });
    }
};