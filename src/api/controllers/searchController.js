const axios = require('axios');
const itemModel = require('../utils/itemModel');

//Number of items that will show up on search list
const itemsNumber = 4;

exports.list_search = (req, res) => {

  const data = {
    "author": {
      "name": "",
      "lastName": ""
    },
    "categories": [],
    "items": []
  };
  axios
    .get(`https://api.mercadolibre.com/sites/MLA/search?q=:${req.query.q}`)
    .then(response => {
      //filtering the quantity of products for search page
      const filteredItemsByQuantity = Object.entries(response.data.results).filter((item, i) => {
        return i < itemsNumber;
      });

      filteredItemsByQuantity.map((items) => {
        const item = items[1];
        data.categories.push(item.category_id);
        data.items.push(itemModel.objConstructor(
          item.id,
          item.title,
          item.currency_id,
          item.price,
          item.installments.amount,
          item.thumbnail,
          item.condition,
          item.shipping.free_shipping));
      });

      res.json(data);
      res.end();
    })
    .catch(error => {
      console.log(error);
    });
};
