Failed to create stream fd: Operation not permitted
Failed to create stream fd: Operation not permitted
Failed to create stream fd: Operation not permitted
/**
 * HA Voice Launcher
 *
 * A deliberately small Home Assistant client that authenticates over the
 * WebSocket API and opens Assist immediately. Entity and registry data are
 * never downloaded during startup.
 */

var UI = require('ui');
var Settings = require('settings');
var Feature = require('platform/feature');

var AppState = require('app/AppState');
var Constants = require('app/Constants');
var helpers = require('app/helpers');
var SettingsManager = require('app/SettingsManager');
var ConnectionService = require('app/ConnectionService');
var AssistPage = require('app/pages/AssistPage');

var appState = AppState.getInstance();
var assistantPageShown = false;

var resolution = Feature.resolution();
var logoSize = 60;
var loadingCard = new UI.Window({
    status: false,
    backgroundColor: 'white',
    scrollable: false
});

var splashTitle = new UI.Text({
    text: 'HA Voice',
    position: new UI.Vector2(0, 18),
    size: new UI.Vector2(resolution.x, 40),
    color: 'blue',
    font: 'gothic_28_bold',
    textAlign: 'center'
});

var splashLogo = new UI.Image({
    image: 'images/logo_splash.png',
    position: new UI.Vector2(Math.floor((resolution.x - logoSize) / 2), 66),
    size: new UI.Vector2(logoSize, logoSize),
    backgroundColor: 'clear',
    compositing: 'set'
});

var splashStatus = new UI.Text({
    text: '',
    position: new UI.Vector2(0, 142),
    size: new UI.Vector2(resolution.x, 30),
    color: 'blue',
    font: 'gothic_24_bold',
    textAlign: 'center'
});

var splashBody = new UI.Text({
    text: '',
    position: new UI.Vector2(0, 176),
    size: new UI.Vector2(resolution.x, 44),
    color: 'blue',
    font: 'gothic_18',
    textAlign: 'center',
    textOverflow: 'wrap'
});

loadingCard.add(splashTitle);
loadingCard.add(splashLogo);
loadingCard.add(splashStatus);
loadingCard.add(splashBody);
loadingCard.title = function(text) { splashTitle.text(text); return this; };
loadingCard.subtitle = function(text) { splashStatus.text(text); return this; };
loadingCard.body = function(text) { splashBody.text(text); return this; };

function showAssistant() {
    if (assistantPageShown) {
        loadingCard.hide();
        return;
    }

    if (!appState.voice_enabled) {
        loadingCard.title('HA Voice');
        loadingCard.subtitle('Voice unavailable');
        loadingCard.body('A microphone-enabled Pebble is required.');
        return;
    }

    assistantPageShown = true;
    AssistPage.showAssistMenu();
    loadingCard.hide();
}

function refreshPipelinesInBackground() {
    AssistPage.loadAssistPipelines(function(success) {
        helpers.log_message('Pipeline refresh: ' + (success ? 'ok' : 'failed'));
    });
}

function onAuthOk() {
    appState.ha_connected = true;
    Settings.option('ha_connected', true);

    if (ConnectionService.getIsRestarting()) {
        ConnectionService.setIsRestarting(false);
    }

    if (ConnectionService.shouldResumePreviousPage()) {
        ConnectionService.clearReconnectState();
        loadingCard.hide();
        return;
    }

    ConnectionService.clearReconnectState();

    // A saved pipeline lets the assistant appear as soon as authentication
    // completes. Refresh the pipeline list after opening the UI.
    if (appState.selected_pipeline) {
        showAssistant();
        refreshPipelinesInBackground();
        return;
    }

    loadingCard.subtitle('Loading Assistant');
    AssistPage.loadAssistPipelines(function(success) {
        if (!success || !appState.selected_pipeline) {
            loadingCard.title('Assistant Error');
            loadingCard.subtitle('No pipeline available');
            loadingCard.body('Enable Home Assistant Assist, then reopen the app.');
            return;
        }
        showAssistant();
    });
}

SettingsManager.initConfigHandler({
    configPageUrl: Constants.configPageUrl,
    onSettingsChanged: function() {
        assistantPageShown = false;
        ConnectionService.restart();
    }
});

ConnectionService.init({
    loadingCard: loadingCard,
    onAuthOk: onAuthOk
});

helpers.log_message('Started HA Voice v' + Constants.appVersion);
SettingsManager.load();
loadingCard.show();
ConnectionService.connect();
