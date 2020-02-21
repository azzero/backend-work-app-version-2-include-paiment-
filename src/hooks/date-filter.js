// Use this hook to manipulate incoming or outgoing data.
/* // For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const sequelize = require('sequelize');
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return function monthFilter(hook) {
    const { monthFilter } = hook.params.query;
//select sum(prix) from engagement where institution = ... and MONTH(visaDate) = 10
    if (monthFilter) {
      if (!hook.params.sequelize) {
        hook.params.sequelize = {};
      }

      hook.params.sequelize = {
        where: [
          sequilize.where(sequelize.fn('month', sequelize.col('visaDate'), monthFilter)
        ]
      };

      console.log('sequelizer', hook.params.sequelize);
      delete hook.params.query.monthFilter;
    }
  };
};
 */
