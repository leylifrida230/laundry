const {request, response} = require('express')
const express = require('express')
const app = express()

app.use(express.json())

const models = require('../models/index')
const transaksi = models.transaksi
const detail_transaksi = models.detail_transaksi

// endpoint new transaksi
app.post('/', (request, response) => {
    let newTransaksi = {
        id_member : request.body.id_member,
        tgl : request.body.tgl,
        batas_waktu : request.body.batas_waktu,
        tgl_bayar : request.body.tgl_bayar,
        status : 1,
        dibayar : request.body.dibayar,
        id_user : request.body.id_user
    }

    transaksi.create(newTransaksi)
    .then(result => {
        //jika insert transaksi berhasil, lanjut
        // insert data detail transaksinya
        let newIDTransaksi = result.id_transaksi 

        let detail = request.body.detail_transaksi
        for (let i = 0; i < detail.length; i++) {
            // sebelumnya
            // nilai detail [i] hanya punya key id_paket
            // dan qty saja
            detail[i].id_transaksi = newIDTransaksi
            
        }
        // proses insert setail transaksi
        detail_transaksi.bulkCreate(detail)
        .then(result => {
            return response.json({
                message: 'data transaksi berhasil ditambahkan'
            })
        })
        .catch(error => {
            return response.json({
                message : error.message
            })
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
    
})

module.exports = app