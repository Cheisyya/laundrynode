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
const admin = model.admin
const outlet = model.outlet

// //import auth
const auth = require("../auth")
app.use(auth)
const jwt = require("jsonwebtoken")
const SECRET_KEY = "TokoLaundry"

// endpoint get admin
app.get("/", async (req, res) => {
    let dataAdmin = await admin.findAll({
        include: [
            { model: model.outlet, as: "outlet"}
        ]
    })
    return res.json(dataAdmin)
})

//post data baru admin
app.post("/", (req,res) => {
    let data = {
        outlet_id : req.body.outlet_id,
        name : req.body.name,
        username : req.body.username,
        password : md5 (req.body.password),
        role :  req.body.role
    }

admin.create(data)
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

//update data admin
app.put("/:id", (req, res) => {
    let param = {
        admin_id : req.params.id
    }
    let data = {
        outlet_id : req.body.outlet_id,
        name : req.body.name,
        username : req.body.username,
        password : md5 (req.body.password),
        role :  req.body.role
    }
    admin.update(data, {where : param})
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
app.delete ("/:id", (req, res) => {
    let param = {
        admin_id : req.params.id
    }
    admin.destroy({where : param})
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

//login admin
app.post("/auth", async (req,res) => {
    let params = {
        username: req.body.username,
        password: md5(req.body.password)
    }
 
    let result = await admin.findOne({where: params})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})



module.exports = app