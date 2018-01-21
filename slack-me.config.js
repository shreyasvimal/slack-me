var _ = require('lodash');

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

    RichText.prototype.addFields = function(title, value, isShort) {
        var data = {
            "title" : title,
            "value" : value
        };
        if( !isShort && value && value.length > 25 ) {
            isShort = false;
        } 
        _.assign(data, {"short" : isShort });
        fields.push(data);
        return this;
    }

    RichText.prototype.setColor = function(value) {
        color = value;
        return this;
    }

    RichText.prototype.setPretext = function(value) {
        preText = value;
        return this;
    }

    RichText.prototype.setFallback = function(value) {
        fallBack = value;
        return this;
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
                    attachments.push(richText[count].get());
                }
                _.assign(data, {"attachments" : attachments});
            }
          return data;
        }
    }

    SlackMeConfig.prototype.addRichText = function(color, title, fallbackText) {
        var rText = new RichText();
        rText.setColor(color);
        rText.setPretext(title);
        rText.setFallback(fallbackText);
        richText.push(rText);
        return rText;
    }

    SlackMeConfig.prototype.setIconEmoji = function(value) {
        icon_emoji = value;
        return this;
    }

    SlackMeConfig.prototype.setIconUrl = function(value) {
        icon_url = value;
        return this;
    }

    SlackMeConfig.prototype.setChannel = function(value) {
        channel = value;
        return this;
    }

    SlackMeConfig.prototype.setWebhook = function(value) {
        webhook = value;
        return this;
    }
    
    SlackMeConfig.prototype.setUsername = function(value) {
        username = value;
        return this;
    }
    
    SlackMeConfig.prototype.setText = function(value) {
        text = value;
        return this;
    }
};

module.exports = SlackMeConfig;