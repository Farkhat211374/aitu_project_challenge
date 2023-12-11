const dbConfig = require("../config/db.config");


const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  operatorsAliases: false,
  logging: false,
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employees = require("../models/employees.model")(sequelize, Sequelize)
db.departments = require("../models/departments.model")(sequelize, Sequelize)
db.employees_files = require("../models/employees_files")(sequelize, Sequelize)
db.doc_request = require("../models/doc.requests")(sequelize, Sequelize)
//db.employees_departments = require("../models/employees_departments.model")(sequelize, Sequelize)
//db.roles = require("../models/roles.model")(sequelize, Sequelize)

//db.departments.belongsToMany(db.employees, {through:db.employees_departments});
//db.employees.belongsTo(db.departments,  {through:db.employees_departments});



module.exports = db;
