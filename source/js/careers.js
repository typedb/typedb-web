'use strict';

window.MNDMPS = window.MNDMPS || {};

/**
 * Used on the Careers page
 */

window.MNDMPS.Careers = {

    _data: {},

    /**
     * Initialises the Careers page
     *
     * @param {object} node - The node that indicates that we have the Jobs section and need to make calls
     */

    init: function(node) {

        var data = this._data,
            domParser = new DOMParser(),
            loading = node.getElementsByClassName('loading')[0];

        data.jobsBlock = node;

        /**
         * Makes thousands to be 1K format
         *
         * @param {(number|string)} num - The number to format
         */

        function kFormatter(num) {
            num = parseInt(num, 10);
            var newNum = num > 999 ? Math.floor(num/1000) : num;

            return newNum + 'K';
        }

        /**
         * Reformats date to look like this "13 Apr 2016"
         *
         * @param {string} date - The date to format
         */

        function timeFormatter(date) {
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            var date = new Date(date),
                day = date.getDate(),
                monthIndex = date.getMonth(),
                year = date.getFullYear();

            return newDate = day + ' ' + monthNames[monthIndex] + ' ' + year;
        }

        /**
         * Wraps every job block with a separate container node
         *
         * @param {object} node - The job node
         * @param {number} index - Index of the job block. Used for different background colour
         */

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

        /**
         * Generates job block using the information from Angel.co
         *
         * @param {object} obj - An object got from Angel.co, containing job description
         */

        function generateJob(obj) {
            var jobBlock = document.createElement('div');
            jobBlock.classList.add('job');

            jobBlock.innerHTML = '<h3>' + obj.title + '</h3>\
                <p> Posted on ' + timeFormatter(obj.updated_at) + ': '+ obj.job_type + ', &pound;' + kFormatter(obj.salary_min) + ' — &pound;' + kFormatter(obj.salary_max) + ', ' + obj.equity_min + '% — ' + obj.equity_max + '% equity\
                </p>\
                <div class="bottomLinks">\
                    <a href="mailto:careers@grakn.ai">Apply</a> or <a target="_blank" rel="nofollow" href="' + obj.angellist_url + '">Check on AngelList</a>\
                </div>\
                <div class="text-block columned two">\
                    <p>' + obj.description.replace(/[0-9]+\.[^.]*\.(?!\s*[0-9])/g, "$&<br>").replace(/[0-9]+\./g, "<br>$&").replace(/\*/g, '<br>') + '</p>\
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
