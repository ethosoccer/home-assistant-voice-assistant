Failed to create stream fd: Operation not permitted
Failed to create stream fd: Operation not permitted
Failed to create stream fd: Operation not permitted
require('vendor/event-target-polyfill');

Pebble.addEventListener('ready', function() {
    require('ui/simply-pebble.js').init();
    require('./app');
});
