'use strict';

window.MNDMPS = window.MNDMPS || {};

/**
 * Slider for "Building intelligent systems for complex data is now easy" section
 */

window.MNDMPS.Slider = {

    _data: {
        switchTimeout: 400,
        minTabOpacity: 0.4,
        tabSpeed: 200
    },

    /**
     * Updates parametres and then scroll position
     */

    updateParams: function() {

        var _this = window.MNDMPS.Slider,
            data = _this._data;

        data.scrollerWidth = data.wrapper.offsetWidth;
        data.contentWidth = data.scrollerWidth * data.tabs.children.length;
        
        data.containerPercent = data.scrollerWidth/100;
        data.scrolledPercent = data.contentWidth/100;

        _this.processScroll();
    },

    /**
     * Returns scroller knob position
     */

    getKnobPosition: function() {

        var _this = window.MNDMPS.Slider,
            data = _this._data;

        return data.wrapper.scrollLeft/data.scrolledPercent;
    },

    /**
     * Checks the scroll position.
     * Changes the knob position and tabs opacity.
     */

    processScroll: function() {

        var _this = window.MNDMPS.Slider,
            data = _this._data,
            knobPosition = _this.getKnobPosition();

        data.scrollKnob.style.left = knobPosition + '%';

        _this.processTabs(knobPosition);
    },

    /**
     * Switches the scroller tab
     *
     * @param {(object|number)} event - The click event or the tab index to switch to
     */

    switchTab: function(event) {
        console.log('ehi hai cliccato!');

        var _this = window.MNDMPS.Slider,
            data = _this._data,
            tabs = [].slice.call(data.tabs.children),
            index = typeof event === 'object' ? tabs.indexOf(event.target) : event,
            scrollPos = index * data.scrollerWidth;

        data.tabTween.stop();

        data.tabTween.tween({
            from: {x: data.wrapper.scrollLeft},
            to:   {x: scrollPos},
            duration: data.tabSpeed,
            easing: 'easeInOutQuart',
            step: function(state) {
                data.wrapper.scrollLeft = state.x;
            },
            finish: function() {
                data.wrapper.scrollLeft = scrollPos;
            }
        });
    },

    /**
     * Changes tabs opacity depending on the scroll position
     *
     * @param {number} pos - Scroll position
     */

    processTabs: function(pos) {

        var _this = this,
            data = this._data,
            tabs = data.tabs.children,
            value = pos/data.scrollKnobWidth,
            index = {
                prev: parseInt(value, 10),
                next: Math.ceil(value)
            },
            percentage = {
                prev: index.next - value,
                next: value - index.prev
            };

        function changeTabsOpacity(tab, opacity) {
            if (tab) {
                tab.style.opacity = Math.max(opacity, data.minTabOpacity);
            }
        }

        if (index.prev === index.next) {
            percentage.prev = percentage.next = 1;
        }

        for (var i = 0; i < tabs.length; i++) {
            tabs[i].removeAttribute('style');
        }

        for (var key in index) {
            changeTabsOpacity(tabs[index[key]], percentage[key]);
        }
    },

    /**
     * Animates the switching transition between tabs.
     * Currently used for swipe.
     *
     * @param {object} obj - Set of paranetres
     * @param {object} obj.warpperPos - Scroller wrapper position relative to the viewport
     * @param {object} obj.eventPos - Touch event position relative to the viewport
     * @param {number} obj.dir - Swipe direction
     */

    springTabs: function(obj) {

        var _this = this,
            data = this._data,
            tabs = data.wrapper.children,
            tempPos = null,
            activeTabs = [],
            currentTabIndex = null;

        for (var i = 0; i < tabs.length; i++) {
            tempPos = data.wrapper.scrollLeft - (i * tabs[i].offsetWidth);
            
            if (tempPos < data.wrapper.offsetWidth && tempPos > -data.wrapper.offsetWidth) {
                activeTabs.push({
                    index: i,
                    tab: tabs[i],
                    area: data.wrapper.offsetWidth - Math.abs(tempPos)
                });
            }
        }

        /**
         * Based on the direction and number of visible slides executes transition to the next slide
         *
         * @param {number} dir - Either 1 or -1 to get the meighbour element of the currently active slide
         */

        function slide(dir) {
            if (activeTabs.length > 1) {
                if (activeTabs[0].area > activeTabs[1].area) {
                    currentTabIndex = activeTabs[0].index;
                } else {
                    currentTabIndex = activeTabs[1].index;
                }
            } else {
                currentTabIndex = activeTabs[0].index;
            }

            if (tabs[currentTabIndex + dir]) {
                _this.switchTab(currentTabIndex + dir);
            } else {
                _this.switchTab(currentTabIndex);
            }
        }

        switch(obj.dir) {
            case Hammer.DIRECTION_LEFT:
                slide(1);
                break;
            case Hammer.DIRECTION_RIGHT:
                slide(-1);
                break;
        }
    },

    /**
     * Initialises the swipe listener.
     * Uses hammer.js library.
     */

    initSwipe: function() {

        var _this = this,
            data = this._data;
        
        data.hammerEl = new Hammer.Manager(data.wrapper);
        data.hammerSwipe = new Hammer.Swipe({
            direction: Hammer.DIRECTION_HORIZONTAL
        });
        data.hammerEl.add(data.hammerSwipe);
        
        data.hammerEl.on('swipe', function(event) {

            event.preventDefault();

            _this.springTabs({
                warpperPos: event.target.getBoundingClientRect(),
                eventPos: event.center,
                dir: event.direction
            });
        });
    },

    /**
     * Initialises the slider.
     * Slide transitions use shifty.js library.
     */

    init: function() {

        var data = this._data;

        data.scroller = document.getElementsByClassName('promoSlider')[0];
        data.container = data.scroller.children[0];
        data.wrapper = data.container.children[0];
        data.controls = data.scroller.children[1];
        data.scrollbar = data.controls.children[0];
        data.scrollKnob = data.scrollbar.children[0];
        data.tabs = data.controls.children[1];

        data.scrollKnobWidth = 100/data.tabs.children.length;
        data.scrollKnob.style.width = data.scrollKnobWidth + '%';

        data.scrollerWidth = data.wrapper.offsetWidth;
        data.contentWidth = data.scrollerWidth * data.tabs.children.length;
        
        data.containerPercent = data.scrollerWidth/100;
        data.scrolledPercent = data.contentWidth/100;

        data.wrapper.addEventListener('scroll', this.processScroll, false);
        data.tabs.addEventListener('click', this.switchTab, false);
        window.addEventListener('resize', this.updateParams, false);

        data.tabTween = new Tweenable();

        this.initSwipe();
        this.processScroll();
    }
};