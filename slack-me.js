/**
 * slack-me
 * The package helps to send messages to the configured slack webhook URL in a 
 * simple text format or as rich formatted text.
 * 
 * @author "Vimal Mohan"
 * @since 1.0.0
 * @param {Object} options The configuration for sending the slack message. It can JSON object or SlackMeConfig object
 * @example
 * 
 * var Slack = require('./slack-me');
 * var SlackConfig = require('./slack-me.config');
 * 
 * var config = new SlackConfig();
 * 
 * config.setWebhook("WEBHOOK_URL")
 *       .setUsername("Slack Me!!!")
 *       .setText('I am a text') //This will be ignored, if rich text is added
 *       .setChannel('#your_channel') //If not given, message will be posted to #general
 *       .setIconUrl('ICON_URL').
 *       .setIconEmoji('EMOJI_KEY'); //This will be ignored, if icon is specified
 * 
 *  **Notes** Rich Text accepts color, title and fallback text
 *  **Notes** Fields accepts title, value, and isShort (optional parameters. specified if it is a shorted text)
 * 
 *  config.addRichText('#DD0000', 'Rich Text title', 'Fallback text')
 *        .addFields('Priority', 'High', true)
 *        .addFields('Less', 'The quick brown fox jumps over the lazy dog.The quick brown fox jumps over the lazy dog');
 * 
 *  Slack(config); //Send the message
 * 
 * @example
 * 
 *  Slack({
 *      //If you are aware of the slack parameters, pass it directly
 *  });
 * 
 */

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
            console.log('SLACK ME!!! We need text or attachments to send message.');
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