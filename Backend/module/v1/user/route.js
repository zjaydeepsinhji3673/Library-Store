const express = require('express');
var router = express.Router();
const common = require('../../../config/common');
const user_model = require('./user_model');

router.post('/login', function (req, res) {
    user_model.login(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.post('/register', function (req, res) {
    user_model.register(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/logout', function (req, res) {
    user_model.logout(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/books_listing',function(req,res){
    user_model.books_listing(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.post('/add_to_cart',function(req,res){
    user_model.add_to_cart(req, function (code, message, data){
        common.send_response(req, res, code, message, data);
    })
})

router.get('/cart_data',function(req,res){
    user_model.cart_data(req, function (code, message, data){
        common.send_response(req, res, code, message, data);
    })
})

router.post('/delete_product_cart', function(req,res){
    user_model.delete_product_cart(req, function (code, message, data){
        common.send_response(req, res, code, message, data);
    })
})

router.post('/product_order',function(req,res){
    user_model.product_order(req, function (code, message, data){
        common.send_response(req, res, code, message, data);
    })
})

router.get('/my_orders',function(req,res){
    user_model.my_orders(req, function (code, message, data){
        common.send_response(req, res, code, message, data);
    }) 
})

router.put('/update_cart',function(req,res){
    user_model.update_cart(req, function (code, message, data){
        common.send_response(req, res, code, message, data);
    }) 
})

router.post('/my_order_details',function(req,res){
    user_model.my_order_details(req, function (code, message, data){
        common.send_response(req, res, code, message, data);
    })
})
module.exports = router;