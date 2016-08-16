'use strict';

window.MNDMPS = window.MNDMPS || {};

/**
 * Tabbed view for the home page graph examples block
 */

window.MNDMPS.Tabs = {

    _data: {},

    /**
     * Adds mouse or touch listeners to tabs
     *
     * @param {object} tabbed - A tabbed view object
     */

    initTabs: function(tabbed) {

        var _this = this,
            tabs = tabbed.tabs.children;

        for (var i = 0; i < tabs.length; i++) {
            tabs[i].setAttribute('data-tabs-index', i);
        }

        /**
         * Switches active tab
         *
         * @param {object} event - A mouse or touch event
         */

        function switchTab(event) {
            
            var index = event.target.getAttribute('data-tabs-index'),
                prevIndex = null;

            if (index === null) {
                return;
            }

            index = parseInt(index, 10);

            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].classList.contains('active')) {
                    prevIndex = i;
                }
                
                tabs[i].classList.remove('active');
            }

            event.target.classList.add('active');

            _this.processTabs(tabbed, index);
            window.MNDMPS.Graph.stop('graph' + prevIndex);
            window.MNDMPS.Graph.redraw('graph' + index);
        }

        tabs[0].classList.add('active');

        tabbed.tabs.addEventListener('click', switchTab, false);
    },

    /**
     * Goes through tabs and toggles the "active" class
     *
     * @param {object} tabbed - A tabbed view object
     * @param {number} index - The active tab index
     */

    processTabs: function(tabbed, index) {

        var content = tabbed.content.children;

        for (var i = 0; i < content.length; i++) {
            content[i].classList.remove('active');
        }

        content[index].classList.add('active');
    },

    /**
     * Initialises the tabbed interface for specified html node
     *
     * @param {object} el - The tabbed view html node
     */

    init: function(el) {

        var data = this._data,
            tabbed = {
                view: el,
                tabs: el.querySelectorAll('[data-tabs="tabs"]')[0],
                content: el.querySelectorAll('[data-tabs="content"]')[0]
            };

        this.initTabs(tabbed);
        this.processTabs(tabbed, 0);

        if (!data.tabs) {
            data.tabs = [];
        }

        data.tabs.push(tabbed);
    }
};