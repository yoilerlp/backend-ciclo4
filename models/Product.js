const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  units: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  soldUnits: {
    type: Number,
    default: 0
  }

}, {
    collection: 'products'
  })

module.exports = mongoose.model('Product', productSchema)
