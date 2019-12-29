var config = {};

/**
 * Database Configuration
 */

config.dbusername = process.env.DB_USERNAME;
config.dbpassword = process.env.DB_PASSWORD;
config.dbhost = process.env.DB_HOST;
config.dbdatabase = process.env.DB_DATABASE;
config.baseurl = process.env.BASE_URL;
config.dialect = 'mysql'; // Dialect needs to be explicitly supplied as of v4.0.0
config.environment = process.env.NODE_ENV || 'development';
config.define = {};
config.define.charset = 'utf8';
config.define.collate = 'utf8_general_ci';

module.exports = config;