const express = require('express')
const { response } = require('express')
const app = express()
const md5 = require('md5')
app.use(express.json())

const models = require('../models/index')
const { request } = require('./member')
const users = models.users


// endpoint get
app.get('/', async (request, response) => {
    let datausers = await users.findAll()

    return response.json(datausers)
})

//endpoint post
app.post('/', (request, response) => {
    let newUsers = {
        nama: request.body.nama,
        username: request.body.username,
        password: md5(request.body.password),
        role: request.body.role
    }

    users.create(newUsers)
    .then(result => {
        response.json({
            message : 'Data berhasil ditambah'
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
})

// endpoint update/edit
/**  
app.put('/:id_user', (request, response) => {
    // tampung data yang akan diubah
    let data = {
        nama: request.body.nama,
        username: request.body.username,
        role: request.body.role
    }
    if(request.body.password){
        data.password = md5(request.body.password)
    }
    let parameter = {
        id_user: request.params.id_user
    }
    //proses update
    users.update(data, {where: parameter})
    .then(result => {
        return response.json({
            message: 'Data berhasil di edit',
            data: result
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
})
*/

//endpoint Update users
app.put("/:id_user", (request, response) =>{
    let data = {
        nama: request.body.nama,
        username: request.body.username,
        role: request.body.role
    }
    if (request.body.password) {
        data.password = md5(request.body.password)
    }
    let parameter = {
        id_user: request.params.id_user
    }

    users.update(data, {where: parameter})
    .then(results =>{
        response.json({
            message : `Data Users Berhasil diUpdate`
        })
    })
    .catch(error =>{
        response.json({
            message : error.message
        })
    })
})

// endpoint delete
app.delete("/:id_user", (request, response) => {
    let parameter= {
        id_user: request.params.id_user
    }

    //proses hapus
    users.destroy({where: parameter})
    .then(result => {
        return response.json({
            message: 'Data telah dihapus'
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
})

module.exports = app