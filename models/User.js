const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },

  rol: {
    type: Number
  },
  state: {
    type: Number
  }
}, {
    collection: 'users'
  })

module.exports = mongoose.model('Users', userSchema)