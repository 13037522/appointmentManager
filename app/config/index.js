const env = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'develop';
var config = require('./' + env);
module.exports =  config;
