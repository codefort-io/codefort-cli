class Logger
{
    static info(message) {
        console.log(message);
    }

    static success(message) {
        console.log("\x1b[42m", "\x1b[30m", message);
    }

    static warning(message) {
        console.log("\x1b[43m", "\x1b[30m", message);
    }

    static error(message) {
        console.log('\x1b[41m', '\x1b[37m', message);
    }
}

module.exports = Logger;
