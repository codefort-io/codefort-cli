const axios = require('axios');
const fs = require('fs');
const logger = require('../Utils/logger');
const files = require('../Utils/files');
const config = require('../Utils/config');

const folders = [
    'layout',
    'templates',
    'snippets',
    'assets',
    'config',
    'locales',
    'emails',
    'feeds',
];

class Fetch {
    static handle() {
        this.ensureFoldersExists();
        this.fetchAssets();
    }

    static ensureFoldersExists() {
        folders.forEach(folder => {
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder);
            }
        });
    }

    static fetchAssets(page = 1) {
        const limit = 25;

        axios.get(`${config.url}/api/rest/themes/${config.theme}/assets.json?page=${page}&limit=${limit}&key=${config.auth.key}&secret=${config.auth.secret}`)
        .then(response => {
            let assets = response.data.data;
            assets.forEach(asset => {
                files.create(asset.key, asset.value)
            });
            let meta = response.data.meta;
            if (meta.last_page > page) {
                this.fetchAssets(page + 1);
            }
        })
        .catch(error => {
            if (error.response.status === 400) {
                logger.error(error.response.status+' - '+error.response.data.message)
            }
        });
    }
}

module.exports = Fetch;
