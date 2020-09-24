const fs = require('fs');
const UploadCommand = require('../Commands/upload');
const logger = require('../Utils/logger');
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

class Watch {
    static handle() {
        logger.info('Watching files for changes...')
        fs.watch('./', {recursive: true}, (event, key) => {
            let folder = key.split('/')[0];

            if (! folders.includes(folder)) {
                return;
            }

            if (event === 'change') {
                UploadCommand.handle(key);
            }
        });
    }
}

module.exports = Watch;