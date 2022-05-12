//Import Library
const express = require("express")
const bodyParser = require("body-parser")
const md5 = require("md5")

//Implementasi
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//import model
const models = require("../models/index")
const paket = models.paket
const outlet = models.outlet

// // //import auth
const auth = require("../auth")
app.use(auth)//harus login baru bisa akese endpoint

// endpoint get admin
app.get("/", async (req, res) => {
    let dataPaket = await paket.findAll({
        include: [
            { model: models.outlet, as: "outlet"}
        ]
    })
    return res.json(dataPaket)
})

//get find one
app.get("/:paket_id", (req, res) =>{
    paket.findOne({ where: {paket_id: req.params.paket_id}})
    .then(result => {
        res.json({
            paket: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//post data paket
app.post("/", (req,res) => {
    let data = {
        outlet_id : req.body.outlet_id,
        jenis : req.body.jenis,
        satuan : req.body.satuan,
        harga : req.body.harga
    }

paket.create(data)
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

//put data paket
app.put("/:id", (req, res) => {
    let param = {
        paket_id : req.params.id
    }
    let data = {
        outlet_id : req.body.outlet_id,
        jenis : req.body.jenis,
        satuan : req.body.satuan,
        harga : req.body.harga
    }
    paket.update(data, {where : param})
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

//delete data paket
app.delete ("/:id", (req, res) => {
    let param = {
        paket_id : req.params.id
    }
    paket.destroy({where : param})
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