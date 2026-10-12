function log_message(message, extra) {
    var Constants = require('app/Constants');
    if (!Constants.debugMode) {
        return;
    }

    if (extra !== undefined) {
        console.log('[HA Voice] ' + message, extra);
    } else {
        console.log('[HA Voice] ' + message);
    }
}

module.exports = {
    log_message: log_message
};
