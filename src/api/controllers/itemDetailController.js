const axios = require('axios');
const itemModel = require('../utils/itemModel');

exports.item_detail = (req, res) => {
  const data = {
    author: {
      name: "",
      lastName: ""
    }
  };
  axios
    .all([
      axios.get(`https://api.mercadolibre.com/items/${req.params.id}`),
      axios.get(`https://api.mercadolibre.com/items/${req.params.id}/description`)
    ])
    .then(axios.spread((item, description) => {
      const itemData = item.data || [];
      const descriptionData = description.data || [];
      const parseItemData = itemModel.objConstructor(
        itemData.id,
        itemData.title,
        itemData.currency_id,
        itemData.price,
        null,
        itemData.pictures[0].url,
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
