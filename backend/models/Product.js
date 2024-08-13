const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    rating: { type: Number, default: 0 }, // Add this field if you want to store average rating
});

module.exports = mongoose.model('Product', productSchema);
