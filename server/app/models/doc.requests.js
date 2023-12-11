module.exports = (sequelize, Sequelize) => {
    const DocRequest = sequelize.define("doc_request", {  
        employee_key: {
            type: Sequelize.STRING(12),
            allowNull: false,
          },
          file: {
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          status:{
            type: Sequelize.STRING(100),
            defaultValue: 'Requested',
            allowNull: false,
          }
    });
  
    return DocRequest;
  };