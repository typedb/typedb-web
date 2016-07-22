'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.Modal = {

    _data: {},

    open: function() {

        var _this = window.MNDMPS.Modal,
            data = _this._data;

        if (data.underlay.classList.contains('display')) {
            return;
        }

        if (data.sent) {
            data.sent = false;
            _this.resetForm(data.form);
        }

        clearTimeout(data.closeTimeout);

        data.underlay.classList.add('display');

        setTimeout(function() {
            data.underlay.classList.add('active');
        }, 25);
    },

    close: function() {

        var _this = window.MNDMPS.Modal,
            data = _this._data;

        if (!data.underlay.classList.contains('active')) {
            return;
        }

        data.underlay.classList.remove('active');

        setTimeout(function() {
            data.underlay.classList.remove('display');
        }, 200);
    },

    closeByKey: function(event) {

        var _this = window.MNDMPS.Modal;

        if (event.which === 27) {
            _this.close();
        }
    },

    resetForm: function(form) {

        var data = window.MNDMPS.Modal._data,
            inputs = [].slice.call(form.getElementsByTagName('input'), 0);

        inputs.push(form.getElementsByTagName('textarea')[0]);

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type !== 'submit') {
                inputs[i].value = '';
            }
        }

        data.sendButton.classList.remove('disabled');
        data.sendButton.classList.remove('done');
    },

    init: function() {

        var _this = this,
            data = this._data;

        data.underlay = document.getElementsByClassName('modal-underlay')[0];
        data.modal = data.underlay.children[0];
        data.form = data.modal.getElementsByTagName('form')[0];
        data.sendButton = data.form.getElementsByClassName('sendButton')[0];

        data.sendButton.addEventListener('click', function(event) {
            event.preventDefault();

            if (this.classList.contains('disabled')) {
                return;
            }

            this.classList.add('disabled');

            window.MNDMPS.Ajax.sendSubscribe({
                data: window.MNDMPS.Helpers.serializeObject($(data.form))
            }).then(
                function(response) {
                    data.sent = true;
                    data.sendButton.classList.add('done');

                    data.closeTimeout = setTimeout(function() {
                        _this.close();
                    }, 1500);
                },
                function(error) {
                    console.log(error);
                }
            );
        }, false);

        data.underlay.addEventListener('click', function(event) {
            if (!event.target.classList.contains('modal-underlay') && !event.target.classList.contains('modal-close')) {
                return;
            }

            _this.close();
        }, false);

        document.addEventListener('keydown', this.closeByKey, false);

        //dontScrollParent(data.underlay);
    }
};