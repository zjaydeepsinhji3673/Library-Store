const Validator = require('Validator');
const bypassmethods = new Array("register","login","books_listing");
const conn = require('../config/database');
const middleware = {
    //TO Validate Header TOken
    validateHeaderToken:function(req,res, callback){
        let headertoken = (req.headers['token'] != undefined && req.headers['token'] != "") ? req.headers['token'] : '';
        let pathdata = req.path.split("/");
        if(bypassmethods.indexOf(pathdata[pathdata.length-1]) === -1){
            if(headertoken != ""){
                try {
                    conn.query("select * from tbl_user where token = ?",[headertoken], function(error,result){
                        if(!error && result.length > 0){
                            req.user_id = result[0].id;
                            callback();
                        }
                        else{
                           let response_data = {
                                code:'-1',
                                data: "Invalid Header Token"
                            }
                            res.status(401);
                            res.send(response_data);
                        }
                    })
                } 
                catch(error) {
                    
                   let response_data = {
                        code:'-1',
                        data: "Invalid Header Token"
                    }
                    res.status(401);
                    res.send(response_data); 
                }
            }
            else{
                let response_data = {
                    code:'-1',
                    data: "Invalid Header Token"
                }
                res.status(401);
                res.send(response_data);
            }
        }
        else {
            callback();
        }
    },

    // TO Validate API Key
    validateApiKey:function(req,res,callback){
        let api_key = (req.headers['api_key'] != undefined && req.headers['api_key'] != '') ? req.headers['api_key'] : '';
        if(api_key != ''){

            try{
                if(api_key == process.env.API_KEY){
                    callback();
                }
                else {
                    let response_data = {
                        code : '-1',
                        data : "Invalid API Key"
                    }
                    res.status(401);
                    res.send(response_data);
                }
            } catch(error){
                let response_data = {
                    code : '-1',
                    data : "Invalid API Key"
                }
                res.status(401);
                res.send(response_data);
            }
        }
        else {
            let response_data = {
                code : '-1',
                data : "Invalid API Key"
            }
            res.status(401);
            res.send(response_data);
        }
    },
}
module.exports = middleware;