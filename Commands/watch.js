const fs = require('fs');
const UploadCommand = require('../Commands/upload');
const files = require('../Utils/files');
const logger = require('../Utils/logger');
config = JSON.parse(files.read('./codefort.config.json'));

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