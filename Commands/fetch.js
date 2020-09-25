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
        this.fetchAllAssets();
    }

    static ensureFoldersExists() {
        folders.forEach(folder => {
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder);
            }
        });
    }

    static fetchAllAssets(page = 1) {
        const limit = 10;

        axios.get(`${config.url}/api/rest/themes/${config.theme}/assets.json?page=1&limit=1&key=${config.auth.key}&secret=${config.auth.secret}`)
            .then(response => {
                let total = response.data.meta.total
                let pages = Math.ceil(total / limit);
                while (pages >= 1) {
                    this.fetchAssets(pages, limit);
                    pages--;
                }
                console.log(total, pages, limit)
            });
    }

    static fetchAssets(page = 1, limit = 10) {
        axios.get(`${config.url}/api/rest/themes/${config.theme}/assets.json?page=${page}&limit=${limit}&key=${config.auth.key}&secret=${config.auth.secret}`)
        .then(response => {
            let assets = response.data.data;
            assets.forEach(asset => {
                if (asset.value !== null) {
                    files.create(asset.key, asset.value)
                }
            });
            let meta = response.data.meta;
            if (meta.last_page > page) {
                this.fetchAssets(page + 1);
            }
        })
        .catch(error => {
            if (error.response !== undefined && error.response.status !== undefined && error.response.status === 502) {
                if (limit === 1) {
                    logger.warning('Failed to get asset: '+ page + '. The file is too large.');
                    return;
                }

                let toPage = page * limit;
                let currentPage = toPage - limit + 1;

                while (currentPage <= toPage) {
                    this.fetchAssets(currentPage, 1);
                    currentPage++;
                }
                return;
            }
            if (error.response !== undefined && error.response.status !== undefined && error.response.status === 400) {
                return logger.error(error.response.status+' - '+error.response.data.message)
            }
            logger.warning(error);
        });
    }
}

module.exports = Fetch;
