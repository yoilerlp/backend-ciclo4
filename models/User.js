const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstName: {
    type: String,
    required: true

  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  rol: {
    type: Number,
    required: true
  },
  state: {
    type: Number,
    required: true
  },
  balanceInSales: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
    collection: 'users'
  })

module.exports = User =  mongoose.model('users', userSchema)