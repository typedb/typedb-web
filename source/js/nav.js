'use strict';

window.MNDMPS = window.MNDMPS || {};

/**
 * Does all the stuff with the top navigation bar
 */

window.MNDMPS.Nav = {

    _data: {},

    /**
     * Toggles the navbar background colour
     *
     * @param {boolean} state - Specifies whether to make background colour white
     */

    toggleWhite: function(state) {

        var data = this._data,
            action = state ? 'add' : 'remove';

        data.nav.classList[action]('white');
    },

    /**
     * Checks the scrolled value of the window
     * If it's more than 20px (wow, such subtle), toggles the navbar white colour
     */

    checkPosition: function() {

        var _this = window.MNDMPS.Nav,
            data = _this._data,
            scrolled = document.documentElement.scrollTop || document.body.scrollTop;

        if (scrolled > 20) {
            _this.toggleWhite(true);
        } else {
            _this.toggleWhite(false);
        }
    },

    /**
     * Checks the window width.
     * If it's more than 750, removes the active class from navbar wrapper.
     */

    checkWidth: function() {

        var _this = window.MNDMPS.Nav,
            data = _this._data;

        if (window.innerWidth >= 750) {
            data.menu.classList.remove('active');
        }
    },

    /**
     * Toggles the expaned state of the navbar
     *
     * @param {object} event - Usually a click event, that is propagated either from the toggler or from the dark menu background
     */

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

    /**
     * Initialises everything the top navbar needs
     */

    init: function() {

        var data = this._data;

        data.nav = document.getElementsByClassName('nav')[0];
        data.menu = document.getElementsByClassName('menu')[0];
        data.toggle = data.nav.getElementsByClassName('toggle')[0];

        data.menu.addEventListener('click', this.toggleMenu, false);
        window.addEventListener('resize', this.checkWidth, false);

        this.checkWidth();

        if (data.nav.classList.contains('transparent')) {
            window.addEventListener('scroll', this.checkPosition, false);
            this.checkPosition();
        } else {
            this.toggleWhite(true);
        }
    }
};