'use strict';

window.MNDMPS = window.MNDMPS || {};

/**
 * Several methods that are used across the website
 */

window.MNDMPS.Helpers = {

    /**
     * Returns the position of an element relative to the document
     *
     * @param {object} el - An html element
     */

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

    /**
     * Stops event from bubbling
     *
     * @param {object} event - An event to stop
     */

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

    /**
     * Serializes object to a form
     * Used when we need to send a form as a payload to the server
     *
     * @param {object} el - An object with properties we need to serialize
     */

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
};

/**
 * Returns the property that is assumably correct
 *
 * @param {number} n_win - Window value
 * @param {number} n_docel - Document element value
 * @param {number} n_body - Body value
 */

function f_filterResults(n_win, n_docel, n_body) {
    var n_result = n_win ? n_win : 0;

    if (n_docel && (!n_result || (n_result > n_docel))) {
        n_result = n_docel;
    }

    return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

/**
 * Returns the window width
 */

function f_clientWidth() {
    return f_filterResults (
        window.innerWidth ? window.innerWidth : 0,
        document.documentElement ? document.documentElement.clientWidth : 0,
        document.body ? document.body.clientWidth : 0
    );
}

/**
 * Returns the window height
 */

function f_clientHeight() {
    return f_filterResults (
        window.innerHeight ? window.innerHeight : 0,
        document.documentElement ? document.documentElement.clientHeight : 0,
        document.body ? document.body.clientHeight : 0
    );
}

/**
 * Returns the window horizontal scroll
 */

function f_scrollLeft() {
    return f_filterResults (
        window.pageXOffset ? window.pageXOffset : 0,
        document.documentElement ? document.documentElement.scrollLeft : 0,
        document.body ? document.body.scrollLeft : 0
    );
}

/**
 * Returns the window vertical scroll
 */

function f_scrollTop() {
    return f_filterResults (
        window.pageYOffset ? window.pageYOffset : 0,
        document.documentElement ? document.documentElement.scrollTop : 0,
        document.body ? document.body.scrollTop : 0
    );
}