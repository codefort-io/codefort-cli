const hound = require('hound');
const UploadCommand = require('../Commands/upload');
const DeleteCommand = require('../Commands/delete');
const logger = require('../Utils/logger');

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

        var watcher = hound.watch('./')

        watcher.on('create', function(file, stats) {
            var key = file.split('.//')[1];
            let folder = key.split('/')[0];

            if (! folders.includes(folder)) {
                return;
            }

            UploadCommand.handle(key);
        })

        watcher.on('change', function(file, stats) {
            var key = file.split('.//')[1];
            let folder = key.split('/')[0];

            if (! folders.includes(folder)) {
                return;
            }

            UploadCommand.handle(key);
        })
        
        watcher.on('delete', function(file) {
            var key = file.split('.//')[1];
            let folder = key.split('/')[0];

            if (! folders.includes(folder)) {
                return;
            }

            DeleteCommand.handle(key);
        })
    }
}

module.exports = Watch;