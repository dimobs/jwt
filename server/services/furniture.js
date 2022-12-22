const Item = require('../models/Item');

async function getAll() {
    console.log('seervice furniture 4');
    return Item.find({})
}

function getById(id) {
  return Item.findById(id);
};

async function update(id, item) {
    const existing = await Item.findById(id);

    existing.make = item.make;
    existing.model = item.model;
    existing.year = item.year;
    existing.description = item.description;
    existing.price = item.price;
    existing.img = item.img;
    existing.material = item.material;

    await existing.save();

    return existing;
}

async function create(item) {
    const result = new Item(item);
    await result.save()
    return result
}

async function deleteById(id) {
    await Item.findByIdAndDelete(id);
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteById
}