const { app } = require('@azure/functions');

// Import all function handlers
require('./functions/chat.js');

module.exports = app;