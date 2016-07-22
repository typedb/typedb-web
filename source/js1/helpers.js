// Converts from degrees to radians.
Math.radians = function(degrees) {
    return degrees * Math.PI/180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
    return radians * 180/Math.PI;
};

function selectText(element) {
    var doc = document,
        text = element,
        range,
        selection;
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function serializeObject(el) {

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
};

function getParentElement(el, className) {

    if (!el) {
        return;
    }

    if (el.classList.contains(className)) {
        return el;
    } else if (el.nodeName === 'BODY' || el.nodeName === 'HTML') {
        return false;
    } else {
        return getParentElement(el.parentNode, className);
    }
}

function getParentElements(el, className) {
    var array = [],
        foundEl = getParentElement(el, className);

    while (foundEl) {
        array.push(foundEl);
        foundEl = getParentElement(foundEl.parentNode, className);
    }

    return array;
}

function getChildren(n, skipMe) {
    var r = [];
    for (; n; n = n.nextSibling)
        if (n.nodeType == 1 && n != skipMe) {
            r.push(n);
        }

    return r;
}

function getSiblings(n) {
    return getChildren(n.parentNode.firstChild, n);
}

function f_filterResults(n_win, n_docel, n_body) {
    var n_result = n_win ? n_win : 0;

    if (n_docel && (!n_result || (n_result > n_docel))) {
        n_result = n_docel;
    }

    return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

function f_clientWidth() {
    return f_filterResults (
        window.innerWidth ? window.innerWidth : 0,
        document.documentElement ? document.documentElement.clientWidth : 0,
        document.body ? document.body.clientWidth : 0
    );
}

function f_clientHeight() {
    return f_filterResults (
        window.innerHeight ? window.innerHeight : 0,
        document.documentElement ? document.documentElement.clientHeight : 0,
        document.body ? document.body.clientHeight : 0
    );
}

function f_scrollLeft() {
    return f_filterResults (
        window.pageXOffset ? window.pageXOffset : 0,
        document.documentElement ? document.documentElement.scrollLeft : 0,
        document.body ? document.body.scrollLeft : 0
    );
}

function f_scrollTop() {
    return f_filterResults (
        window.pageYOffset ? window.pageYOffset : 0,
        document.documentElement ? document.documentElement.scrollTop : 0,
        document.body ? document.body.scrollTop : 0
    );
}

function dontScrollParent(el, turnOff) {

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

        if (!up && -delta > scrollHeight - height - scrollTop) {
            this.scrollTop = scrollHeight;
            return prevent();
        } else if (up && delta > scrollTop) {
            this.scrollTop = 0;
            return prevent();
        }
    }

    el.removeEventListener('DOMMouseScroll', catchScroll, false);
    el.removeEventListener('mousewheel', catchScroll, false);

    if (!turnOff) {
        el.addEventListener('DOMMouseScroll', catchScroll, false);
        el.addEventListener('mousewheel', catchScroll, false);
    }
}

function webGLAvailable() {
    var canvas = document.createElement('canvas'),
        gl, experimental;

    try {
        gl = canvas.getContext('webgl');
    } catch (error) {
        gl = null;
    }

    if (gl === null) {
        try {
            gl = canvas.getContext('experimental-webgl');
            experimental = true;
        } catch (error) {
            gl = null;
        }
    }

    if (gl === null) {
        return false;
    }

    return true;
}