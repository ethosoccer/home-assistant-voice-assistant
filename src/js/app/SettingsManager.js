/** Settings required by the voice-only Home Assistant client. */
var Settings = require('settings');
var Feature = require('platform/feature');
var AppState = require('app/AppState');
var helpers = require('app/helpers');

var SettingsManager = {
    load: function() {
        var appState = AppState.getInstance();
        appState.ha_url = Settings.option('ha_url');
        appState.ha_password = Settings.option('token');
        appState.voice_enabled = Feature.microphone(true, false) &&
            Settings.option('voice_enabled') !== false;
        appState.voice_confirm = Settings.option('voice_confirm') !== false;
        appState.voice_backlight_trigger =
            Settings.option('voice_backlight_trigger') !== false;
        appState.voice_agent = Settings.option('voice_agent') || null;
        appState.selected_pipeline = Settings.option('selected_pipeline') || null;
        appState.ha_connected = Settings.option('ha_connected') || false;
    },

    get: function(key) {
        return Settings.option(key);
    },

    set: function(key, value) {
        Settings.option(key, value);
    },

    initConfigHandler: function(options) {
        var self = this;
        Settings.config({ url: options.configPageUrl }, function() {
            helpers.log_message('Opened configuration');
        }, function(e) {
            if (!e || !e.options) {
                return;
            }

            // Keep the long-lived token local when the page does not return it.
            if (!e.options.token) {
                e.options.token = Settings.option('token');
            }

            Settings.option(e.options);
            self.load();
            if (options.onSettingsChanged) {
                options.onSettingsChanged();
            }
        });
    }
};

module.exports = SettingsManager;
