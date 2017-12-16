
module.exports = (app) => {
  const searchController = require('../controllers/searchController');

  //search route
  app.route("/api/items?:query").get(searchController.list_search);

};
