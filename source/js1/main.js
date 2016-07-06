'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.App = {

    _data: {},

    typist: function() {
        $("#typist").typed({
            strings: ['is a reasoning engine', 'is an analytics tool', 'is a graph database', 'is an AI-Driven Data Platform'],
            typeSpeed: 60,
            backSpeed: 15,
            backDelay: 3000,
            loop: true
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

        this.typist();
        
        window.MNDMPS.Splitter.create(document.getElementById('code-container').querySelectorAll('[data-splitter="view"]')[0]);
        window.MNDMPS.Splitter.init();

        window.MNDMPS.Tabs.init(document.getElementById('code-container').querySelectorAll('[data-tabs="view"]')[0]);

        this.initPrism();

        // Initialising SVG shit

        var graqlSvgContainers = document.querySelectorAll('[data-splitter="slides"]')[0].querySelectorAll('[data-slide="right"]');

        for (var i = 0; i < graqlSvgContainers.length; i++) {
            if (window.MNDMPS.Graph._data.homepageGraphs[i]) {
                window.MNDMPS.Graph.init(graqlSvgContainers[i], window.MNDMPS.Graph._data.homepageGraphs[i]);
            }
        }

        window.addEventListener('resize', function() {
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
    }
};

window.MNDMPS.App.init();