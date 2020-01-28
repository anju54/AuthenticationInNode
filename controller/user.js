const con = require('../util/database');
const bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../util/config');


const { check, validationResult } = require('express-validator');

// This is used for signup
exports.signup = (req, res, next) => {

    console.log(req.body);

    if( req.body.password == req.body.confirmPwd ){

        bcryptjs.hash(req.body.password,10, function(err,hash){

            console.log(err);
            var postData  = {
                "name" : req.body.email,
                "password" : hash
            };
            // singup
            con.query('INSERT INTO users.user SET ?', postData, function (error, results, fields) {
                if (error) throw error;
                res.end(JSON.stringify(results));
            });
        });
        
    }else{
        var err = {
            "err":"Paasword and confirm password did not match! Try again"
        };
        res.end(JSON.stringify(err));
    }

    
};

// This is used to get all the users logged in the system
exports.getAllUsers = (req, res, next) => {

    //console.log(req);
    con.query('SELECT * FROM users.user', function(error, results, fields){
        if (error) throw error;
        res.end(JSON.stringify(results));
    });    
}

// This is used to login
exports.login = (req, res, next) => {

    var data = req.body;
    
    con.query('SELECT * FROM users.user WHERE name = ?  ', [data.name] ,
                function(error, results, fields){
        if (error) throw error;

        if(results.length==1){
            bcryptjs.compare(data.password, results[0].password, function(err, isMatch) {
                if (err) {
                   throw err;
                } else if (!isMatch) {
                    res.status(400).send('Password does not match');
                } else {
                    var token = jwt.sign({ id: results[0].user_id }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.status(200).send({ auth: true, token: token });
                }
                });
        }else{
            var err = {
                "err":"Password or email id did not match!! Opps try again"
            };
            res.end(JSON.stringify(err));
        }  
    })
}