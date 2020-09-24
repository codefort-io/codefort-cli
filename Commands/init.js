const fs = require('fs');
const stub = JSON.stringify(require('../codefort.config.json'), null, 4);
const logger = require('../Utils/logger');

class Init {
    static handle() {
        if (fs.existsSync('codefort.config.json')){
            return logger.error('Codefort config file already exists.');
        }

        fs.writeFile('codefort.config.json', stub, 'utf8', function (err) {
            if (err) {
                throw err;
            }
            logger.success('File: codefort.config.json has been created.');
        });
    }
}

module.exports = Init;
