const axios = require('axios');
const logger = require('../Utils/logger');
const files = require('../Utils/files');
const config = require('../Utils/config');

class Upload {
    static handle(key) {
        let content = files.read(key);

        axios.post(`${config.url}/api/rest/themes/${config.theme}/assets.json?key=${config.auth.key}&secret=${config.auth.secret}`, {
            "key": key,
            "value": content
        })
        .then(response => {
            logger.info(`File: ${key}: has been updated.`);
        })
        .catch(error => {
            if (error.response.status === 400) {
                return logger.error(error.response.status+' - '+error.response.data.message);
            }
            logger.error(error.response);
        });
    }
}

module.exports = Upload;