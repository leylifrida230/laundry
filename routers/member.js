const { request, response } = require('express')
const express = require('express')
const app = express()

//membaca request dari body dengan tipe json
app.use(express.json())

// panggil models
const models = require('../models/index')

// panggil model member
const member = models.member

// panggil fungsi auth -> validasi token
const {auth} = require("./login")

// fungsi auth di jadikan middleware
// app.use(auth)

// end point for get all member
app.get("/", async (request, response) => {
    let datamember = await member.findAll()

    return response.json(datamember)
})

// end point add new member
app.post('/', (request, response) => {
    let newMember = {
        nama: request.body.nama,
        alamat: request.body.alamat,
        jenis_kelamin: request.body.jenis_kelamin,
        telepon: request.body.telepon
    }

    member.create(newMember)
    .then(result => {
        response.json({
            message : 'Data Berhasil Ditambahkan'
        })
    })
    .catch(error => {
        response.json({
            message : error.message
        })
    })
})

// endpoint update data member
app.put('/:id_member', (request, response) => {
    // tampung data yang akan di ubah
    let data = {
        nama: request.body.nama,
        alamat: request.body.alamat,
        telepon: request.body.telepon,
        jenis_kelamin: request.body.jenis_kelamin
    }

    let parameter = {
        id_member: request.params.id_member
    }

    // proses update
    member.update(data, {where: parameter})
    .then(result => {
        return response.json({
            message: 'Data berhasil di ubah',
            data: result 
        })
    })
    .catch(error => {
        return response.json({
            message: error.message,
            parameter: 'error'
        })
    })
})

// endpoint hapus data member
app.delete('/:id_member', (request, response) => {
    // tampung data yang akan di hapus
    let parameter = {
        id_member: request.params.id_member
    }

    // proses hapus
    member.destroy({where: parameter})
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