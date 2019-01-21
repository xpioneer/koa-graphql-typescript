"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const db_conf_1 = require("../../conf/db.conf");
const mysql_1 = require("../entities/mysql");
const mongo_1 = require("../entities/mongo");
const _PROD_ = process.env.NODE_ENV === 'production';
const connectDB = () => {
    typeorm_1.createConnection({
        type: 'mysql',
        host: db_conf_1.MySqlConf.host,
        port: db_conf_1.MySqlConf.port,
        username: db_conf_1.MySqlConf.username,
        password: db_conf_1.MySqlConf.password,
        database: db_conf_1.MySqlConf.database,
        entities: mysql_1.Entities,
        logging: _PROD_ ? false : true,
    }).then((connect) => {
        console.log('mysql connect success!');
    }).catch((err) => {
        console.log('mysql connect fail!', err);
    });
};
exports.connectDB = connectDB;
const connectMongo = () => {
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
    }).then((connect) => {
        console.log('mongo connect success!');
    }).catch((err) => {
        console.log('mongo connect fail!', err);
    });
};
exports.connectMongo = connectMongo;
//# sourceMappingURL=conectDB.js.map