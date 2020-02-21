// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const engagement = sequelizeClient.define(
    'engagement',
    {
      receptionNumber: {
        type: DataTypes.INTEGER(255),
        allowNull: true
      },
      reception: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      tanzil: {
        type: DataTypes.STRING,
        allowNull: true
      },
      prix: {
        type: DataTypes.REAL,
        allowNull: true
      },
      institution: {
        type: DataTypes.STRING,
        allowNull: true
      },
      accountType: {
        type: DataTypes.STRING,
        allowNull: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      owner: {
        type: DataTypes.STRING,
        allowNull: true
      },
      visaNumber: {
        type: DataTypes.INTEGER(255),
        allowNull: true
      },
      visaDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
      }
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    }
  );

  // eslint-disable-next-line no-unused-vars
  engagement.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return engagement;
};
