//import library
const express = require ("express")
const app = express()
app.use(express.json())

//import model
const models = require("../models/index")
const transaksi =  models.transaksi
const detail_transaksi = models.detail_transaksi

const auth = require("../auth")
app.use(auth)

// endpoint get transaksi
app.get("/", async (request, response) => {
    let dataTransaksi = await transaksi.findAll({
        include: [
            { model: models.member, as: "member"},
            { model: models.outlet, as: "outlet"},
            { model: models.admin, as: "admin"},
            { 
                model: models.detail_transaksi,
                as: "detail_transaksi",
                include: [
                    {model: models.paket, as:"paket"}
                ]
            }
        ]
    })
    return response.json(dataTransaksi)
})

// //get outlet_id tidak detail
// app.get("/:outlet_id", (req, res) =>{
//     transaksi.findAll({ where: {outlet_id: req.params.outlet_id}})
//     .then(result => {
//         res.json({
//             transaksi: result
//         })
//     })
//     .catch(error => {
//         res.json({
//             message: error.message
//         })
//     })
// })

//get by id outlet all
app.get("/:outlet_id", async (req, res) =>{
    let param = { outlet_id: req.params.outlet_id}
    let result = await transaksi.findAll({
        where: param,
        include: [
            { model: models.member, as: "member"},
            { model: models.outlet, as: "outlet"},
            { model: models.admin, as: "admin"},
            { 
                model: models.detail_transaksi,
                as: "detail_transaksi",
                include: [
                    {model: models.paket, as:"paket"}
                ]
            }
        ]
    })
    res.json({
        transaksibyoutlet: result})
})

// endpoint new transaksi
app.post("/", (request,response) => {
    let newTransaksi = {
        member_id: request.body.member_id,
        outlet_id: request.body.outlet_id,
        admin_id: request.body.admin_id,
        tgl: request.body.tgl,
        batas_waktu: request.body.batas_waktu,
        tgl_bayar: request.body.tgl_bayar,
        status: 1,
        dibayar: request.body.dibayar,
    }

    transaksi.create(newTransaksi)
    .then(result => {
        // jika insert transaksi berhasil, lanjut
        // insert data detail transaksinya
        let newIDTransaksi = result.transaksi_id

        let detail = request.body.detail_transaksi
        for (let i = 0; i < detail.length; i++) {
            // sebelumnya
            // nilai detail[i] hanya punya key id_paket
            // dan qty saja
            detail[i].transaksi_id = newIDTransaksi
        }

        // proses insert detail_transaksi
        detail_transaksi.bulkCreate(detail)
        .then(result => {
            return response.json({
                message: `Data transaksi berhasil ditambahkan`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
})

//put 
app.put("/:transaksi_id", async (req,res) => {
    // tampung data utk update ke tbl transaksi
    let dataTransaksi = {
        member_id : req.body.member_id,
        outlet_id : req.body.outlet_id,
        admin_id : req.body.admin_id,
        tgl: req.body.tgl,
        batas_waktu: req.body.batas_waktu,
        tgl_bayar: req.body.tgl_bayar,
        status: req.body.status,
        dibayar: req.body.dibayar,
    
    }
    // tampung parameter id_transaksi
    let parameter = {
        transaksi_id: req.params.transaksi_id
    }

    transaksi.update(dataTransaksi, {where: parameter})
    .then(async (result) => {
        // hapus data detail transaksi yg lama
        await detail_transaksi.destroy({where: parameter})
        
        // masukkan data detail yang baru
        let detail = req.body.detail_transaksi
        for (let i = 0; i < detail.length; i++) {
            // sebelumnya
            // nilai detail[i] hanya punya key id_paket
            // dan qty saja
            detail[i].transaksi_id = req.params.transaksi_id
        }

        // proses insert detail_transaksi
        detail_transaksi.bulkCreate(detail)
        .then(result => {
            return res.json({
                message: `Data transaksi berhasil diubah`
            })
        })
        .catch(error => {
            return res.json({
                message: error.message
            })
        })
    })
    .catch(error => {
        return res.json({
            message: error.message
        })
    })
   

})
//delete
app.delete("/:transaksi_id", (req, res) => {
    // tampung parameter id_transaksi
    let parameter = {
        transaksi_id: req.params.transaksi_id
    }

    // delete detail transaksi
    detail_transaksi.destroy({where: parameter})
    .then(result => {
        // hapus data transaksi nya
        transaksi.destroy({where: parameter})
        .then(hasil => {
            return res.json({
                message: `Data berhasil dihapus`
            })
        })
        .catch(error => {
            return res.json({
                message: error.message
            })
        })
    })
    .catch(error => {
        return res.json({
            message: error.message
        })
    })
})

// endpoint untuk mengubah status transaksi
app.post("/status/:transaksi_id", (req, res) => {
    // kita tampung nilai status
    let data = {
        status: req.body.status
    }

    // kita tampung parameter
    let parameter = {
        transaksi_id: req.params.transaksi_id
    }

    // proses update status transaksi
    transaksi.update(data, {where: parameter})
    .then(result => {
        return res.json({
            message: `Data status berhasil diubah`
        })
    })
    .catch(error => {
        return res.json({
            message: error.message
        })
    })
})

// endpoint untuk mengubah status pembayaran
app.get("/bayar/:transaksi_id", (req, res) => {
    let parameter = {
        transaksi_id: req.params.transaksi_id
    }

    let data = {
        // mendapatkan tanggal yg saat ini berjalan
        tgl_bayar: new Date().toISOString().split("T")[0],
        dibayar: true
    }

    // proses ubah transaksi
    transaksi.update(data, {where: parameter})
    .then(result => {
        return res.json({
            message: `Transaksi berhasil diubah`
        })
    })
    .catch(error => {
        return res.json({
            message: error.message
        })
    })
})

module.exports = app