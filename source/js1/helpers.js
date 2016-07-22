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

    serializeObject: function(el) {

        var o = {},
            a = el.serializeArray();

        $.each(a, function() {

            if (o[this.name] !== undefined) {

                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }

                o[this.name].push(this.value || '');
            } else {

                o[this.name] = this.value || '';
            }
        });

        return o;
    }
}