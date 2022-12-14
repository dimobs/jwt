const Item = require('../models/Item');

async function getAll() {
    return Item.find({})
}

async function create(item) {
    const result = new Item(item);

    await result.save()

    return result
}

module.exports = {
    create,
    getAll,
}