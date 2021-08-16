let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Sale Model
let saleSchema = require('../models/Sale');

// Load Sale model
const Sale = require("../models/Sale");


// CREATE Sale
router.route('/create-sale').post((req, res, next) => {

    const newSale = new Sale({
        productName: req.body.product.name,
        valuePerUnit: req.body.product.price,
        quantities: req.body.quantities,
        totalValue: req.body.product.price * req.body.quantities,
        sellerName: req.body.user.firstName + " " + req.body.user.lastName
      });

  saleSchema.create(newSale, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ Sales
router.route('/').get((req, res) => {
  saleSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
}) ;

// Get Single Sale
router.route('/edit-sale/:id').get((req, res) => {
  saleSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})

// Update Sale
router.route('/update-sale/:id').put((req, res, next) => {
  saleSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Sale updated successfully !')
    }
  })
})



module.exports = router