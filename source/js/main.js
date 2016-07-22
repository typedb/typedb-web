'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.App = {

    _data: {},

    typist: function() {
        var data = this._data;

        data.typist = $("#typist");

        data.typist.typed({
            strings: ['a knowledge graph', 'an inference engine', 'an analytics tool', 'a distributed semantic database'],
            typeSpeed: 10,
            backSpeed: 5,
            backDelay: 1500,
            loop: false
        });
    },

    initPrism: function() {

        var textareas = document.getElementsByClassName('code-input');

        function renderOutput(input) {

            var value = input.value;

            value = value
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;") + "\n";

            $(input).next().children(0)[0].innerHTML = value;

            Prism.highlightAll();
        }

        function listenerForScroll(input) {
            input.addEventListener('scroll', function(event) {
                $(this).next()[0].scrollTop = this.scrollTop;
            }, false);
        }

        for (var i = 0; i < textareas.length; i++) {
            renderOutput(textareas[i]);
            listenerForScroll(textareas[i]);
        }
    },

    init: function() {

        var data = this._data,
            codeEditor = document.getElementsByClassName('editor')[0];

        window.MNDMPS.Nav.init();

        this.typist();

        var codeSplitter = window.MNDMPS.Splitter.create(document.getElementById('code-container').querySelectorAll('[data-splitter="view"]')[0]);
        window.MNDMPS.Splitter.initAutomove(codeSplitter);
        window.MNDMPS.Splitter.init();

        window.MNDMPS.Tabs.init(document.getElementById('code-container').querySelectorAll('[data-tabs="view"]')[0]);

        this.initPrism();

        // Initialising SVG

        var graqlSvgContainers = document.querySelectorAll('[data-splitter="slides"]')[0].querySelectorAll('[data-slide="right"]');

        for (var i = 0; i < graqlSvgContainers.length; i++) {
            if (window.MNDMPS.Graph._data.homepageGraphs[i]) {
                window.MNDMPS.Graph.init(graqlSvgContainers[i], window.MNDMPS.Graph._data.homepageGraphs[i]);
            }
        }

        window.addEventListener('resize', function() {

            window.MNDMPS.Map.center(window.MNDMPS.Map.data.googleMap, window.MNDMPS.Map.data.googleMapLatLng, 0, 0);
                
            if (codeEditor) {
                var tabs = codeEditor.getElementsByClassName('content')[0].children;

                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].classList.contains('active')) {
                        window.MNDMPS.Graph.redraw('graph' + i);
                        break;
                    }
                }
            }
        }, false);

        window.MNDMPS.Slider.init();

        google.maps.event.addDomListener(window, 'load', window.MNDMPS.Map.load);

        // Modal

        if (document.getElementsByClassName('modal-underlay').length) {
            window.MNDMPS.Modal.init();
        }

        var getMindmapsButton = document.getElementsByClassName('installMindmaps');

        if (getMindmapsButton.length) {
            for (var i = 0; i < getMindmapsButton.length; i++) {
                getMindmapsButton[i].addEventListener('click', window.MNDMPS.Modal.open, false);
            }
        }
    }
};

window.MNDMPS.App.init();
