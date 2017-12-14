module.exports = app => {
  const itemDetailController = require("../controllers/itemDetailController");

  //item detail by id route
  app.route("/api/item/:id").get(itemDetailController.item_detail);
};
