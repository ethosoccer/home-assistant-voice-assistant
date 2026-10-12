var Feature = require('platform/feature');

module.exports = {
    appVersion: '1.0.1',
    configPageUrl: 'https://ethosoccer.github.io/home-assistant-voice-assistant/config/v1.2.html',
    debugMode: false,
    debugHAWS: false,
    coalesce_messages_enabled: true,
    colour: {
        highlight: Feature.color('#00AAFF', '#000000'),
        highlight_text: Feature.color('black', 'white')
    }
};
