"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var db_conf_1 = require("../../conf/db.conf");
var mysql_1 = require("../entities/mysql");
var mongo_1 = require("../entities/mongo");
var _PROD_ = process.env.NODE_ENV === 'production';
var connectDB = function () {
    typeorm_1.createConnection({
        type: 'mysql',
        host: db_conf_1.MySqlConf.host,
        port: db_conf_1.MySqlConf.port,
        username: db_conf_1.MySqlConf.username,
        password: db_conf_1.MySqlConf.password,
        database: db_conf_1.MySqlConf.database,
        entities: mysql_1.Entities,
        logging: _PROD_ ? false : true,
    }).then(function (connect) {
        console.log('mysql connect success!');
    }).catch(function (err) {
        console.log('mysql connect fail!', err);
    });
};
exports.connectDB = connectDB;
var connectMongo = function () {
    typeorm_1.createConnection({
        name: 'mongo',
        type: 'mongodb',
        host: db_conf_1.MongoConf.host,
        port: db_conf_1.MongoConf.port,
        // username : MongoConf.username,
        // password : MongoConf.password,
        database: db_conf_1.MongoConf.database,
        entities: mongo_1.MongoEntities,
        logging: _PROD_ ? false : true,
    }).then(function (connect) {
        console.log('mongo connect success!');
    }).catch(function (err) {
        console.log('mongo connect fail!', err);
    });
};
exports.connectMongo = connectMongo;
//# sourceMappingURL=conectDB.js.map