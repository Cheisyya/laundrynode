//Import Library
const express = require("express")
const bodyParser = require("body-parser")
const md5 = require("md5")

//Implementasi
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Import Model
const model = require('../models/index')
const req = require("express/lib/request")
const res = require("express/lib/response")
const outlet = model.outlet
const admin = model.admin

// //import auth
const auth = require("../auth")
app.use(auth)
const jwt = require("jsonwebtoken")
const SECRET_KEY = "TokoLaundry"

//get outlet findall
app.get("/", (req, res) =>{
    outlet.findAll()
        .then(outlet => {
            res.json({
                count : outlet.length,
                outlet : outlet
            })
        })
        .catch(error => {
            res.json({
                mesaage: error.mesaage
            })
        }) 
    })
    
    //get outlet by admin id
    app.get("/:admin_id", (req, res) =>{
        outlet.findAll({ where: {admin_id: req.params.admin_id}})
        .then(result => {
            res.json({
                outlet: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    })


//post data baru outlet
app.post("/", (req,res) => {
    let data = {
        admin_id : req.body.admin_id,
        name_outlet : req.body.name_outlet,
        alamat : req.body.alamat,
        tlp : req.body.tlp
    }

outlet.create(data)
    .then(result => {
        res.json ({
            message : "Data has been inserted"
        })
    })
    .catch(error => {
        res.json ({
            message : "error.message"
        })
    })
})

//GET outlet by ID, METHOD : GET, FUNCTION : fINDoNE
app.get("/:outlet_id", (req, res) =>{
    outlet.findOne({ where: {outlet_id: req.params.outlet_id}})
    .then(result => {
        res.json({
            outlet: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//update data outlet
app.put("/:id", (req, res) => {
    let param = {
        outlet_id : req.params.id
    }
    let data = {
        admin_id : req.body.admin_id,
        name_outlet : req.body.name_outlet,
        alamat : req.body.alamat,
        tlp : req.body.tlp
    }
    outlet.update(data, {where : param})
        .then(result => {
            res.json ({
                message : "Data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message : error.message
            })
        })
})

//delete data outlet
app.delete ("/:id", (req, res) => {
    let param = {
        outlet_id : req.params.id
    }
    outlet.destroy({where : param})
        .then(result => {
            res.json ({
                message : "Data has been deleted"
            })
        })
            .catch(error => {
                res.json({
                    message : error.message
                })
            })
        })



module.exports = app