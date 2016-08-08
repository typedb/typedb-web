'use strict';

window.MNDMPS = window.MNDMPS || {};

/**
 * Everything that is used on the docs pages
 */

window.MNDMPS.Docs = {

    _data: {},

    /**
     * Gets page depending on the link that was clicked
     *
     * @param {object} event - A click event
     */

    getPage: function(event) {

        event.preventDefault();

        if (!event.target.pathname) {
            return;
        }
        
        var _this = window.MNDMPS.Docs,
            data = _this._data;

        window.MNDMPS.Ajax.getDocsPage({
            type: data.type,
            url: event.target.pathname
        }).then(
            function(response) {
                _this.refreshPage(_this.replaceImages(response));
            },
            function(error) {
                console.log(error);
            }
        );
    },

    /**
     * Replaces all image links.
     * Removes everything but image file names, then adds the proper relative path
     *
     * @param {string} html - HTML string
     */

    replaceImages: function(html) {
        
        var data = this._data,
            wrapper = document.createElement('div'),
            images = null;

        wrapper.innerHTML = html;
        images = wrapper.getElementsByTagName('img');

        for (var i = 0; i < images.length; i++) {
            images[i].src = '/docs/' + data.type + '/images/' + images[i].getAttribute('src');
        }

        return wrapper.innerHTML;
    },

    /**
     * Replaces html content of the docs content node
     *
     * @param {string} html - HTML string
     */

    refreshPage: function(html) {
        
        var data = this._data;
        
        data.view.innerHTML = html;
    },

    /**
     * Initialises docs JS
     *
     * @param {object} node - The node that contains the menu and content wrappers
     */

    init: function(node) {

        var data = this._data;

        data.wapper = node;
        data.type = data.wapper.getAttribute('data-type');
        data.nav = node.getElementsByClassName('docs-menu')[0];
        data.view = node.getElementsByClassName('docs-content')[0];

        data.nav.addEventListener('click', this.getPage, false);

        window.MNDMPS.Ajax.getDocsMenu(data.type).then(
            function(response) {
                data.nav.innerHTML = response;
            },
            function(error) {
                console.log(error);
            }
        );
    }
};