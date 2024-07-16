const conn = require('../../../config/database');
const common = require('../../../config/common');
const md5 = require('md5');
const auth_model = {

    login: function (req, callback) {
        let token = common.generateToken(10);
        var data = req.body;
        conn.query(`select * from tbl_user where  email = ? AND role = "User";`, [data.email], function (error, result) {
            if (error) {
                callback('0', 'Error', error);
            }
            else {
                if (result.length > 0) {
                    if (result[0].password == md5(data.password)) {
                        if (result[0].is_active == 1) {

                            conn.query(`update tbl_user set token = ? where id = ?`, [token, result[0].id], function (error1, result1) {
                                if (error1) {
                                    callback('0', 'Error', error1);
                                }
                                else {
                                    conn.query(`select * from tbl_user where id = ?`, [result[0].id], function (error2, result2) {
                                        if (error2) {
                                            callback('0', 'Error', error2);
                                        }
                                        else {
                                            callback('1', 'Success', result2);
                                        }
                                    })
                                }
                            })
                        }
                        else {
                            callback('3', 'Error', 'In Active User')
                        }
                    }
                    else {
                        callback('0', 'Error', 'Your Entered Passwrod is Wrong, Please Enter Currect Password')
                    }
                }
                else {
                    callback('0', 'Error', 'Your Entered Email is Wrong, Please Enter Currect Email')
                }
            }
        })
    },

    register: function (req, callback) {
        var data = req.body
        common.CheckUnique(data, function (unique_values) {
            if (unique_values != null && unique_values.length > 0) {
                callback('0', 'error', unique_values);
            }
            else {
                let userdata = {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    mobile_number: data.mobile,
                    email: data.email,
                    password: md5(data.password),
                    role: 'User',
                    token: common.generateToken(15),
                }
                conn.query(`insert into tbl_user set ?;`, [userdata], function (error, result) {
                    if (error) {
                        callback('0', 'Error', error);

                    }
                    else {
                        conn.query(`select * from tbl_user where id = ?`, [result.insertId], function (error1, UserModel) {
                            if (error1) {
                                callback('0', 'Error', error1);

                            }
                            else {
                                callback('1', 'Success', UserModel);
                            }
                        })
                    }
                })
            }
        })
    },

    logout: function (req, callback) {
        conn.query(`update tbl_user set token = null where id = ?`, [req.user_id], function (error, result) {
            if (error) {
                callback('0', 'Error', error)
            }
            else {
                callback('1', 'Success', 'Logout Successyfully..');
            }
        })
    },


    books_listing: function (req, callback) {
        conn.query(`select b.*, concat("${process.env.PDF_PATH}",b.pdf) as pdf, concat("${process.env.THUMBNAIL_PATH}",b.thumbnail) as thumbnail from tbl_book b where b.is_active = 1 order by b.created_at desc`, function (error, result) {
            if (error) {
                callback('0', 'Error', error)
            }
            else {
                callback('1', 'success', result);
            }
        })
    },

    add_to_cart: function (req, callback) {
        let data = req.body;

        let CartData = {
            user_id: req.user_id,
            total_cart_item: data.item
        }
        conn.query(`select * from tbl_cart where user_id = ?`, [req.user_id], function (error, result) {
            if (error) {
                callback('0', 'error', error);
            }
            else {
                if (result.length > 0) {
                    let CartDetails = {
                        cart_id: result[0].id,
                        book_id: data.book_id,
                        qty: data.qty
                    }
                    conn.query(`select * from tbl_cart_details where book_id = ?  and cart_id = ?`, [data.book_id,result[0].id], function (error1, result1) {
                        if (error1) {
                            callback('0', 'error', error1);
                        }
                        else {
                            if (result1.length > 0) {
                                callback('1', 'warning', "Item is Already in cart..");
                            }
                            else {
                                conn.query(`insert into tbl_cart_details set ?`, [CartDetails], function (error2, result2) {
                                    if (error1) {
                                        callback('0', 'Error', error2);
                                    }
                                    else {
                                        callback('1', 'Success', 'Item Added Into Cart..');
                                    }
                                })
                            }
                        }
                    })
                }
                else {
                    conn.query(`insert into tbl_cart set ?`, [CartData], function (error3, result3) {
                        if (error3) {
                            callback('0', 'error', error3);
                        }
                        else {
                            let CartDetails = {
                                cart_id: result3.insertId,
                                book_id: data.book_id,
                                qty: data.qty
                            }
                            conn.query(`insert into tbl_cart_details set ?`, [CartDetails], function (error4, result4) {
                                if (error4) {
                                    callback('0', 'Error', error4);
                                }
                                else {
                                    callback('1', 'Success', 'Item Added Into Cart..');
                                }
                            })
                        }
                    })
                }
            }
        })
    },

    cart_data: function (req, callback) {
        conn.query(`SELECT b.*,cd.*,concat("${process.env.PDF_PATH}",b.pdf) as pdf,concat("${process.env.THUMBNAIL_PATH}",b.thumbnail) as thumbnail FROM tbl_cart c JOIN tbl_cart_details cd ON cd.cart_id = c.id JOIN tbl_book b ON b.id = cd.book_id where c.user_id= ?;`, [req.user_id], function (error, result) {
            if (error) {
                callback('0', 'Error', error);
            }
            else {
                callback('1', 'success', result);
            }
        })
    },

    delete_product_cart: function (req, callback) {
        conn.query(`delete from tbl_cart_details where book_id = ? and cart_id = ?;`, [req.body.book_id, req.body.cart_id], function (error, result) {
            if (error) {
                callback('0', 'error', error);
            }
            else {
                callback('1', 'Success', 'product deleted succesfully...')
            }
        })
    },

    product_order: function (req, callback) {
        let data = req.body;
        let date = new Date();
        let orderDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        let orderData = {
            user_id: req.user_id,
            seller_id: data.pdata[0].owner_id,
            order_number: common.generateOrderNumber(10),
            order_date: orderDate,
            total_amount: data.total,
            status: 'Pending'
        }
        conn.query(`insert into tbl_order set ?`, [orderData], function (error, result) {
            if (error) {
                callback('0', 'error', error);
            }
            else {
                Promise.all(data.pdata.map(async products => {
                    let orderDetail = {
                        order_id: result.insertId,
                        book_id: products.book_id,
                        total_qty: products.qty,
                        total_price: (products.qty * products.price),
                    }
                    conn.query(`insert into tbl_order_details set ?`, [orderDetail])
                })).then(result1 => {
                    conn.query(`delete from tbl_cart_details where cart_id = ?; delete from tbl_cart where id = ?`, [data.pdata[0].cart_id, data.pdata[0].cart_id], function (error, result) {
                        if (!error) {
                            callback('1', 'Success', 'Order Placed..')
                        }
                    });

                }).catch(error1 => callback('0', 'Error', error1))
            }
        })

    },

    my_orders: function (req, callback) {
        conn.query(`select * from tbl_order where user_id = ? order by id desc;`,[req.user_id],function(error,result){
            if(error){
                callback('0', 'Error', error);
            }
            else{
                callback('1', 'Success', result);
            }
        })
    },

    update_cart: function (req, callback) {
        let data = req.body;
        conn.query(`update tbl_cart_details set qty = ? where book_id = ? and cart_id = ?`, [data.qty, data.book_id, data.cart_id], function (error, result) {
            if (error) {
                callback('0', 'Error', error);
            }
            else {
                callback('1', 'success', result);
            }
        })
    },

    my_order_details:function(req,callback){
        conn.query(`SELECT b.*,od.*,concat("${process.env.PDF_PATH}",b.pdf) as pdf,concat("${process.env.THUMBNAIL_PATH}",b.thumbnail) as thumbnail FROM tbl_order_details od JOIN tbl_book b ON od.book_id = b.id WHERE od.order_id = ?;`,[req.body.order_id],function(error,result){
            if(error){
                callback('0', 'Error', error);
            }
            else{
                callback('1', 'Success', result);
            }
        })
    }
}
module.exports = auth_model;