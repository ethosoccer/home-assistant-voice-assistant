Failed to create stream fd: Operation not permitted
Failed to create stream fd: Operation not permitted
Failed to create stream fd: Operation not permitted
/** Minimal shared state for the voice-only application. */
class AppState {
    constructor() {
        if (AppState._instance) {
            return AppState._instance;
        }
        AppState._instance = this;

        this.haws = null;
        this.ha_connected = false;
        this.ha_url = null;
        this.ha_password = null;

        this.voice_enabled = null;
        this.voice_confirm = true;
        this.voice_backlight_trigger = true;
        this.voice_agent = null;

        this.ha_pipelines = [];
        this.preferred_pipeline = null;
        this.selected_pipeline = null;
    }

    static getInstance() {
        if (!AppState._instance) {
            new AppState();
        }
        return AppState._instance;
    }
}

AppState._instance = null;

module.exports = AppState;
