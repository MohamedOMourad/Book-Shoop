const mongodb = require('mongodb');
const mongodbObjectId = mongodb.ObjectId
const getDb = require('../util/database').getDb;
module.exports = class Product {
  constructor(title, price, description, imageUrl, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    db.collection('product').insertOne(this)
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('product').find().toArray().then(Products => {
      return Products
    })
      .catch(e => {
        console.log(e)
      })
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection('product')
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static updateProduct(product) {
    const db = getDb();
    return db.collection('product').updateOne({ _id: new mongodb.ObjectId(product.productId) }, { $set: product })
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('product').deleteOne({ _id: new mongodb.ObjectId(prodId) })
  }
}