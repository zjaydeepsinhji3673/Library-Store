const conn = require('../config/database');

const common = {


    CheckUnique: function (data, callback) {
        let errors = {};
        let errorforunique;
        conn.query(
            `SELECT * FROM tbl_user WHERE (email = ? OR mobile_number = ?) AND role = "User" AND is_active = 1`,
            [data.email,data.mobile],
            function (error, result) {
                if (!error) {
                    result.forEach(row => {
                        if (row.email === data.email) {
                            errors.email = "This Email is Already Exist!!!..Please Enter Unique Email";
                        }
                        if (row.mobile_number === data.mobile) {
                            errors.email = "This Mobile Number is Already Exist!!!..Please Enter Unique Mobile Number";
                        }
                    });
                    for (let key in errors) {
                        errorforunique = errors[key];
                        break;
                    }
                    if (errorforunique != null) {
                        callback(errorforunique);
                    } else {
                        callback(null);
                    }
                } else {
                    callback(error);
                }
            }
        );
    },

    send_response: function (req, res, code, message, data) {

        let response_data = {
            code: code,
            message: message,
            data: data
        }
        res.status(200);
        res.send(response_data);
    },

    generateToken(length) {
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let text = "";
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    },

    generateOrderNumber(length){
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let text = "";
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
module.exports = common;