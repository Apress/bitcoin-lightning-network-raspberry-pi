#!/usr/bin/env node
const fs = require('fs');
const split = require('split');
const config = require('./config.json');
const logfile = '/tmp/clightning.log';

const logger = require('tracer').console({
  transport : (data) => {
      fs.createWriteStream(logfile, {
          flags: 'a',
          encoding: 'utf8',
          mode: 0666
      }).write(`${data.rawoutput}\n`);
  }
});

//for stdin data
let inputLine = '';

/**
 * JSON with selected subscriptions
 * Will be used to asnwer LN's 'getmanifest' query
 */
const manifestJson = {
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "options": [],
    "rpcmethods": [],
    "subscriptions": config.subscriptions
  }
};

/**
 * Wrap local logging and POST calls 
 * @param {*} severity 
 * @param {*} message 
 */
function log(severity, message) {
  logger.info(`${severity} | ${message}`);
}

/**
 * Read LN queries from stdin 
 * @param {*} line 
 */
function processLine (line) {
  inputLine += line;
  try
  {
    // try to parse a JSON from current line
    const json = JSON.parse(inputLine);
    inputLine = "";

    if (json["method"] == 'init') {
      process.stdout.write(JSON.parse('{}'));
      log('info', 'init call answered');
    } else if (json["method"] == 'getmanifest') {
      manifestJson.id = json.id;
      process.stdout.write(JSON.stringify(manifestJson));
      log('info', JSON.stringify(manifestJson));
    } else {
      log('info', JSON.stringify(json));
    }
  }
  catch(e){
    // if JSON parsing fails, 
    // continue with next chunk of data from stdin
  }
}

/**
 * Initialize Plugin
 */
function initPlugin() {
  log('info', 'starting plugin');
  process.stdin.pipe(split()).on('data', processLine);
};

module.exports = initPlugin();
