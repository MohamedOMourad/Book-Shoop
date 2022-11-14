const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{ productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, quantity: { type: Number, required: true } }]
    }
});

User.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(cartProduct => cartProduct.productId.toString() === product._id.toString());
    if (cartProductIndex >= 0) {
        this.cart.items[cartProductIndex].quantity = this.cart.items[cartProductIndex].quantity + 1;
    } else {
        this.cart.items.push({ productId: product._id, quantity: 1 })
    }
    return this.save()
}

User.methods.deleteItemFromCart = function (prodId) {
    this.cart.items = this.cart.items.filter(cartProduct => cartProduct.productId.toString() !== prodId.toString())
    return this.save()
}

User.methods.clearCart = function () {
    this.cart.items = []
    return this.save()
}

module.exports = mongoose.model('User', User);