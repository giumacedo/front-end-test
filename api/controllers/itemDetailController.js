const axios = require('axios');
const itemModel = require('../model/itemModel');

exports.item_detail = function (req, res) {
  let data = {
    author: {
      name: "",
      lastName: ""
    }
  };
  axios
    .all([
      axios.get(`https://api.mercadolibre.com/items/${req.params.id}`),
      axios.get('https://api.mercadolibre.com/items/' + req.params.id + '/description')
    ])
    .then(axios.spread(function(item, description) {
      let itemData = item.data || [];
      let descriptionData = description.data || [];
      let parseItemData = itemModel.objConstructor(
        itemData.id,
        itemData.title,
        itemData.currency_id,
        itemData.price,
        null,
        itemData.thumbnail,
        itemData.condition,
        itemData.shipping.free_shipping
      );

      parseItemData.sold_quantity = itemData.sold_quantity;
      parseItemData.description = descriptionData.text;
      data.item = parseItemData;

      res.json(data);
      res.end();

    }))
    .catch(error => {
      console.log(error);
    });

};
