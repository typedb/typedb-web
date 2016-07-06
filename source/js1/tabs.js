'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.Tabs = {

    _data: {},

    initTabs: function(tabbed) {

        var _this = this,
            tabs = tabbed.tabs.children;

        for (var i = 0; i < tabs.length; i++) {
            tabs[i].setAttribute('data-tabs-index', i);
        }

        function switchTab(event) {
            
            var index = event.target.getAttribute('data-tabs-index');

            if (index === null) {
                return;
            }

            index = parseInt(index, 10);

            for (var i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove('active');
            }

            event.target.classList.add('active');

            _this.processTabs(tabbed, index);
            window.MNDMPS.Graph.redraw('graph' + index);
        }

        tabs[0].classList.add('active');

        tabbed.tabs.addEventListener('click', switchTab, false);
    },

    processTabs: function(tabbed, index) {

        var content = tabbed.content.children;

        for (var i = 0; i < content.length; i++) {
            content[i].classList.remove('active');
        }

        content[index].classList.add('active');
    },

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