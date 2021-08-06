let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Product Model
let userSchema = require('../models/User');

// CREATE Product
router.route('/create-user').post((req, res, next) => {
  userSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ Products
router.route('/').get((req, res) => {
  userSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
}) ;

// Get Single Product
router.route('/edit-user/:id').get((req, res) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})

// Update Student
router.route('/update-product/:id').put((req, res, next) => {
  userSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('User updated successfully !')
    }
  })
})

// Delete Product
router.route('/delete-user/:id').delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router