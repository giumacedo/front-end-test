module.exports.objConstructor = (id, title, currency, price, amount, picture, condition, shipping) => {
  let item = {
    id: "",
    title: "",
    price: {
      currency: "",
      amount: "",
      price: ""
    },
    picture: "",
    condition: "",
    free_shipping: ""
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
