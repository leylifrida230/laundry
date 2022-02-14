const {request, response} = require('express')
const express = require('express')
const app = express()
app.use(express.json())

// panggil models
const models = require('../models/index')
const member = require('../models/member')

// panggil model paket
const paket = models.paket

// panggil fungsi auth -> validasi token
const {auth} = require("./login")

// fungsi auth di jadikan middleware
// app.use(auth)

// end point get 
app.get('/', async (request, response) => {
    let datapaket = await paket.findAll()

    return response.json(datapaket)
})

// endpoint post paket
app.post('/', (request, response) => {
    let newPaket = {
        jenis_paket: request.body.jenis_paket,
        harga: request.body.harga
    }

    paket.create(newPaket)
    .then(result => {
        response.json({
            message: 'Data berhasil di tambahkan'
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
})

// endpoint update data paket
app.put('/:id_paket', (request, response) => {
    let data = {
        jenis_paket: request.body.jenis_paket,
        harga: request.body.harga
    }

    let parameter = {
        id_paket: request.params.id_paket
    }

    //proses update
    paket.update(data, {where: parameter})
    .then(result => {
        return response.json({
            message: 'Data berhasil di ubah',
            data: result 
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
})

// endpoint hapus data paket
app.delete('/:id_paket', (request, response) => {
    // tampung data yang akan di hapus
    let parameter = {
        id_paket: request.params.id_paket
    }

    // proses hapus
    paket.destroy({where: parameter})
    .then(result => {
        return response.json({
            message : 'Data Berhasil dihapus',
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
})

module.exports = app