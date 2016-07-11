'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.Helpers = {

    getPosition: function(el) {

        var xPos = 0;
        var yPos = 0;

        while (el) {
            
            if (el.tagName == "BODY") {
                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = el.scrollTop || document.documentElement.scrollTop;
                
                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                yPos += (el.offsetTop - yScroll + el.clientTop);
            } else {
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            }
        
            el = el.offsetParent;
        }
        
        return {
            x: xPos,
            y: yPos
        };
    },

    pauseEvent: function(event) {
        
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        
        if (event.preventDefault) {
            event.preventDefault();
        }
        
        event.cancelBubble = true;
        event.returnValue = false;
        
        return false;
    },

    dontScrollParent: function(el, turnOff) {

        function catchScroll(ev) {
            var scrollTop    = this.scrollTop,
                scrollHeight = this.scrollHeight,
                height       = this.offsetHeight,
                delta        = ev.wheelDelta,
                up           = delta > 0;

            function prevent() {
                ev.stopPropagation();
                ev.preventDefault();
                ev.returnValue = false;
                return false;
            }

            if (event.type === 'touchmove') {
                return prevent();
            } else if (!up && -delta > scrollHeight - height - scrollTop) {
                this.scrollTop = scrollHeight;
                return prevent();
            } else if (up && delta > scrollTop) {
                this.scrollTop = 0;
                return prevent();
            }
        }

        el.removeEventListener('touchmove', catchScroll, false);
        el.removeEventListener('DOMMouseScroll', catchScroll, false);
        el.removeEventListener('mousewheel', catchScroll, false);

        if (!turnOff) {
            el.addEventListener('touchmove', catchScroll, false);
            el.addEventListener('DOMMouseScroll', catchScroll, false);
            el.addEventListener('mousewheel', catchScroll, false);
        }
    }
}