let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Sale Model
let saleSchema = require('../models/Sale');


let userSchema = require('../models/User');
let productSchema = require('../models/Product');


// Load Sale model
const Sale = require("../models/Sale");


// CREATE Sale
router.route('/create-sale').post(async (req, res, next) => {

  let userEmail = req.body.user.email
  let producId = req.body.product._id
  let quantities = req.body.quantities

  const user = await userSchema.findOne({ email: userEmail })
  const product = await productSchema.findOne({ _id: producId })

  if(user == null || product == null) {
    res.statusCode(400).json({
      error: "Usuario o producto invalido"
    })
  }

  if (product.units < quantities) {
    res.statusCode(400).json({
      error: "No se puede vender esa cantidad"
    })
  }



  const newSale = new Sale({
    productName: req.body.product.name,
    valuePerUnit: req.body.product.price,
    quantities: quantities,
    totalValue: req.body.product.price * quantities,
    sellerName: req.body.user.firstName + " " + req.body.user.lastName
  });

  user.balanceInSales += req.body.product.price * quantities
  product.soldUnits += quantities
  product.units -= quantities

 


  saleSchema.create(newSale, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data)
      res.json(data)
    }
  })

  await user.save()
  await product.save()

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
});

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