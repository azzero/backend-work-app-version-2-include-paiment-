// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const sequelize = require('sequelize');
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  /*return async context => {
    return context;
  };*/
  return function agregation(hook) {
    const groupBy = hook.params.query.$somme;
    const monthlyNid = hook.params.query.$monthlyNidara;
    const monthlyDelegSafi = hook.params.query.$monthlySafi;
    const monthlyDelegYousofia = hook.params.query.$monthlyYousofia;
    const monthFilter = hook.params.query.monthFilter;
    const monthFilterNidara = hook.params.query.monthFilterNidara;
    const yearFilter = hook.params.query.year;
    /* if our flag is present, customize the query. Otherwise just let it be. */
    if (groupBy) {
      if (!hook.params.sequelize) {
        hook.params.sequelize = {};
      }
      hook.params.sequelize = {
        attributes: [[sequelize.fn('sum', sequelize.col('prix')), 'totalEng']]
      };
      delete hook.params.query.$somme;
    }
    // --------------------------------------------
    //   test monthly engagement nidara query params
    //---------------------------------------------
    if (monthlyNid) {
      if (!hook.params.sequelize) {
        hook.params.sequelize = {};
      }
      hook.params.sequelize = {
        attributes: [
          [sequelize.fn('sum', sequelize.col('prix')), 'monthlyEngNid']
        ],
        where: [
          sequelize.where(
            sequelize.fn('month', sequelize.col('visaDate')),
            monthFilterNidara
          ),
          { institution: hook.params.query.institution },
          sequelize.where(
            sequelize.fn('YEAR', sequelize.col('visaDate')),
            yearFilter
          )
        ]
      };
      delete hook.params.query.$monthlyNidara;
      delete hook.params.query.year;
    }
    //---------------------------------------------------
    //test monthly engagement delegation safi query params
    //---------------------------------------------------

    if (monthlyDelegSafi) {
      if (!hook.params.sequelize) {
        hook.params.sequelize = {};
      }
      hook.params.sequelize = {
        attributes: [
          [sequelize.fn('SUM', sequelize.col('prix')), 'MonthlyEngDelegSafi']
        ],
        where: [
          sequelize.where(
            sequelize.fn('MONTH', sequelize.col('visaDate')),
            monthFilter
          ),
          { institution: hook.params.query.institution },
          { accountType: hook.params.query.accountType },
          sequelize.where(
            sequelize.fn('YEAR', sequelize.col('visaDate')),
            yearFilter
          )
        ]
      };
    }
    delete hook.params.query.monthFilter;
    delete hook.params.query.$monthlySafi;
    delete hook.params.query.$somme;
    delete hook.params.query.year;
    //test monthly engagement delegation safi query params
    if (monthlyDelegYousofia) {
      if (!hook.params.sequelize) {
        hook.params.sequelize = {};
      }
      hook.params.sequelize = {
        attributes: [
          [
            sequelize.fn('sum', sequelize.col('prix')),
            'monthlyEngDelegYousofia'
          ]
        ],
        where: [
          sequelize.where(
            sequelize.fn('month', sequelize.col('visaDate')),
            monthFilter
          ),
          { institution: hook.params.query.institution },
          { accountType: hook.params.query.accountType },
          sequelize.where(
            sequelize.fn('YEAR', sequelize.col('visaDate')),
            yearFilter
          )
        ]
      };
      delete hook.params.query.$monthlyYousofia;
      delete hook.params.query.year;
    }
  };
};
