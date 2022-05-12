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
const member = model.member

// //import auth
const auth = require("../auth")
app.use(auth)
const jwt = require("jsonwebtoken")
const SECRET_KEY = "TokoLaundry"

//get data member
app.get("/", auth, (req, res) =>{
    member.findAll()
        .then(member => {
            res.json({
                count : member.length,
                member : member
            })
        })
        .catch(error => {
            res.json({
                mesaage: error.mesaage
            })
        }) 
    })

//get find one
app.get("/:member_id", (req, res) =>{
    member.findOne({ where: {member_id: req.params.member_id}})
    .then(result => {
        res.json({
            member: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//post data baru admin
app.post("/",auth, (req,res) => {
    let data = {
        name_member : req.body.name_member,
        alamat : req.body.alamat,
        tlp : req.body.tlp,
        jenis_kelamin : req.body.jenis_kelamin
    }

member.create(data)
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

//update data member
app.put("/:id",auth, (req, res) => {
    let param = {
        member_id : req.params.id
    }
    let data = {
        name_member : req.body.name_member,
        alamat : req.body.alamat,
        tlp : req.body.tlp,
        jenis_kelamin : req.body.jenis_kelamin
    }
    member.update(data, {where : param})
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

//delete data admin
app.delete ("/:id",auth, (req, res) => {
    let param = {
        member_id : req.params.id
    }
    member.destroy({where : param})
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