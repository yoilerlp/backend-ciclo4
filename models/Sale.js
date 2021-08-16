const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let saleSchema = new Schema({

  productName: {
    type: String,
    required: true

  },
  valuePerUnit: {
    type: Number,
    required: true
  },
  quantities: {
    type: Number,
    required: true
  },
  totalValue: {
    type: Number,
    required: true
  },
  sellerName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
    collection: 'sales'
  })

module.exports = Sale =  mongoose.model('sales', saleSchema)