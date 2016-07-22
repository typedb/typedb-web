window.vanillaSmoothScroller = {

    _data: {
        params: {}
    },

    getTargetNode: function(obj) {
        
        var _this = this,
            data = _this._data;
        
        if (obj.sourceEl == obj.el) {
            return obj.el;
        } else {
            obj.el = obj.el.parentNode;
            return _this.getTargetNode(obj);
        }
    },

    getDocumentHeight: function() {
        var body = document.body,
            html = document.documentElement,
            height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

        return height;
    },

    processDestination: function(string) {

        if (!string) {
            return false;
        }

        if (!isNaN(string)) {
            return parseInt(string, 10);
        } else if (string.indexOf('%') > 0) {
            var percents = parseInt(string, 10);

            return Math.floor(this.getDocumentHeight()/100 * percents);
        } else {

            if (string === 'top') {
                return 0;
            } else if (string === 'bottom') {
                return this.getDocumentHeight() - window.innerHeight;
            }

            return Math.floor((window.pageYOffset || document.documentElement.scrollTop) + document.querySelectorAll(string)[0].getBoundingClientRect().top);
        }
    },

    scroll: function(event) {

        event.preventDefault();

        var _this = window.vanillaSmoothScroller,
            data = _this._data,
            obj;

        data.defaults = {
            destination: 0,
            duration:    400,
            scrollUp:    true
        };
        
        if (!event) {
            event = {};
        }

        if (event.target) {
            obj = _this.getTargetNode({
                sourceEl: event.currentTarget,
                el: event.target
            });
        } else if (!event.nodeType) {
            obj = {
                dataset: event
            };
        }

        data.params.destination = _this.processDestination(obj.dataset.to) || data.defaults.destination;

        if (data.offset) {
            if (typeof data.offset === 'function') {
                data.params.destination -= data.offset();
            } else {
                data.params.destination -= data.offset;
            }
        }
        
        data.params.duration =    parseInt(obj.dataset.duration, 10) || data.defaults.duration;
        data.params.scrollUp =    (window.pageYOffset || document.documentElement.scrollTop) - data.params.destination > 0 ? true : false;

        data.params.scrollHeight = Math.abs((window.pageYOffset || document.documentElement.scrollTop) - data.params.destination);
        data.params.scrollStep =   Math.PI/(data.params.duration/15);
        data.params.gap =          Math.floor(data.params.scrollStep * 100);
        data.params.cosParameter = data.params.scrollHeight/2;
        data.params.scrollCount =  0;
        data.params.scrollMargin = 0;

        function step() {

            var params = window.vanillaSmoothScroller._data.params,

                a = params.destination,
                b = params.scrollMargin,
                c = params.scrollHeight,
                docHeight = window.vanillaSmoothScroller.getDocumentHeight(),
                windowHeight = window.innerHeight,
                pageYoffset = window.pageYOffset || document.documentElement.scrollTop, 
                condition = pageYoffset < params.destination - params.gap &&
                            pageYoffset + windowHeight < docHeight - params.scrollStep;

            if (params.scrollUp) {
                b = params.scrollHeight;
                c = params.scrollMargin;
                condition = pageYoffset > params.destination + params.gap &&
                            pageYoffset > params.scrollStep;
            }

            if (condition) {
                window.requestAnimationFrame(step);
                params.scrollCount += 1;
                params.scrollMargin = params.cosParameter - (params.cosParameter * Math.cos(params.scrollCount * params.scrollStep));
                window.scrollTo(0, (a + b - c));
            } else {
                window.scrollTo(0, params.destination);
            }
        }

        window.requestAnimationFrame(step);

        return false;
    },

    bind: function(obj) {

        if (!obj || !obj.selector) {
            return false;
        }

        var _this = this,
            data = _this._data,
            vanillaSmoothScrollerButtons = [].slice.call(document.querySelectorAll(obj.selector));

        data.offset = obj.offset;
        
        for (var i = vanillaSmoothScrollerButtons.length - 1; i >= 0; i--) {
            vanillaSmoothScrollerButtons[i].addEventListener(obj.event || 'click', window.vanillaSmoothScroller.scroll, false);
            
            if (obj.event && obj.event !== 'click') {
                vanillaSmoothScrollerButtons[i].addEventListener('click', function(event) {
                    event.preventDefault();
                    return false;
                }, false);
            }
        }
    }
}