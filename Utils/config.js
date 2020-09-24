const files = require('./files');

let config  = {};
if (files.exists('./codefort.config.json')) {
    config = JSON.parse(files.read('./codefort.config.json'));
}

class Config {
    static get url() {
        return config.url;
    }

    static get theme() {
        return config.theme;
    }

    static get auth() {
        return config.auth;
    }
}

module.exports = Config;
