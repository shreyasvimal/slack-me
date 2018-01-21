var request = require('request'),
    _ = require('lodash'),
    SlackConfig = require('./slack-me.config');

module.exports = function(options) {

    var defaults = {
        channel : "#general",
        username : "Slack Me",
        icon_emoji: ":ghost:"
    }

    function send() {
        request.post(defaults.webhook, {
            form: {
                payload: JSON.stringify(defaults)
            }
        }, function(err, response) {
            if(err) {
                console.log('SLACK ME!!! Sorry, we had some issue in posting your message');
            } 
            if(response.body === 'ok') {
                console.log('SLACK ME!!! Message posted successfully');
            }
        });
    }

    function validateOptions() {
        var isValid = false;
        if(_.isEmpty(defaults.webhook)) {
            console.error('SLACK ME!!! Provide your slack webhook URL for slack me to send messages.');
        } else if( (_.isEmpty(defaults.text)) && (_.isEmpty(defaults.attachments)) ) {
            console.log('SLACK ME!!! You are missing the text in the options.');
        } else {
            isValid = true;
        }

        return isValid;
    }

    function adjustOptions() {
        if(!_.isEmpty(defaults.text) && !_.isEmpty(defaults.attachments)) {
            delete(defaults.text);
        }
        if(_.isEmpty(options.icon_emoji) && !_.isEmpty(options.icon_url)) {
            delete(defaults.icon_emoji);
        }
    }

    function init() {

        if(options instanceof SlackConfig) {
            options = options.get();
        }

        defaults = _.assign(defaults, options);

        if( validateOptions() ) {
            adjustOptions();
            send();
        }
    }

    init();    
}