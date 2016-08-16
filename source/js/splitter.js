'use strict';

window.MNDMPS = window.MNDMPS || {};

/**
 * Splitter used for the code and svg examples block on the home page
 */

window.MNDMPS.Splitter = {

    _data: {
        transitionXRegex: /\.*translateX\((.*)px\)/i
    },

    /**
     * Returns left (min) and right (max) limits for the splitter
     *
     * @param {object} view - The html wrapping node of the splitter
     */

    posLimits: function(view) {
        return {
            min: view.offsetWidth * 0.15,
            max: view.offsetWidth * 0.95
        };
    },

    /**
     * Returns parsed values for splitter positions
     *
     * @param {object} view - The html wrapping node of the splitter
     * @param {(number|string)} pos - Split position
     */

    sanitisePos: function(view, pos) {
        var posLimits = this.posLimits(view);

        if (pos < posLimits.min) {
            pos = posLimits.min;
        } else if (pos > posLimits.max) {
            pos = posLimits.max;
        }

        return pos;
    },

    /**
     * Changes clipping parametres for the clipped block
     *
     * @param {object} obj - A set of parametres
     * @param {object} obj.splitter - The splitter html node
     * @param {(number|string)} obj.pos - New clipping position
     */

    moveClip: function(obj) {
        var view = obj.splitter.parentNode.parentNode.parentNode,
            pos = this.sanitisePos(view, obj.pos);
        
        obj.splitter.setAttribute('data-clip', obj.pos);

        if (document.documentElement.style.hasOwnProperty('webkitClipPath')) {
            obj.splitter.style.webkitClipPath = 'inset(0px 0px 0px ' + obj.pos + 'px)';
        } else {
            obj.splitter.style.clip = 'rect(0px, ' + view.offsetWidth + 'px, ' + view.offsetHeight + 'px, ' + obj.pos + 'px)';
        }
    },

    /**
     * Moves the splitter knob
     *
     * @param {object} obj - A set of parametres
     * @param {object} obj.splitter - The splitter object
     * @param {(number|string)} obj.pos - New clipping position
     */

    moveKnob: function(obj) {
        var pos = this.sanitisePos(obj.splitter.view, obj.pos);

        obj.splitter.dragger.setAttribute('data-translate', pos);
        obj.splitter.dragger.style.transform = 'translateX(' + pos + 'px)';
    },

    /**
     * Sets the new splitter wrapper width.
     * Usually happens on window resize.
     *
     * @param {object} splitter - The splitter object
     */

    setNewContainerWidth: function(splitter) {
        splitter.view.setAttribute('data-width', splitter.view.offsetWidth);
    },

    /**
     * Returns the wrapper width change percentage
     *
     * @param {object} splitter - The splitter object
     */

    getChangePercent: function(splitter) {
        var width = parseInt(splitter.view.getAttribute('data-width'), 10),
            newWidth = splitter.view.offsetWidth;

        return (newWidth - width) / width;
    },

    /**
     * Returns new clipping position based on the the new wrapper width
     *
     * @param {object} splitter - The splitter object
     * @param {number} oldPos - The previous position
     * @param {number} changePercent - The percantage the splitter with was changed
     */

    getNewPos: function(splitter, oldPos, changePercent) {
        var newPos = null;

        if (changePercent < 0) {
            newPos = oldPos + Math.floor(oldPos * changePercent);
        } else {
            newPos = oldPos + Math.ceil(oldPos * changePercent);
        }

        return newPos;
    },

    /**
     * Changes all splitters width.
     * Usually happens on window resize.
     */

    resizeSplitters: function() {

        var _this = window.MNDMPS.Splitter,
            data = _this._data,
            splitters = data.splitters,
            changePercent = null,
            dragPos = null;

        for (var i = 0; i < splitters.length; i++) {
            dragPos = splitters[i].dragger.getAttribute('data-translate');

            if (dragPos === null || parseInt(dragPos, 10) <= 10) {
                continue;
            }

            changePercent = _this.getChangePercent(splitters[i]);

            _this.moveKnob({
                splitter: splitters[i],
                pos: _this.getNewPos(splitters[i], parseInt(dragPos, 10), changePercent)
            });

            for (var j = 0; j < splitters[i].slides.length; j++) {
                _this.moveClip({
                    splitter: splitters[i].slides[j].children[1],
                    pos: _this.getNewPos(splitters[i], parseInt(splitters[i].slides[j].children[1].getAttribute('data-clip'), 10), changePercent)
                });
            }

            _this.setNewContainerWidth(splitters[i]);
        }
    },

    /**
     * Changes clipping position for all slides, visible or hidden
     *
     * @param {object} splitter - The splitter object
     * @param {object} splitter.view - The splitter wrapper
     * @param {array} splitter.slides - Slides
     */

    processSlides: function(splitter) {

        var data = this._data,
            width = splitter.view.offsetWidth,
            height = splitter.view.offsetHeight,
            el = null;

        for (var i = 0; i < splitter.slides.length; i++) {
            el = splitter.slides[i].querySelectorAll('[data-slide="right"]')[0];

            if (document.documentElement.style.hasOwnProperty('webkitClipPath')) {
                el.style.webkitClipPath = 'inset(0px 0px 0px ' + data.clipX + 'px)';
            } else {
                el.style.clip = 'rect(0px, ' + width + 'px, ' + height + 'px, ' + data.clipX + 'px)';
            }

            el.setAttribute('data-clip', data.clipX);
        }
    },

    /**
     * Initialises the splitter knob dragging
     *
     * @param {object} obj - The splitter object
     * @param {array} splitter.dragger - The knob node
     * @param {object} splitter.view - The splitter wrapper
     */

    initDragger: function(obj) {

        var _this = this,
            data = this._data,
            dragger = obj.dragger,
            view = obj.view;

        /**
         * Removes mouse and tiuch listeners from the document
         *
         * @param {object} event - The mouse or touch event
         */

        function removeListeners(event) {
            document.removeEventListener('mousedown', removeListeners, false);
            document.removeEventListener('touchstart', removeListeners, false);
            document.removeEventListener('mouseup', removeListeners, false);
            document.removeEventListener('touchend', removeListeners, false);
            document.removeEventListener('mousemove', drag, false);
            document.removeEventListener('touchmove', drag, false);
        }

        /**
         * Listens for mouse or touch movement while it is pressed.
         * Moves the knob and updates clipping values.
         *
         * @param {object} event - The mouse or touch event
         */

        function drag(event) {

            window.MNDMPS.Helpers.pauseEvent(event);

            var newMouseX = null;

            if (event.touches && event.touches.length) {
                newMouseX = event.touches[0].pageX;
            } else {
                newMouseX = event.pageX;
            }

            var diff = newMouseX - data.mouseX,
                relativeOffsetX = data.relativeX + diff + data.offsetX,
                newTranslateX = null;

            if (relativeOffsetX <= 5 || relativeOffsetX >= data.viewWidth - 5) {
                return;
            }

            if (data.translateX) {
                newTranslateX = data.translateX + diff;
            } else {
                newTranslateX = diff;
            }

            dragger.style.transform = 'translateX(' + newTranslateX + 'px)';
            dragger.setAttribute('data-translate', newTranslateX);

            data.clipX = relativeOffsetX;

            _this.processSlides(obj);
        }

        /**
         * Stores mouse or touch initial event point.
         * Adds listeners to the document to follow the pointer movements.
         *
         * @param {object} event - The mouse or touch event
         */

        function startDrag(event) {

            // Uncomment this to remove automoving the knob after the first interaction with it
            /*if (obj.automoveHandler) {
                _this.cancelAutomove(obj);
            }*/

            if (event.touches && event.touches.length) {
                data.mouseX = event.touches[0].pageX;
            } else {
                data.mouseX = event.pageX;
            }

            data.viewX = window.MNDMPS.Helpers.getPosition(view).x;
            data.viewWidth = view.offsetWidth;
            data.relativeX = data.mouseX - data.viewX;
            data.translateX = data.transitionXRegex.exec(dragger.getAttribute('style'));
            data.offsetX = window.MNDMPS.Helpers.getPosition(event.target).x - data.mouseX;

            if (data.translateX) {
                data.translateX = parseInt(data.translateX[1], 10);
                data.offsetX += data.translateX;
            }

            document.addEventListener('mousemove', drag, false);
            document.addEventListener('touchmove', drag, false);
            document.addEventListener('mouseup', removeListeners, false);
            document.addEventListener('touchend', removeListeners, false);
            setTimeout(function() {
                document.addEventListener('mousedown', removeListeners, false);
                document.addEventListener('touchstart', removeListeners, false);
            },0);
        }

        dragger.children[0].addEventListener('mousedown', startDrag, false);
        dragger.children[0].addEventListener('touchstart', startDrag, false);
    },

    /**
     * Creates and returns a splitter object from an html node
     *
     * @param {object} el - The splitter node
     */

    create: function(el) {

        var data = this._data,
            splitter = {
                view: el,
                dragger: el.querySelectorAll('[data-splitter="drag"]')[0],
                slides: el.querySelectorAll('[data-splitter="slides"]')[0].children
            },
            initialPercent = 5,
            initialPos = null,
            slides = null;

        data.clipX = 0;
        splitter.view.setAttribute('data-width', splitter.view.offsetWidth);

        this.initDragger(splitter);
        this.processSlides(splitter);

        if (!data.splitters) {
            data.splitters = [];
        }

        data.splitters.push(splitter);

        initialPos = Math.floor(splitter.view.offsetWidth/100 * initialPercent);
        slides = splitter.slides;

        window.MNDMPS.Splitter.moveKnob({
            splitter: splitter,
            pos: initialPos
        });

        for (var i = 0; i < slides.length; i++) {
            window.MNDMPS.Splitter.moveClip({
                splitter: slides[i].children[1],
                pos: initialPos
            });
        }

        return splitter;
    },

    /**
     * Removes automoving the splitter knob
     *
     * @param {object} splitter - The splitter object
     */

    cancelAutomove: function(splitter) {
        window.removeEventListener('scroll', splitter.automoveHandler, false);
    },

    /**
     * Initialises automoving the splitter knob
     * Assings and adds a method to the splitter object
     *
     * @param {object} splitter - The splitter object
     */

    initAutomove: function(splitter) {
        splitter.automoveHandler = function() {
            var view = splitter.view,
                viewOffset = view.getBoundingClientRect(),
                windowPercent = window.innerHeight/100,
                scrolledPercent = 100 - ((viewOffset.top + view.offsetHeight/2) / windowPercent),
                newPos = Math.floor(view.offsetWidth/100 * scrolledPercent),
                slides = splitter.slides;

            if (scrolledPercent <= 5 || scrolledPercent >= 95) {
                return;
            }

            window.MNDMPS.Splitter.moveKnob({
                splitter: splitter,
                pos: newPos
            });

            for (var i = 0; i < slides.length; i++) {
                window.MNDMPS.Splitter.moveClip({
                    splitter: slides[i].children[1],
                    pos: newPos
                });
            }
        }

        window.addEventListener('scroll', splitter.automoveHandler, false);

        splitter.automoveHandler();
    },

    /**
     * Assigns the window resize listener to execute splitters resizing methods
     */

    init: function() {
        window.addEventListener('resize', this.resizeSplitters, false);
    }
};
