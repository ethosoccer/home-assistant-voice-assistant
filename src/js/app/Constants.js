Failed to create stream fd: Operation not permitted
Failed to create stream fd: Operation not permitted
Failed to create stream fd: Operation not permitted
var Feature = require('platform/feature');

module.exports = {
    appVersion: '1.0.0',
    // Reuse the upstream page for URL/token and voice settings. Extra options
    // returned by that page are ignored by the voice-only runtime.
    configPageUrl: 'https://caco3.github.io/pebble-home-assistant-on-your-wrist/config/v1.2.html',
    debugMode: false,
    debugHAWS: false,
    coalesce_messages_enabled: true,
    colour: {
        highlight: Feature.color('#00AAFF', '#000000'),
        highlight_text: Feature.color('black', 'white')
    }
};
