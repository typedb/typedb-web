'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.App = {

    data: {},

    processScroll: function(scrolledY, scrolledX) {

        if (window.MNDMPS.threeD.data.threeDRunning) {
            this.refreshMousePositionOnScroll(scrolledY, scrolledX);
        }

        if (scrolledY > this.data.windowHeight * 0.50 - this.data.menuBar.offsetHeight) {
            this.data.menuBar.classList.add('scrolled');
            window.MNDMPS.threeD.data.threeDRunning = false;
        } else {
            this.data.menuBar.classList.remove('scrolled');
            window.MNDMPS.threeD.data.threeDRunning = true;
        }
    },

    refreshMousePositionOnScroll: function(scrolledY, scrolledX) {
        this.data.lastScrolledLeft = this.data.lastScrolledLeft || 0;
        this.data.lastScrolledTop = this.data.lastScrolledTop || 0;

        if (this.data.lastScrolledLeft !== scrolledX) {
            this.data.mouseX -= this.data.lastScrolledLeft;
            this.data.lastScrolledLeft = scrolledX;
            this.data.mouseX += this.data.lastScrolledLeft;
        }

        if (this.data.lastScrolledTop != scrolledY) {
            this.data.mouseY -= this.data.lastScrolledTop;
            this.data.lastScrolledTop = scrolledY;
            this.data.mouseY += this.data.lastScrolledTop;
        }

        this.data.mouseX = this.data.mouseX > this.data.windowWidth ? this.data.windowWidth : this.data.mouseX;
        this.data.mouseY = this.data.mouseY > this.data.windowHeight ? this.data.windowHeight : this.data.mouseY;
    },

    watchScroll: function() {
        document.addEventListener('scroll', function(event) {
            window.MNDMPS.App.processScroll(f_scrollTop(), f_scrollLeft());
        }, false);
    },

    appendSVGSplash: function() {
        var container = document.getElementsByClassName('splash')[0],
            svgSplash = document.createElement('div'),
            svgContainer = document.createElement('div'),

            svg = '<svg viewBox="0 0 130 130"><style type="text/css">.st0{fill: #ffffff; stroke-width: 0;}.st1{fill: none; stroke: #ffffff; stroke-width: 0.1;}.st2{fill: none; stroke: #ffffff; stroke-width: 0.5;}</style><g class="polygons"><polygon points="77,89 43.6,77.9 75,35"/><polygon points="85,45 65,35 35,55"/><polygon points="55,55 35,35 65,5"/><polygon points="77.9,43.6 65,5 95,35"/><polygon points="53,41 65,5 90.7,47.9"/><polygon points="78.3,61.7 95,35 125,65"/><polygon points="55,75 35,35 83,59"/><polygon points="53,41 5,65 35,35"/><polygon points="47.9,39.3 5,65 47,71"/><polygon points="50,50 65,65 95,35"/><polygon points="80,80 35,65 95,50"/><polygon points="85,85 35,95 47,59"/><polygon points="65,125 47,71 83,89"/><polygon points="86.4,69.3 125,65 95,80"/><polygon points="89,47 125,65 95,95"/><polygon points="95,50 95,95 72.5,42.5"/><polygon points="95,95 85,45 65,93.5"/><polygon points="35,95 72.3,76.3 65,125"/><polygon points="35,75 45,45 5,65"/><polygon points="65,125 95,95 45,85"/><polygon points="35,95 5,65 55,55"/></g><g><line class="st1" x1="5" y1="65" x2="35" y2="35"/><line class="st1" x1="35" y1="35" x2="65" y2="5"/><line class="st1" x1="65" y1="5" x2="95" y2="35"/><line class="st1" x1="95" y1="35" x2="125" y2="65"/><line class="st1" x1="125" y1="65" x2="95" y2="95"/><line class="st1" x1="95" y1="95" x2="65" y2="125"/><line class="st1" x1="65" y1="125" x2="35" y2="95"/><line class="st1" x1="35" y1="95" x2="5" y2="65"/><line class="st1" x1="5" y1="65" x2="35" y2="65"/><line class="st1" x1="35" y1="65" x2="65" y2="65"/><line class="st1" x1="65" y1="65" x2="95" y2="65"/><line class="st1" x1="95" y1="65" x2="125" y2="65"/><line class="st1" x1="95" y1="65" x2="65" y2="95"/><line class="st1" x1="65" y1="95" x2="95" y2="95"/><line class="st1" x1="65" y1="95" x2="65" y2="125"/><line class="st1" x1="65" y1="95" x2="35" y2="95"/><line class="st1" x1="35" y1="65" x2="65" y2="95"/><line class="st1" x1="35" y1="95" x2="65" y2="65"/><line class="st1" x1="65" y1="65" x2="95" y2="95"/><line class="st1" x1="35" y1="65" x2="65" y2="35"/><line class="st1" x1="65" y1="35" x2="95" y2="65"/><line class="st1" x1="65" y1="35" x2="35" y2="35"/><line class="st1" x1="65" y1="35" x2="65" y2="5"/><line class="st1" x1="65" y1="35" x2="95" y2="35"/><line class="st1" x1="95" y1="65" x2="65" y2="5"/><line class="st1" x1="65" y1="5" x2="35" y2="65"/><line class="st1" x1="35" y1="65" x2="65" y2="125"/><line class="st1" x1="65" y1="125" x2="95" y2="65"/><line class="st1" x1="65" y1="95" x2="125" y2="65"/><line class="st1" x1="125" y1="65" x2="65" y2="35"/><line class="st1" x1="65" y1="35" x2="5" y2="65"/><line class="st1" x1="5" y1="65" x2="65" y2="95"/><line class="st1" x1="65" y1="35" x2="35" y2="95"/><line class="st1" x1="65" y1="35" x2="95" y2="95"/><line class="st1" x1="65" y1="95" x2="35" y2="35"/><line class="st1" x1="95" y1="35" x2="65" y2="95"/><line class="st1" x1="65" y1="65" x2="65" y2="35"/><line class="st1" x1="65" y1="65" x2="65" y2="95"/><line class="st1" x1="35" y1="65" x2="95" y2="35"/><line class="st1" x1="35" y1="65" x2="95" y2="95"/><line class="st1" x1="5" y1="65" x2="95" y2="35"/><line class="st1" x1="5" y1="65" x2="95" y2="95"/><line class="st1" x1="65" y1="125" x2="35" y2="35"/><line class="st1" x1="95" y1="35" x2="65" y2="125"/><line class="st1" x1="125" y1="65" x2="35" y2="35"/><line class="st1" x1="125" y1="65" x2="35" y2="95"/><line class="st1" x1="65" y1="5" x2="35" y2="95"/><line class="st1" x1="65" y1="5" x2="95" y2="95"/><line class="st1" x1="95" y1="65" x2="35" y2="35"/><line class="st1" x1="95" y1="65" x2="35" y2="95"/><circle class="st0" cx="65" cy="35" r="1"/><circle class="st0" cx="65" cy="5" r="1"/><circle class="st0" cx="65" cy="95" r="1"/><circle class="st0" cx="65" cy="125" r="1"/><circle class="st0" cx="125" cy="65" r="1"/><circle class="st0" cx="5" cy="65" r="1"/></g><g><line class="st2" x1="35" y1="95" x2="35" y2="65"/><line class="st2" x1="35" y1="65" x2="35" y2="35"/><line class="st2" x1="35" y1="35" x2="65" y2="65"/><line class="st2" x1="65" y1="65" x2="95" y2="35"/><line class="st2" x1="95" y1="35" x2="95" y2="65"/><line class="st2" x1="95" y1="65" x2="95" y2="95"/><circle class="st0" cx="65" cy="65" r="1.5"/><circle class="st0" cx="35" cy="35" r="1.5"/><circle class="st0" cx="35" cy="65" r="1.5"/><circle class="st0" cx="35" cy="95" r="1.5"/><circle class="st0" cx="95" cy="35" r="1.5"/><circle class="st0" cx="95" cy="65" r="1.5"/><circle class="st0" cx="95" cy="95" r="1.5"/></g></svg>';

        svgContainer.classList.add('svg-logo');
        svgContainer.innerHTML = svg;

        svgSplash.appendChild(svgContainer);
        svgSplash.classList.add('svg-splash');

        container.appendChild(svgSplash);
    },

    initSlick: function() {
        $('.slider-container').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            cssEase: 'ease-in-out',
            infinite: false,
            draggable: false,
            dots: true,
            easing: 'easeInOutQuart',
            mobileFirst: true,
            lazyLoad: 'progressive',
            speed: 200,
            zIndex: 1,
            arrows: false,
            responsive: [
                {
                    breakpoint: 559,
                    settings: {
                        arrows: true
                    }
                }
            ]
        });
    },

    initPlatformGraphs: function() {
        var graphs = window.D3GRPH._data.platformGraphs,
            nodes = document.getElementsByClassName('graph'),
            node = nodes[0],
            size = {
                width: node.offsetWidth,
                height: node.offsetHeight
            };

        for (var i = 0; i < graphs.length; i++) {
            window.D3GRPH.buildGraph({
                node: nodes[i],
                graph: graphs[i],
                size: size
            });
        }
    },

    initHomepageGraphs: function() {
        var graphs = window.D3GRPH._data.homepageGraphs,
            nodes = document.getElementsByClassName('graph'),
            node = nodes[0],
            size = {
                width: node.children[0].offsetWidth,
                height: node.children[0].offsetHeight
            };

        for (var i = 0; i < graphs.length; i++) {
            window.D3GRPH.buildGraph({
                node: nodes[i].children[0],
                graph: graphs[i],
                size: size
            });
        }
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

        function listenForInput(input) {

            function replicate(event) {

                var selStartPos = this.selectionStart,
                    inputVal = this.value;

                inputVal = inputVal.replace(/\t/g, '    ');
                this.value = inputVal;

                if (event.keyCode === 9) {
                    this.value = inputVal.substring(0, selStartPos) + '    ' + inputVal.substring(selStartPos, this.value.length);
                    this.selectionStart = selStartPos + 4;
                    this.selectionEnd = selStartPos + 4;
                    event.preventDefault();
                }

                renderOutput(this);
            }

            input.addEventListener('input', replicate, false);
            input.addEventListener('keydown', replicate, false);

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
            //listenForInput(textareas[i]);
            //this.dontScrollParent(textareas[i]);
        }
    },

    initStack: function() {

        var data = this.data;

        function displayDescription(name) {
            var blocks = data.techDescription.children;

            for (var i = 0; i < blocks.length; i++) {
                if (blocks[i].getAttribute('data-name') !== name) {
                    blocks[i].classList.remove('active');
                } else {
                    blocks[i].classList.add('active');
                    data.techDescription.style.height = blocks[i].offsetHeight + 'px';
                }
            }
        }

        function toggleStack(event) {
            var el = getParentElement(event.target, 'tab');

            if (!el) {
                return;
            }

            var target = el.getAttribute('data-target');

            for (var i = 0; i < data.techTabs.length; i++) {
                data.techTabs[i].classList.remove('active');
            }

            el.classList.add('active');

            displayDescription(target);
        }

        data.techStack = document.getElementsByClassName('tech-stack')[0];
        data.techDescription = data.techStack.getElementsByClassName('description')[0];
        data.techTabs = data.techStack.getElementsByClassName('tab');
        data.techStack.addEventListener('click', toggleStack, false);

        displayDescription('graph');
    },

    initJobs: function() {

        var data = this.data,
            domParser = new DOMParser(),
            loading = document.getElementsByClassName('loading')[0];

        data.jobsBlock = document.getElementById('section-jobs').children[0];

        function kFormatter(num) {
            num = parseInt(num, 10);
            var newNum = num > 999 ? Math.floor(num/1000) : num;

            return newNum + 'K';
        }

        function timeFormatter(date) {
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            var date = new Date(date),
                day = date.getDate(),
                monthIndex = date.getMonth(),
                year = date.getFullYear();

            return newDate = day + ' ' + monthNames[monthIndex] + ' ' + year;
        }

        function generateJob(obj) {
            var jobBlock = document.createElement('div');
            jobBlock.classList.add('job');

            jobBlock.innerHTML = '<h3>' + obj.title + '</h3>\
                <div class="text-block columns">\
                    <p>' + obj.description.replace(/[0-9]+\.[^.]*\.(?!\s*[0-9])/g, "$&<br>").replace(/[0-9]+\./g, "<br>$&").replace(/\*/g, '<br>') + '</p>\
                </div>\
                <ul>\
                    <li>Updated on: ' + timeFormatter(obj.updated_at) + '</li>\
                    <li>Remote: ' + (obj.remote_ok ? 'Yes' : 'No') + '</li>\
                    <li>Type: <span class="capitalise">' + obj.job_type + '</span></li>\
                    <li>Compensation: &pound;' + kFormatter(obj.salary_min) + ' — &pound;' + kFormatter(obj.salary_max) + '</li>\
                    <li>Equity: ' + obj.equity_min + '% — ' + obj.equity_max + '%</li>\
                </ul>\
                <div class="bottomLinks">\
                    <a href="mailto:recruitment@mindmaps.io">Apply</a> or <a target="_blank" rel="nofollow" href="' + obj.angellist_url + '">Check on AngelList</a>\
                </div>';

            return jobBlock;
        }

        window.MNDMPS.ajax.getAngelJobs().then(

            function(response) {
                response = JSON.parse(response);

                data.jobsBlock.removeChild(loading);

                for (var i = 0; i < response.jobs.length; i++) {
                    data.jobsBlock.appendChild(generateJob(response.jobs[i]));
                }
            },

            function(error) {
                console.log(error);
            }
        );
    },

    initPlatform: function() {

        var examples = document.getElementsByClassName('example'),
            codes = null;

        function switchView(event) {

            var target = event.target.getAttribute('data-target');

            if (!target) {
                return;
            }

            var content = this.nextElementSibling,
                tabs = this.children,
                blocks = content.children;

            for (var i = 0; i < blocks.length; i++) {
                blocks[i].classList.remove('active');

                if (blocks[i].getAttribute('data-type') === target) {
                    blocks[i].classList.add('active');
                }
            }

            for (var i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove('active');

                if (tabs[i].getAttribute('data-target') === target) {
                    tabs[i].classList.add('active');
                }
            }
        }

        function redraw(event) {
            var el = this;

            el.style.transform = 'translateZ(0)';

            setTimeout(function() {
                el.style.transform = 'scale(1)';
            }, 0);
        }

        for (var i = 0; i < examples.length; i++) {
            examples[i].children[0].addEventListener('click', switchView, false);

            examples[i].children[0].children[0].classList.add('active');
            examples[i].children[1].children[0].classList.add('active');

            codes = examples[i].children[1].getElementsByClassName('code-output');
            for (var k = 0; k < codes.length; k++) {
                codes[k].addEventListener('scroll', redraw, false);
            }
        }
    },

    init: function() {

        this.data.windowHeight = f_clientHeight();
        this.data.windowWidth = f_clientWidth();
        this.data.menuBar = document.getElementsByClassName('nav')[0];

        if (document.getElementsByClassName('splash').length) {
            if (webGLAvailable()) {
                window.MNDMPS.threeD.init();
            } else {
                this.appendSVGSplash();
            }
        }

        vanillaSmoothScroller.bind({
            selector: '.scrollTrigger',
            offset: function () {
                return window.MNDMPS.App.data.menuBar.offsetHeight;
            }
        });

        if (document.getElementById('graql-slider')) {
            this.initSlick();
            this.initHomepageGraphs();
            this.initPrism();
        }

        if (document.getElementById('section-jobs')) {
            this.initJobs();
        }

        if (document.getElementById('section-platform')) {
            this.initStack();
        }

        if (document.getElementsByClassName('splash').length) {
            this.watchScroll();
        } else {
            this.data.menuBar.classList.add('white');
        }

        if (document.getElementById('section-team')) {
            atvImg();
        }

        if (document.getElementsByClassName('modal-underlay').length) {
            window.MNDMPS.modal.init();
        }

        if (document.getElementsByClassName('google-map')[0]) {
            google.maps.event.addDomListener(window, 'load', window.MNDMPS.map.load);
        }

        if (document.getElementById('section-platform-full')) {
            this.initPlatform();
            this.initPrism();
            this.initPlatformGraphs();
        }

        var getMindmapsButton = document.getElementsByClassName('getMindmaps');

        if (getMindmapsButton.length) {
            for (var i = 0; i < getMindmapsButton.length; i++) {
                getMindmapsButton[i].addEventListener('click', window.MNDMPS.modal.open, false);
            }
        }
    }
};

window.D3GRPH.init();
window.MNDMPS.App.init();
