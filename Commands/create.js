const axios = require('axios');
const logger = require('../Utils/logger');
const files = require('../Utils/files');
const config = require('../Utils/config');

class Create {
    static handle(key) {
        let content = files.read(key);

        axios.post(`${config.url}/api/rest/themes/${config.theme}/assets.json?key=${config.auth.key}&secret=${config.auth.secret}`, {
            "key": key,
            "value": content
        })
        .then(response => {
            logger.info(`File: ${key}: has been created.`);
        })
        .catch(error => {
            if (error.response !== undefined) {
                if (error.response.status === 400) {
                    return logger.error(error.response.status+' - '+error.response.data.message);
                }
                if (error.response.status === 422) {
                    logger.error('Validation error:')
                    return logger.info(error.response.data)
                }
                return logger.error(error.response.data);
            }

            throw error;
        });
    }
}

module.exports = Create;