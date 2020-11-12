const logger = require('./logger');
const fs = require('fs');

class Files {
    static create(key, value) {
        fs.writeFile(key, value, function (err) {
            if (err) {
                return logger.error(err);
            }
            logger.info(`File: ${key} has been downloaded.`);
        });
    }

    static read(key) {
        if (!this.exists(key)) {
            return logger.error(`File: "${key}" does not exists.`);
        }

        return fs.readFileSync(key, 'utf8', function (err, content) {
            if (err) {
                throw err;
            }
            return content;
        });
    }

    static exists(key) {
        return fs.existsSync(key);
    }
}

module.exports = Files;
