'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.Slider = {

    _data: {
        switchTimeout: 400,
        minTabOpacity: 0.4,
        tabSpeed: 200
    },

    updateParams: function() {

        var _this = window.MNDMPS.Slider,
            data = _this._data;

        data.scrollerWidth = data.wrapper.offsetWidth;
        data.contentWidth = data.scrollerWidth * data.tabs.children.length;
        
        data.containerPercent = data.scrollerWidth/100;
        data.scrolledPercent = data.contentWidth/100;

        _this.processScroll();
    },

    processScroll: function() {

        var _this = window.MNDMPS.Slider,
            data = _this._data,
            knobPosition = data.wrapper.scrollLeft/data.scrolledPercent;

        data.scrollKnob.style.left = knobPosition + '%';

        _this.processTabs(knobPosition);
    },

    switchTab: function(event) {

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

        function tabSpring() {

            clearTimeout(data.scrollTimeout);

            if (index.prev === index.next) {
                _this.switchTab(index.prev);
            } else {
                if (percentage.prev > percentage.next) {
                    _this.switchTab(index.prev);
                } else {
                    _this.switchTab(index.next);
                }
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

        clearTimeout(data.scrollTimeout);
        data.scrollTimeout = setTimeout(tabSpring, data.switchTimeout);
    },

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

        this.processScroll();
    }
};