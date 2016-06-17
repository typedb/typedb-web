'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.Splitter = {
    
    _data: {
        transitionXRegex: /\.*translateX\((.*)px\)/i
    },

    resizeSplitters: function() {

        var data = window.MNDMPS.Splitter._data,
            splitters = data.splitters,
            changePercent = null,
            width = null,
            newHeight = null,
            newWidth = null,
            dragPos = null,
            newDragPos = null,
            clipPos = null,
            newClipPos = null;

        for (var i = 0; i < splitters.length; i++) {
            dragPos = splitters[i].dragger.getAttribute('data-translate');

            if (dragPos === null || parseInt(dragPos, 10) <= 10) {
                continue;
            }
            
            width = parseInt(splitters[i].view.getAttribute('data-width'), 10);
            newWidth = splitters[i].view.offsetWidth;
            newHeight = splitters[i].view.offsetHeight;
            changePercent = (newWidth - width) / width;
            splitters[i].view.setAttribute('data-width', newWidth);

            dragPos = parseInt(dragPos, 10);
            
            if (changePercent < 0) {
                newDragPos = dragPos + Math.floor(dragPos * changePercent);
            } else {
                newDragPos = dragPos + Math.ceil(dragPos * changePercent);
            }

            splitters[i].dragger.setAttribute('data-translate', newDragPos);
            splitters[i].dragger.style.transform = 'translateX(' + newDragPos + 'px)';

            for (var j = 0; j < splitters[i].slides.length; j++) {
                clipPos = parseInt(splitters[i].slides[j].children[1].getAttribute('data-clip'), 10);

                if (changePercent < 0) {
                    newClipPos = clipPos + Math.floor(clipPos * changePercent);
                } else {
                    newClipPos = clipPos + Math.ceil(clipPos * changePercent);
                }

                splitters[i].slides[j].children[1].setAttribute('data-clip', newClipPos);

                if (document.documentElement.style.hasOwnProperty('webkitClipPath')) {
                    splitters[i].slides[j].children[1].style.webkitClipPath = 'inset(0px 0px 0px ' + newClipPos + 'px)';
                } else {
                    splitters[i].slides[j].children[1].style.clip = 'rect(0px, ' + newWidth + 'px, ' + newHeight + 'px, ' + newClipPos + 'px)';
                }
            }
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
            };

        data.clipX = 0;
        splitter.view.setAttribute('data-width', splitter.view.offsetWidth);

        this.initDragger(splitter);

        this.processSlides(splitter);

        if (!data.splitters) {
            data.splitters = [];
        }

        data.splitters.push(splitter);
    },

    init: function() {
        window.addEventListener('resize', this.resizeSplitters, false);
    }
};