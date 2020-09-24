#!/usr/bin/env node

// Uncomment when developing against a local Codefort API.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const watchCommand = require('./Commands/watch');
const initCommand = require('./Commands/init');
const fetchCommand = require('./Commands/fetch');
const uploadCommand = require('./Commands/upload');

const command = process.argv[2];
const argument = process.argv[3];

if (command === 'fetch') {
    fetchCommand.handle();
}

if (command === 'upload') {
    uploadCommand.handle(argument);
}

if (command === 'watch') {
    watchCommand.handle();
}

if (command === 'init') {
    initCommand.handle();
}
