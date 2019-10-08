'use strict'
var express = require('express')
var router = express.Router();
var bddService = require('../services/bdd.srv.js');
var http = require('http');

router.post('/calabash',function(req,res){
    console.log("calabash rq: "+ JSON.stringify(req.body))
    
    let data={
        'app' : req.body.app,
        'code': req.body.code,
        'path_project': req.body.path_project
    }
    bddService.generate(data, function(apps){
        res.statusCode = 200;
        res.send({ status: "OK" });
    },function(err){
        res.statusCode = 404;
        res.send(err);
        
    })
  
    return res;
});

module.exports = router;