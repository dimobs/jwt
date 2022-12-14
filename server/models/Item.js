const { model, Schema } = require('mongoose');

const schema = new Schema({
    make: { type: String },
    model: { type: String },
    year: { type: Number },
    description: { type: String },
    price: { type: Number },
    img: { type: String },
    material: { type: String },
});

const Item = model('Item', schema);

module.exports = Item;