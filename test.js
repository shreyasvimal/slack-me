var Slack = require('./slack-me');
var SlackConfig = require('./slack-me.config').SlackMeConfig;
var SlackRichText = require('./slack-me.config').SlackMeRichText;
var SlackFields = require('./slack-me.config').SlackMeRichTextFields;

var config = new SlackConfig();

config.setWebhook("https://hooks.slack.com/services/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");
config.setUsername("Vimal");
config.setText('Configuration');
config.setChannel('#test');
config.setIconUrl('http://iosicongallery.com/img/512/slack-2014-10-07.png');

var richText = new SlackRichText();
richText.setColor('#DD0000');
richText.setFallback('I am formatted');
richText.setPretext('I am formatted');

var field1 = new SlackFields();
field1.setTitle('Priority');
field1.setValue('Hight');
field1.isShortText(true);
richText.addFields(field1);

var field2 = new SlackFields();
field2.setTitle('Less');
field2.setValue('Hight');
field2.isShortText(true);
richText.addFields(field2);

config.addRichText(richText);

Slack(config);