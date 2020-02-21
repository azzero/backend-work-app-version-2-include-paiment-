/* eslint-disable quotes */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const sequelize = require("sequelize");
const Op = sequelize.Op;
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return function paymentStatics(hook) {
    // const totalPayment = hook.params.query.$totalPayment;
    // const monthlyNidara = hook.params.query.$monthlyNidara;
    // const year = hook.params.query.year;
    // const month = hook.params.query.month;
    // const monthlySafi = hook.params.query.monthlySafi;
    // const accountType = hook.params.query.accountType;
    // const monthlyYousoufia = hook.params.query.monthlyYousoufia;
    // const searchBy = hook.params.query.searchBy;
    const {
      $totalPayment: totalPayment,
      $monthlyNidara: monthlyNidara,
      year,
      month,
      monthlySafi,
      accountType,
      monthlyYousoufia,
      searchBy
    } = hook.params.query;
    //const institution=hook.params.query.institution;
    // ---------- total payment --------//
    if (searchBy == "institution") {
      if (!hook.params.sequelize) {
        hook.params.sequelize = {};
      }
      hook.params.sequelize = {
        where: [{ institution: hook.params.query.FilterKeyword }]
      };
    }
    if (searchBy == "tanzil") {
      if (!hook.params.sequelize) {
        hook.params.sequelize = {};
      }
      hook.params.sequelize = {
        where: [
          {
            tanzil: {
              [Op.like]: hook.params.query.FilterKeyword
            }
          }
        ]
      };
    }
    delete hook.params.query.searchBy;
    delete hook.params.query.FilterKeyword;
    if (totalPayment) {
      if (!hook.params.sequelize) {
        hook.params.sequelize = {};
      }
      hook.params.sequelize = {
        attributes: [
          [sequelize.fn("sum", sequelize.col("prix")), "totalPayment"]
        ],
        where: [
          sequelize.where(
            sequelize.fn("month", sequelize.col("dateVirement")),
            month
          ),
          sequelize.where(
            sequelize.fn("year", sequelize.col("dateVirement")),
            year
          )
        ]
      };
      delete hook.params.query.$totalPayment;
      delete hook.params.query.year;
      delete hook.params.query.month;
    }
    // ---------- total payments nidara  --------//
    if (monthlyNidara) {
      if (!hook.params.sequelize) {
        hook.params.sequelize = {};
      }
      hook.params.sequelize = {
        attributes: [
          [sequelize.fn("sum", sequelize.col("prix")), "MonthlyPayNid"]
        ],
        where: [
          sequelize.where(
            sequelize.fn("month", sequelize.col("dateVirement")),
            month
          ),
          sequelize.where(
            sequelize.fn("year", sequelize.col("dateVirement")),
            year
          ),
          { institution: hook.params.query.institution }
        ]
      };
      delete hook.params.query.$monthlyNidara;
      delete hook.params.query.year;
      delete hook.params.query.month;
    }
    // ---------- total payments delegation safi  --------//
    if (monthlySafi) {
      if (!hook.params.sequelize) {
        hook.params.sequelize = {};
      }
      hook.params.sequelize = {
        attributes: [
          [sequelize.fn("sum", sequelize.col("prix")), "MonthlyPayDelegSafi"]
        ],
        where: [
          sequelize.where(
            sequelize.fn("month", sequelize.col("dateVirement")),
            month
          ),
          sequelize.where(
            sequelize.fn("year", sequelize.col("dateVirement")),
            year
          ),
          { institution: hook.params.query.institution },
          { accountType: accountType }
        ]
      };
      delete hook.params.query.year;
      delete hook.params.query.month;
      delete hook.params.query.monthlySafi;
      delete hook.params.query.accountType;
    }
    if (monthlyYousoufia) {
      if (!hook.params.sequelize) {
        hook.params.sequelize = {};
      }
      hook.params.sequelize = {
        attributes: [
          [
            sequelize.fn("sum", sequelize.col("prix")),
            "monthlyEngDelegYousofia"
          ]
        ],
        where: [
          sequelize.where(
            sequelize.fn("month", sequelize.col("dateVirement")),
            month
          ),
          sequelize.where(
            sequelize.fn("year", sequelize.col("dateVirement")),
            year
          ),
          { institution: hook.params.query.institution },
          { accountType: accountType }
        ]
      };
    }
    delete hook.params.query.institution;
  };
};
