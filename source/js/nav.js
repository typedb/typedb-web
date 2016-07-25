'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.Nav = {

    _data: {},

    toggleWhite: function(state) {

        var data = this._data,
            action = state ? 'add' : 'remove';

        data.nav.classList[action]('white');
    },

    checkPosition: function() {

        var _this = window.MNDMPS.Nav,
            data = _this._data,
            scrolled = document.body.scrollTop;

        if (scrolled > 0) {
            _this.toggleWhite(true);
        } else {
            _this.toggleWhite(false);
        }
    },

    checkWidth: function() {

        var _this = window.MNDMPS.Nav,
            data = _this._data;

        if (window.innerWidth >= 750) {
            data.menu.classList.remove('active');
        }
    },

    toggleMenu: function(event) {

        var _this = window.MNDMPS.Nav,
            data = _this._data,
            node = event.target,
            action = data.menu.classList.contains('active') ? 'remove' : 'add';

        if (node.classList.contains('toggle')|| node.classList.contains('menu')) {
            data.menu.classList[action]('active');
        }

        if (node.classList.contains('toggle')) {
            event.stopPropagation();
        }
    },

    init: function() {

        var data = this._data;

        data.nav = document.getElementsByClassName('nav')[0];
        data.menu = document.getElementsByClassName('menu')[0];
        data.toggle = data.nav.getElementsByClassName('toggle')[0];

        data.menu.addEventListener('click', this.toggleMenu, false);
        window.addEventListener('scroll', this.checkPosition, false);
        window.addEventListener('resize', this.checkWidth, false);

        this.checkWidth();
        this.checkPosition();
    }
};