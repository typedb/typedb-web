/*
 * A modified version of
 * atvImg
 * Copyright 2015 Drew Wilson
 * http://drewwilson.com
 */

function atvImg(){

    var d = document,
        de = d.documentElement,
        bd = d.getElementsByTagName('body')[0],
        win = window,
        imgs = d.querySelectorAll('.atvImg'),
        totalImgs = imgs.length,
        supportsTouch = 'ontouchstart' in win || navigator.msMaxTouchPoints,
        thresholds = true,
        offsetThreshold = 0.6,
        angleThreshold = 140;

    if (totalImgs <= 0) {
        return;
    }

    // build HTML
    for (var l=0; l < totalImgs; l++) {

        var thisImg = imgs[l],
            layerElems = thisImg.querySelectorAll('.atvImg-layer'),
            totalLayerElems = layerElems.length;

        if (totalLayerElems <= 0) {
            continue;
        }

        while (thisImg.firstChild) {
            thisImg.removeChild(thisImg.firstChild);
        }

        var containerHTML = d.createElement('div'),
            shineHTML = d.createElement('div'),
            shadowHTML = d.createElement('div'),
            layersHTML = d.createElement('div'),
            layers = [];

        thisImg.id = 'atvImg__' + l;
        containerHTML.className = 'atvImg-container';
        shineHTML.className = 'atvImg-shine';
        shadowHTML.className = 'atvImg-shadow';
        layersHTML.className = 'atvImg-layers';

        for (var i=0; i < totalLayerElems; i++) {
            var layer = d.createElement('div');

            if (layerElems[i].getAttribute('data-text') === 'true') {
                var elSrc = layerElems[i].innerHTML;
                layer.innerHTML = elSrc;
            } else {
                var imgSrc = layerElems[i].getAttribute('data-img');
                if (imgSrc) {
                    layer.style.backgroundImage = 'url('+imgSrc+')';
                } else {
                    layer.style.backgroundImage = 'none';
                }
            }

            layer.className = 'atvImg-rendered-layer';
            layer.setAttribute('data-layer',i);
            layersHTML.appendChild(layer);

            if (layerElems[i].classList.length > 1) {
                for (var k = 0; k < layerElems[i].classList.length; k++) {
                    if (layerElems[i].classList[k] !== 'atvImg-layer') {
                        layer.classList.add(layerElems[i].classList[k]);
                    }
                }
            }

            layers.push(layer);
        }

        containerHTML.appendChild(shadowHTML);
        containerHTML.appendChild(layersHTML);
        containerHTML.appendChild(shineHTML);
        thisImg.appendChild(containerHTML);

        var w = thisImg.clientWidth || thisImg.offsetWidth || thisImg.scrollWidth;

        thisImg.style.webkitTransform = 'perspective(' + w*3 + 'px)';
        thisImg.style.transform = 'perspective(' + w*3 + 'px)';

        if (supportsTouch) {
            win.preventScroll = false;

            (function(_thisImg, _layers, _totalLayers, _shine) {
                thisImg.addEventListener('touchmove', function(e) {
                    if (win.preventScroll) {
                        e.preventDefault();
                    }
                    processMovement(e, true, _thisImg, _layers, _totalLayers, _shine);       
                });
                
                thisImg.addEventListener('touchstart', function(e) {
                    win.preventScroll = false;
                    for (var h = 0; h < totalImgs; h++) {
                        imgs[h].firstChild.classList.remove('over');
                    }
                    
                    processEnter(e, _thisImg);
                });
                
                thisImg.addEventListener('touchend', function(e) {
                    win.preventScroll = false;
                    processExit(e, _thisImg, _layers, _totalLayers, _shine);
                });
            })(thisImg, layers, totalLayerElems, shineHTML);
        } else {
            (function(_thisImg, _layers, _totalLayers, _shine) {
                thisImg.addEventListener('mousemove', function(e) {
                    processMovement(e, false, _thisImg, _layers, _totalLayers, _shine);      
                });
                
                thisImg.addEventListener('mouseenter', function(e) {
                    processEnter(e, _thisImg);
                });
                
                thisImg.addEventListener('mouseleave', function(e) {
                    processExit(e, _thisImg, _layers, _totalLayers, _shine);        
                });
            })(thisImg, layers, totalLayerElems, shineHTML);
        }
    }

    window.addEventListener('contextmenu', function(event) {
        for (var l = 0; l < totalImgs; l++) {
            imgs[l].firstChild.classList.remove('over');
        }
    }, false);

    function getSign(number) {
        return number > 0 ? 1 : number === 0 ? 0 : -1;
    }

    function processMovement(e, touchEnabled, elem, layers, totalLayers, shine){

        var bdst = f_scrollTop(),
            bdsl = f_scrollLeft(),
            pageX = (touchEnabled)? e.touches[0].pageX : e.pageX,
            pageY = (touchEnabled)? e.touches[0].pageY : e.pageY,
            offsets = elem.getBoundingClientRect(),
            w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth, // width
            h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight, // height
            wMultiple = 160/w,
            offsetX = 0.52 - (pageX - offsets.left - bdsl)/w, //cursor position X
            offsetY = 0.52 - (pageY - offsets.top - bdst)/h, //cursor position Y
            dy = (pageY - offsets.top - bdst) - h / 2, //@h/2 = center of container
            dx = (pageX - offsets.left - bdsl) - w / 2; //@w/2 = center of container

        if (thresholds) {
            offsetX = Math.abs(offsetX) > offsetThreshold ? offsetThreshold * getSign(offsetX) : offsetX;
            offsetY = Math.abs(offsetY) > offsetThreshold ? offsetThreshold * getSign(offsetY) : offsetY;
            dx = Math.abs(dx) > angleThreshold ? angleThreshold * getSign(dx) : dx;
            dy = Math.abs(dy) > angleThreshold ? angleThreshold * getSign(dy) : dy;
        }
        
        var yRotate = (offsetX - dx)*(0.07 * wMultiple), //rotation for container Y
            xRotate = (dy - offsetY)*(0.1 * wMultiple), //rotation for container X
            imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg) translateZ(20px)', //img transform
            arad = Math.atan2(dy, dx), //angle between cursor and center of container in RAD
            angle = arad * 180 / Math.PI - 90; //convert rad in degrees

        //get angle between 0-360
        if (angle < 0) {
            angle = angle + 360;
        }

        //container transform
        //if(elem.firstChild.className.indexOf(' over') != -1) {
        if (elem.firstChild.classList.contains('over')) {
            imgCSS += ' scale3d(0.98, 0.98, 0.98)';
        }
        
        elem.firstChild.style.webkitTransform = imgCSS;
        elem.firstChild.style.transform = imgCSS;
        
        //gradient angle and opacity for shine
        if (thresholds) {
            var gradient = pageY - offsets.top - bdst,
                gradientThreshold = elem.offsetHeight * 1.2;
            gradient = gradient > gradientThreshold ? gradientThreshold : gradient;

            shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (gradient)/h * 0.24 + ') 0%,rgba(255,255,255,0) 80%)';
        } else {
            shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (pageY - offsets.top - bdst)/h * 0.24 + ') 0%,rgba(255,255,255,0) 80%)';
        }

        shine.style.webkitTransform = 'translateX(' + (offsetX * totalLayers) - 0.1 + 'px) translateY(' + (offsetY * totalLayers) - 0.1 + 'px)';
        shine.style.transform = 'translateX(' + (offsetX * totalLayers) - 0.1 + 'px) translateY(' + (offsetY * totalLayers) - 0.1 + 'px)';
        

        //parallax for each layer
        var revNum = totalLayers;
        for(var ly=0; ly < totalLayers; ly++) {
            layers[ly].style.webkitTransform = 'translateX(' + (offsetX * revNum) * ((ly * 2.5) / wMultiple) + 'px) translateY(' + (offsetY * totalLayers) * ((ly * 2.5) / wMultiple) + 'px)';
            layers[ly].style.transform = 'translateX(' + (offsetX * revNum) * ((ly * 2.5) / wMultiple) + 'px) translateY(' + (offsetY * totalLayers) * ((ly * 2.5) / wMultiple) + 'px)';
            revNum--;
        }
    }

    function refreshRandomClass(el) {
        var type = Math.random();
        el = el.getElementsByClassName('bg')[0];
        
        el.classList.remove('fly');
        el.classList.remove('fade');

        if ((type > 0 && type < 0.5) || type === 0) {
            el.classList.add('fly');
        } else {
            el.classList.add('fade');
        }
    }

    function processEnter(e, elem){
        //elem.firstChild.className += ' over';
        elem.firstChild.classList.add('over');
        refreshRandomClass(elem.firstChild);
    }

    function processExit(e, elem, layers, totalLayers, shine){

        var container = elem.firstChild;

        //container.className = container.className.replace(' over','');
        container.classList.remove('over');
        container.style.webkitTransform = '';
        container.style.transform = '';
        shine.style.cssText = '';
        
        for(var ly=0; ly < totalLayers; ly++) {
            layers[ly].style.webkitTransform = '';
            layers[ly].style.transform = '';
        }
    }
}