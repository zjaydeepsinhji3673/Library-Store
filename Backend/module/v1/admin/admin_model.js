const conn = require('../../../config/database');
const common = require('../../../config/common');
const md5 = require('md5');
const auth_model = {

    login: function (req, callback) {
        let token = common.generateToken(10);
        var data = req.body;
        conn.query(`select * from tbl_user where  email = ? AND role = "Admin";`, [data.email], function (error, result) {
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

    // register: function (req, callback) {
    //     var data = req.body
    //     common.CheckUnique(data, function (unique_values) {
    //         if (unique_values != null && unique_values.length > 0) {
    //             callback('0','error',unique_values);
    //         }
    //         else {
    //             let userdata = {
    //                 first_name:data.first_name,
    //                 last_name:data.last_name,
    //                 email: data.email,
    //                 password: md5(data.password),
    //                 gender:data.gender,
    //                 token:common.generateToken(15),                   
    //             }
    //             conn.query(`insert into tbl_user set ?;`, [userdata], function (error, result) {
    //                 if (error) {
    //                     callback('0', 'Error', error);

    //                 }
    //                 else {
    //                     conn.query(`select * from tbl_user where id = ?`,[result.insertId],function(error1, UserModel){
    //                         if(error1){
    //                             callback('0', 'Error', error1);

    //                         }
    //                         else{
    //                             callback('1','Success',UserModel);
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //     })
    // },

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

    add_book: function (req, callback) {
        let data = req.body;
        let BookData = {
            owner_id: req.user_id,
            name: data.name,
            author: data.author,
            title: data.title,
            tag: data.tags,
            pageNo: data.pageNo,
            price: data.price,
            thumbnail: data.thumbnail,
            pdf: data.pdf
        }
        conn.query(`insert into tbl_book set ?`, [BookData], function (error, result) {
            if (error) {
                callback('0', 'Error', error)
            }
            else {
                callback('1', 'Success', 'Book Added Successfully..');
            }
        })
    },

    All_books: function (req, callback) {
        conn.query(`select b.*, concat("${process.env.PDF_PATH}",b.pdf) as pdf, concat("${process.env.THUMBNAIL_PATH}",b.thumbnail) as thumbnail, DATE_FORMAT(b.created_at,'%d %M, %Y') AS added_date from tbl_book b where b.is_active = 1 order by b.created_at desc`, function (error, result) {
            if (error) {
                callback('0', 'Error', error)
            }
            else {
                callback('1', 'success', result);
            }
        })
    },

    delete_book: function (req, callback) {
        conn.query(`update tbl_book set is_active = 0 where id = ?`, [req.body.book_id], function (error, result) {
            if (error) {
                callback('0', 'Error', error)
            }
            else {
                callback('1', 'success', 'Book Deleted Successfully..');
            }
        })
    },

    pending_orders: function (req, callback) {
        conn.query(`select u.*,o.* from tbl_order o join tbl_user u on u.id = o.user_id where o.status='Pending';`, function (error, result) {
            if (error) {
                callback('0', 'Error', error);
            }
            else {
                callback('1', 'Success', result);
            }
        })
    },

    accept_order: function (req, callback) {
        conn.query(`update tbl_order set status = 'Accepted' where id = ?`, [req.body.order_id], function (error, result) {
            if (error) {
                callback('0', 'Error', error);
            }
            else {
                callback('1', 'Success', 'Order Accepted...')
            }
        })
    },

    reject_order: function (req, callback) {
        let UpdateData = {
            status: 'Rejected',
            reject_reason: req.body.reject_reason
        }
        conn.query(`update tbl_order set ? where id = ?`, [UpdateData, req.body.order_id], function (error, result) {
            if (error) {
                callback('0', 'Error', error);
            }
            else {
                callback('1', 'Success', 'Order Accepted...')
            }
        })
    },

    all_orders: function (req, callback) {
        conn.query(`select u.*,o.* from tbl_order o join tbl_user u on u.id = o.user_id order by o.created_at desc;`, function (error, result) {
            if (error) {
                callback('0', 'Error', error);
            }
            else {
                callback('1', 'Success', result);
            }
        })
    },

    all_count: function (req, callback) {
        conn.query(`SELECT COUNT(id) as user FROM tbl_user WHERE role='User' and is_active = 1;
        SELECT COUNT(id) as book FROM tbl_book where is_active =1;
        SELECT COUNT(id) as All_order FROM tbl_order;
        SELECT COUNT(id) as porder FROM tbl_order WHERE status='Pending';
        SELECT COUNT(id) as rorder FROM tbl_order WHERE status='Rejected';
        SELECT COUNT(id) as aorder FROM tbl_order WHERE status='Accepted';`, function (error, result) {
            if (error) {
                callback('0', 'Error', error);
            }
            else {
                callback('1', 'Success', result);
            }
        })
    },

    accepted_orders: function (req, callback) {
        conn.query(`select u.*,o.* from tbl_order o join tbl_user u on u.id = o.user_id where o.status='Accepted' order by o.created_at desc;`, function (error, result) {
            if (error) {
                callback('0', 'Error', error);
            }
            else {
                callback('1', 'Success', result);
            }
        })
    },

    rejected_orders: function (req, callback) {
        conn.query(`select u.*,o.* from tbl_order o join tbl_user u on u.id = o.user_id where o.status='Rejected' order by o.created_at desc;`, function (error, result) {
            if (error) {
                callback('0', 'Error', error);
            }
            else {
                callback('1', 'Success', result);
            }
        })
    },

    order_details:function(req, callback){
        conn.query(`SELECT b.*,od.*,concat("${process.env.PDF_PATH}",b.pdf) as pdf,concat("${process.env.THUMBNAIL_PATH}",b.thumbnail) as thumbnail FROM tbl_order_details od JOIN tbl_book b ON od.book_id = b.id WHERE od.order_id = ?;`,[req.body.order_id], function(error,result){
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