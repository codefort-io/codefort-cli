class Logger
{
    static info(message) {
        console.log(message);
    }

    static success(message) {
        console.log("\x1b[42m", "\x1b[30m", message, "\x1b[0m");
    }

    static warning(message) {
        console.log("\x1b[43m", "\x1b[30m", message, "\x1b[0m");
    }

    static error(message) {
        console.log('\x1b[41m', '\x1b[37m', message, "\x1b[0m");
    }
}

module.exports = Logger;
