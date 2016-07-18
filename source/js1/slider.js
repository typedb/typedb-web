'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.Slider = {

    _data: {},

    processScroll: function() {

        var _this = window.MNDMPS.Slider,
            data = _this._data,
            knobPosition = data.containerPercent * data.wrapper.scrollLeft/data.scrolledPercent;
console.log(knobPosition);
        data.scrollKnob.style.transform = 'translateX(' + knobPosition + 'px)';
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

        data.scrollerWidth = data.scroller.offsetWidth - data.scrollKnob.offsetWidth;
        data.contentWidth = data.scroller.offsetWidth * data.tabs.children.length;
        
        data.containerPercent = Math.floor(data.scrollerWidth/100);
        data.scrolledPercent = Math.floor(data.contentWidth-data.scrollerWidth)/100;

        data.wrapper.addEventListener('scroll', this.processScroll, false);
    }
};