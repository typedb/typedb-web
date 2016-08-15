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

    getKnobPosition: function() {

        var _this = window.MNDMPS.Slider,
            data = _this._data;

        return data.wrapper.scrollLeft/data.scrolledPercent;
    },

    processScroll: function() {

        var _this = window.MNDMPS.Slider,
            data = _this._data,
            knobPosition = _this.getKnobPosition();

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