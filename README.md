# slack-me
The module helps to send messages to configured slack webhook URL.

##How to configure and send messages

1) Configure the SlackMeConfig

```
var SlackConfig = require('./slack-me.config');
var config = new SlackConfig();

config.setWebhook("WEBHOOK_URL")
      .setUsername("Slack Me!!!")
      .setText('I am a text') //This will be ignored, if rich text is added
      .setChannel('#your_channel') //If not given, message will be posted to #general
      .setIconUrl('ICON_URL').
      .setIconEmoji('EMOJI_KEY'); //This will be ignored, if icon is specified
 
**Notes** Rich Text accepts color, title and fallback text
**Notes** Fields accepts title, value, and isShort (optional parameters. specified if it is a shorted text)

config.addRichText('#DD0000', 'Rich Text title', 'Fallback text')
      .addFields('Priority', 'High', true)
      .addFields('Less', 'The quick brown fox jumps over the lazy dog.The quick brown fox jumps over the lazy dog');
```

2) Invoke the Slack object and pass the configuration
```
    Slack(config);
```

If you are aware of the slack parameters, pass them directly to the Slack me object.
