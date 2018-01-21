var _ = require('lodash');

var RichTextFields = function() {
    var title,
        value,
        short = false;

    RichTextFields.prototype.get = function() {
        var data = {};
        if( !_.isEmpty(title)) { _.assign(data, {"title" : title}); }
        if( !_.isEmpty(value)) { _.assign(data, {"value" : value}); }
        if( short ) { _.assign(data, {"short" : short}); }
        return data;
    }

    RichTextFields.prototype.setTitle = function(value) {
        title = value;
    }

    RichTextFields.prototype.setValue = function(val) {
        value = val;
    }

    RichTextFields.prototype.isShortText = function(value) {
        short = value;
    }
}

var RichText = function() {
    var fallBack,
        preText,
        color,
        fields = [];

    RichText.prototype.get = function() {
        var data = {};
        if( !_.isEmpty(fallBack)) { _.assign(data, {"fallback" : fallBack}); }
        if( !_.isEmpty(preText)) { _.assign(data, {"pretext" : preText}); }
        if( !_.isEmpty(color)) { _.assign(data, {"color" : color}); }
        if( !_.isEmpty(fields)) { 
            var fieldsValue = [];
            for(var count = 0; count < fields.length; count++) {
                fieldsValue.push(fields[count]);
            }
            _.assign(data, {"fields" : fieldsValue});
        }
        return data;
    }

    RichText.prototype.addFields = function(value) {
        if( value instanceof RichTextFields) {
            fields.push(value.get());
        }
    }

    RichText.prototype.setColor = function(value) {
        color = value;
    }

    RichText.prototype.setPretext = function(value) {
        preText = value;
    }

    RichText.prototype.setFallback = function(value) {
        fallBack = value;
    }
};

var SlackMeConfig = function(options) {
    var webhook,
        username,
        text,
        channel,
        icon_url,
        icon_emoji,
        richText = [];

    if(!_.isEmpty(options)) {
        webhook = options.webhook;
        username = options.username;
        text = options.text;
        channel = options.channel;
        icon_url = options.icon_url;
        icon_emoji = options.icon_emoji;
        if(options.attachments) {
            richText = [];
        }
    }

    SlackMeConfig.prototype.get = function getOptions() {
        if(!_.isEmpty(options)) {
            return options;
        } else {
            var data = {};
            if( !_.isEmpty(icon_emoji)) { _.assign(data, {"icon_emoji" : icon_emoji}); }
            if( !_.isEmpty(icon_url)) { _.assign(data, {"icon_url" : icon_url}); }
            if( !_.isEmpty(channel)) { _.assign(data, {"channel" : channel}); }
            if( !_.isEmpty(text)) { _.assign(data, {"text" : text}); }
            if( !_.isEmpty(username)) { _.assign(data, {"username" : username}); }
            if( !_.isEmpty(webhook)) { _.assign(data, {"webhook" : webhook}); }

            if( !_.isEmpty(richText)) { 
                var attachments = [];
                for(var count = 0; count < richText.length; count++) {
                    attachments.push(richText[count]);
                }
                _.assign(data, {"attachments" : attachments});
            }
          return data;
        }
    }

    SlackMeConfig.prototype.addRichText = function(value) {
        if( value instanceof RichText) {
            richText.push(value.get());
        }
    }

    SlackMeConfig.prototype.setIconEmoji = function(value) {
        icon_emoji = value;
    }

    SlackMeConfig.prototype.setIconUrl = function(value) {
        icon_url = value;
    }

    SlackMeConfig.prototype.setChannel = function(value) {
        channel = value;
    }

    SlackMeConfig.prototype.setWebhook = function(value) {
        webhook = value;
    }
    
    SlackMeConfig.prototype.setUsername = function(value) {
        username = value;
    }
    
    SlackMeConfig.prototype.setText = function(value) {
        text = value;
    }
};

module.exports.SlackMeConfig = SlackMeConfig;
module.exports.SlackMeRichText = RichText;
module.exports.SlackMeRichTextFields = RichTextFields;