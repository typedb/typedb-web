'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.Careers = {

    _data: {},

    init: function(node) {

        var data = this._data,
            domParser = new DOMParser(),
            loading = node.getElementsByClassName('loading')[0];

        //data.jobsBlock = node.children[0].children[0];
        data.jobsBlock = node;

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

        function wrapWithContainer(node, index) {

            var container = document.createElement('div'),
                wrapper = '<div class="row"><div class="columns twelve"></div></div>',
                innerWrapper = null;

            container.classList.add('container');
            container.classList.add('careers-wrapper');

            if (index % 2 !== 0) {
                container.classList.add('full-width');
                container.classList.add('bg-yellow');
            }
            
            container.innerHTML = wrapper;

            innerWrapper = container.children[0].children[0];
            innerWrapper.appendChild(node);

            return container;
        }

        function generateJob(obj) {
            var jobBlock = document.createElement('div');
            jobBlock.classList.add('job');

            jobBlock.innerHTML = '<h3>' + obj.title + '</h3>\
                <div class="text-block columned two">\
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

        window.MNDMPS.Ajax.getAngelJobs().then(

            function(response) {
                response = JSON.parse(response);

                data.jobsBlock.classList.add('active');
                data.jobsBlock.children[0].children[0].removeChild(loading);

                for (var i = 0; i < response.jobs.length; i++) {
                    data.jobsBlock.parentNode.insertBefore(wrapWithContainer(generateJob(response.jobs[i]), i), data.jobsBlock.nextSibling);
                }
            },

            function(error) {
                console.log(error);
            }
        );
    }
};