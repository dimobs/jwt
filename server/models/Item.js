const { model, Schema, Types: { ObjectId} } = require('mongoose');

const schema = new Schema({
    make: { type: String },
    model: { type: String },
    year: { type: Number },
    description: { type: String },
    price: { type: Number },
    img: { type: String },
    material: { type: String },
    owner: { type: ObjectId, ref: 'User' }
});

const Item = model('Item', schema);

module.exports = Item;