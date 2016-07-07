'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.Splitter = {
    
    _data: {
        transitionXRegex: /\.*translateX\((.*)px\)/i
    },

    moveClip: function(obj) {
        obj.splitter.setAttribute('data-clip', obj.pos);

        if (document.documentElement.style.hasOwnProperty('webkitClipPath')) {
            obj.splitter.style.webkitClipPath = 'inset(0px 0px 0px ' + obj.pos + 'px)';
        } else {
            obj.splitter.style.clip = 'rect(0px, ' + obj.splitter.view.offsetWidth + 'px, ' + obj.splitter.view.offsetHeight + 'px, ' + obj.pos + 'px)';
        }
    },

    moveKnob: function(obj) {
        obj.knob.setAttribute('data-translate', obj.pos);
        obj.knob.style.transform = 'translateX(' + obj.pos + 'px)';
    },

    setNewContainerWidth: function(splitter) {
        splitter.view.setAttribute('data-width', splitter.view.offsetWidth);
    },

    getChangePercent: function(splitter) {
        var width = parseInt(splitter.view.getAttribute('data-width'), 10),
            newWidth = splitter.view.offsetWidth;

        return (newWidth - width) / width;
    },

    getNewPos: function(splitter, oldPos, changePercent) {
        var newPos = null;

        if (changePercent < 0) {
            newPos = oldPos + Math.floor(oldPos * changePercent);
        } else {
            newPos = oldPos + Math.ceil(oldPos * changePercent);
        }

        return newPos;
    },

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
                knob: splitters[i].dragger,
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

    initDragger: function(obj) {

        var _this = this,
            data = this._data,
            dragger = obj.dragger,
            view = obj.view;

        function removeListeners(event) {
            document.removeEventListener('mousedown', removeListeners, false);
            document.removeEventListener('touchstart', removeListeners, false);
            document.removeEventListener('mouseup', removeListeners, false);
            document.removeEventListener('touchend', removeListeners, false);
            document.removeEventListener('mousemove', drag, false);
            document.removeEventListener('touchmove', drag, false);
        }

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

        function startDrag(event) {

            if (obj.automoveHandler) {
                _this.cancelAutomove(obj);
            }

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
            knob: splitter.dragger,
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

    cancelAutomove: function(splitter) {
        window.removeEventListener('scroll', splitter.automoveHandler, false);
    },

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
                knob: splitter.dragger,
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
    },

    init: function() {
        window.addEventListener('resize', this.resizeSplitters, false);
    }
};