'use strict';

window.MNDMPS = window.MNDMPS || {};

/**
 * Main object with a bunch of stuff that is used on the web site.
 */

window.MNDMPS.App = {

    _data: {},

    /**
     * Initialises the typing text on the home page
     * Uses typed.js library
     */

    typist: function() {
        var data = this._data;

        data.typist = [];

        var topTypist = $("#topTypist");

        topTypist.typed({
            strings: ['The Database for AI'],
            typeSpeed: 20,
            backSpeed: 5,
            backDelay: 1500,
            loop: false
        });

        data.typist.push(topTypist);

        var advantagesTypist = $("#advantagesTypist");

        advantagesTypist.typed({
            strings: ['match ($a, $b) isa knows;<br/>$b isa person, has name "Marco";<br/>select $a;',
            'match ($a, $b) isa employment;<br/>$b isa company, has name "Grakn";<br/>select $a;',
            'match ($a, $b) isa knows;<br/>($b, $c) isa employment;<br/>$c isa company, has name "Grakn";'],
            typeSpeed: 5,
            backSpeed: 0,
            backDelay: 5000,
            loop: true
        });

        data.typist.push(advantagesTypist);
    },

    /**
     * Initialises the code highlighter for code and graph examples on the home page
     * Uses prism.js library
     */

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

    /**
     * Initialises the real-time stats svg animation for "Why use MindmapsDB?" section
     *
     * @param {object} node - The html node to append the graph to
     */

    initRealTimeAnalytics: function(node) {

        var i = null,
            tempMaxArray = [],
            tickGap = 50,
            segments = 80,
            duration = 1000,
            nowDate = new Date(Date.now() - duration),
            data = [
                d3.range(segments).map(function() { return 0; }),
                d3.range(segments).map(function() { return 0; })
            ],

            margin = {top: 2, right: 1, bottom: 20, left: 1},
            width = node.offsetWidth - margin.right - margin.left,
            height = node.offsetHeight - margin.top - margin.bottom,

            x = d3.time.scale()
                .domain([nowDate - (segments - 2) * duration, nowDate - duration])
                .range([0, width]),

            y = d3.scale.linear()
                .range([height, 0]),

            line = d3.svg.line()
                .interpolate('basis')
                .x(function(d, i) {return x(nowDate - (segments - 1 - i) * duration);})
                .y(function(d, i) {return y(d);}),

            svgNode = d3.select(node).append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .style('margin-left', -margin.left + 'px'),

            svg = svgNode
                    .append('g')
                        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')'),

            mask = svg.append('defs').append('clipPath')
                .attr('id', 'realTimeClip')
                    .append('rect')
                        .attr('width', width)
                        .attr('height', height),

            axis = svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0, ' + height + ')')
                .call(x.axis = d3.svg.axis().scale(x).orient('bottom').ticks(Math.floor(width/tickGap))),

            paths = svg.append('g')
                .attr('class', 'lines')
                .attr('clip-path', 'url(#realTimeClip)');

        for (i = 0; i < data.length; i++) {
            for (var j = segments/2; j < data[i].length; j++) {
                data[i][j] = Math.min(30, Math.random() * 30);
            }
        }

        for (i = 0; i < data.length; i++) {
            paths
                .append('path')
                    .datum(data[i])
                    .attr('class', 'line_' + i);
        }

        var transition = d3.select({}).transition()
            .duration(duration)
            .ease('linear');

        y.domain([0, 30]);

        window.addEventListener('resize', function() {
            width = node.offsetWidth - margin.right - margin.left,
            height = node.offsetHeight - margin.top - margin.bottom;

            x.range([0, width])
                .axis
                .ticks(Math.floor(width/tickGap));

            mask
                .attr('width', width)
                .attr('height', height);

            svgNode
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);
        }, false);

        function tick() {
            transition = transition.each(function() {

                // push the accumulated count onto the back, and reset the count
                for (i = 0; i < data.length; i++) {
                    data[i].push(Math.min(30, Math.random() * 30));

                    // redraw the line
                    svg.select('.line_' + i)
                        .attr("d", line)
                        // slide the line left
                        .attr("transform", null)
                        .transition()
                        .attr('transform', 'translate(' + x(nowDate - (segments - 1) * duration) + ')');

                    // pop the old data point off the front
                    data[i].shift();
                }

                // slide the x-axis left
                axis.call(x.axis);

                // update the domains
                tempMaxArray = [];
                for (i = 0; i < data.length; i++) {
                    tempMaxArray.push.apply(tempMaxArray, data[i]);
                }
                nowDate = new Date();
                x.domain([nowDate - (segments - 2) * duration, nowDate - duration]);

            }).transition().each('start', tick);
        }

        tick();
    },

    /**
     * Initialises the graph svg animation for "Why use MindmapsDB?" section
     *
     * @param {object} node - The html node to append the graph to
     */

    initImplicitData: function(node) {

        var width = node.offsetWidth,
            height = node.offsetHeight,
            svg = node.children[0],
            maskPath = svg.getElementsByClassName('maskPath')[0],
            maskVisible = svg.getElementsByClassName('maskVisible')[0],
            speed = 4000,
            timeout = 600,
            pos = {
                max: 60,
                min: 0
            },
            maskTween = new Tweenable();

        function moveMask() {

            var currentPos = maskVisible.getAttribute('data-x') || pos.min;
            currentPos = parseInt(currentPos, 10);

            maskTween.tween({
                from: {x: currentPos > 40 ? pos.max : pos.min},
                to:   {x: currentPos > 40 ? pos.min : pos.max},
                duration: speed,
                easing: 'easeInOutQuart',
                step: function(state) {
                    maskVisible.setAttribute('data-x', state.x);
                    maskVisible.setAttribute('transform', 'translate (' + state.x + ' 0)');
                    maskPath.setAttribute('transform', 'translate (' + state.x + ' 0)');
                },
                finish: function() {
                    setTimeout(function() {
                        moveMask();
                    }, timeout);
                }
            });
        }

        moveMask();
    },

    /**
     * Initialises the "Why use MindmapsDB?" section
     */

    initAdvantages: function() {

        this.initRealTimeAnalytics(document.getElementsByClassName('advantages-realtime')[0]);
        this.initImplicitData(document.getElementsByClassName('advantages-discover')[0]);
    },

    /**
     * Initialises everything we need on the website and the home page
     */

    init: function() {

        var data = this._data,
            codeEditor = document.getElementsByClassName('editor')[0],
            titleContainer = document.getElementsByClassName('title')[0],
            platformContainer = document.getElementsByClassName('platform-wrapper')[0],
            advantagesContainer = document.getElementsByClassName('advantages-wrapper')[0],
            careersContainer = document.getElementsByClassName('careers-wrapper')[0],
            docsContainer = document.getElementById('docs-wrapper');

        if (platformContainer) {
           window.MNDMPS.Slider.init();
        }
        
        window.MNDMPS.Nav.init();

        if (careersContainer) {
            window.MNDMPS.Careers.init(careersContainer);
        }

        if (titleContainer) {

            this.typist();

            var codeSplitter = window.MNDMPS.Splitter.create(document.getElementById('code-container').querySelectorAll('[data-splitter="view"]')[0]),
                graqlSvgContainers = document.querySelectorAll('[data-splitter="slides"]')[0].querySelectorAll('[data-slide="right"]');

            window.MNDMPS.Splitter.initAutomove(codeSplitter);
            window.MNDMPS.Splitter.init();

            window.MNDMPS.Tabs.init(document.getElementById('code-container').querySelectorAll('[data-tabs="view"]')[0]);

            this.initPrism();

            // Initialising SVGs

            for (var i = 0; i < graqlSvgContainers.length; i++) {
                if (window.MNDMPS.Graph._data.homepageGraphs[i]) {
                    window.MNDMPS.Graph.init(graqlSvgContainers[i], window.MNDMPS.Graph._data.homepageGraphs[i]);
                }
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

        // Team photos on the About page

        if (document.getElementsByClassName('team-wrapper')[0]) {
            atvImg();
        }

        if (advantagesContainer) {
            this.initAdvantages();
        }

        if (docsContainer) {
            window.MNDMPS.Docs.init(docsContainer);
        }
    }
};

window.MNDMPS.App.init();
