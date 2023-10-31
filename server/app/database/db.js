const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employees = require("../models/employees.model")(sequelize, Sequelize)
db.departments = require("../models/departments.model")(sequelize, Sequelize)
db.roles = require("../models/roles.model")(sequelize, Sequelize)



module.exports = db;
