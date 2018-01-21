var Slack = require('./slack-me');
var SlackConfig = require('./slack-me.config');

var config = new SlackConfig();

config.setWebhook("<web hook url>")
    .setUsername("Slack Me!!!")
    .setText('Configuration for the last time')
    .setChannel('#test')
    .setIconUrl('http://iosicongallery.com/img/512/slack-2014-10-07.png');

config.addRichText('#DD0000', 'I am formatted for last time', 'I am formatted last time')
    .addFields('Priority', 'High', true)
    .addFields('Less', '123', true)
    .addFields('Less', '123afagdfiagdfigadfigafigafigasifgasifgasigfiasgfiasgfiasgffsdfdsfsdfdsfsdfdsfdsfdsfdsf');

Slack(config);