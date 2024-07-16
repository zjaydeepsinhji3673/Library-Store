const express = require('express');
var router = express.Router();
const common = require('../../../config/common');
const admin_model = require('./admin_model');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, 'uploads/pdfs/');
        }
        else {
            cb(null, 'uploads/thumbnail/');
        }
    },
    filename: (req, file, cb) => {
        let name;
        if (file.mimetype === 'application/pdf') {
            name = Date.now() + '-pdf-' + file.originalname;
            req.body.pdf = name;
        }
        else {
            name = Date.now() + '-thumb-' + file.originalname;
            req.body.thumbnail = name;
        }
        cb(null, name);
    },
});
const upload = multer({
    storage: storage
})


router.post('/login', function (req, res) {
    admin_model.login(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/logout', function (req, res) {
    admin_model.logout(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.post('/add_book', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), function (req, res) {
    admin_model.add_book(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/All_books',function(req,res){
    admin_model.All_books(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.put('/delete_book',function(req,res){
    admin_model.delete_book(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/pending_orders',function(req,res){
    admin_model.pending_orders(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.put('/accept_order',function(req,res){
    admin_model.accept_order(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.put('/reject_order',function(req,res){
    admin_model.reject_order(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/all_orders',function(req,res){
    admin_model.all_orders(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/all_count',function(req,res){
    admin_model.all_count(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/accepted_orders',function(req,res){
    admin_model.accepted_orders(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/rejected_orders',function(req,res){
    admin_model.rejected_orders(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.post('/order_details',function(req, res){
    admin_model.order_details(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})
module.exports = router;