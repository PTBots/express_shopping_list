/**Items in your cart */
const items = require("./fakeDb");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    items.push(this);
  }

  static findItem(name) {
    return items.find((i) => i.name == name);
  }
  static findItems(name) {
    return items;
  }

  /** Update items */
  static update(name, data) {
    let foundItem = Item.search(name);
    if (foundItem === undefined) {
      throw { message: "Item not found", status: 404 };
    }
    foundItem.name = data.name;
    foundItem.price = data.price;

    return foundItem;
  }

  /** Search items */

  static search(name) {
    const foundItem = items.find((i) => i.name === name);
    if (foundItem === undefined) {
      throw { message: "Item not found", status: 404 };
    }
    return foundItem;
  }

  /** Delete item */

  static delete(name) {
    let foundItem = items.find((i) => i.name === name);
    if (foundItem === -1) {
      throw { message: "Item not found", status: 404 };
    }
    items.splice(foundItem, 1);
  }
}

module.exports = Item;
