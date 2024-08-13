const mongoose = require('mongoose');
const Cart = require('../models/Cart'); // Adjust the path as necessary
const Product = require('../models/Product'); // Adjust the path as necessary

const cleanUpInvalidProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // Fetch all carts
        const carts = await Cart.find().populate('items.product');

        for (const cart of carts) {
            const validItems = [];
            for (const item of cart.items) {
                const productExists = await Product.findById(item.product);
                if (productExists) {
                    validItems.push(item);
                }
            }
            // Update the cart with valid items
            cart.items = validItems;
            await cart.save();
        }

        console.log('Invalid products removed from carts.');
    } catch (error) {
        console.error('Error cleaning up invalid products:', error);
    } finally {
        await mongoose.disconnect();
    }
};

cleanUpInvalidProducts();
