let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Product Model
let productSchema = require('../models/Product');
// User  Model
let userSchema = require('../models/User');


// Get Best Selling Products
router.route('/get-best-selling-products').get((req, res) => {
    productSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {

        console.log(data.length)
        for (var i = 0 ; i < data.length -1 ; i++){

            for (var j= i+1; j< data.length ; j++ ){
                if (data[i].soldUnits  < data[j].soldUnits ) {
                    let temporal  = data[i];
                    data[i] = data[j];
                    data[j] = temporal;
                }
            }

        }

      res.json(data)
    }
  })
}) ;


// Get Least Selling Products
router.route('/get-least-selling-products').get((req, res) => {
    productSchema.find((error, data) => {
      if (error) {
        return next(error);
      } else {

        console.log(data.length)
        for (var i = 0 ; i < data.length -1 ; i++){

            for (var j= i+1; j< data.length ; j++ ){
                if (data[i].soldUnits  > data[j].soldUnits) {  
                    var temporal = data[i];
                    data[i] = data[j];
                    data[j] = temporal;
                }
            }

        }

        res.json(data)
      }
    })
}) ;





// Get the sellers with the most sales
router.route('/get-sellers-most-sales').get((req, res) => {
    userSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {

        
        var data2=[];
        for (var n = 1 ; n < data.length   ; n++){
                if (data[n].rol===2){
                    data2.push(data[n]);
                }
        }

        
        for (var i = 0 ; i < data2.length -1 ; i++){
            for (var j= i+1; j< data2.length ; j++ ){
                if (data2[i].balanceInSales  < data2[j].balanceInSales ) {
                    let temporal  = data2[i];
                    data2[i] = data2[j];
                    data2[j] = temporal;
                }
            }
        }

      res.json(data2)
    }
  })
}) ;



// Get the sellers with the least sales
router.route('/get-sellers-least-sales').get((req, res) => {
    userSchema.find((error, data) => {
      if (error) {
        return next(error);
      } else {


        var data2=[];
        for (var n = 1 ; n < data.length   ; n++){
                if (data[n].rol===2){
                    data2.push(data[n]);
                }
        }

        
        for (var i = 0 ; i < data2.length -1 ; i++){

            for (var j= i+1; j< data2.length ; j++ ){
                if (data2[i].balanceInSales  > data2[j].balanceInSales ) {  
                    var temporal = data2[i];
                    data2[i] = data2[j];
                    data2[j] = temporal;
                }
            }

        }

        res.json(data2)
      }
    })
}) ;

module.exports = router