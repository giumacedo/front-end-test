const axios = require("axios");
//Number of items that will show up on search list
const itemsNumber = 4;

exports.list_search = function (req, res) {

  let data = {
    "author": {
      "name": "",
      "lastName": ""
    },
    "categories": [],
    "items": []
  };
  axios
    .get("https://api.mercadolibre.com/sites/MLA/search?q=:" + req.query.q)
    .then(response => {
      //filtering the quantity of products for search page
      const filteredItemsByQuantity = Object.entries(response.data.results).filter((item, i) => {
        return i < itemsNumber;
      });

      const itemConstructor = (id, title, currency, price, amount, picture, condition, shipping) => {
        let item = {
          "id": "",
          "title": "",
          "price" : {
            "currency": "",
            "amount": "",
            "price": "",
          },
          "picture": "",
          "condition": "",
          "free_shipping": ""
        };

        item.id = id;
        item.title = title;
        item.price.currency = currency;
        item.price.amount = amount;
        item.price.price = price;
        item.picture = picture;
        item.condition = condition;
        item.free_shipping = shipping;

        return item;
      };

      filteredItemsByQuantity.map((items) => {
        let item = items[1];
        data.categories.push(item.category_id);
        data.items.push(itemConstructor(
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
