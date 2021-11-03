const express = require('express')
const login = express()
login.use(express.json())
const md5 = require('md5')
const jwt = require("jsonwebtoken")
const secretkey = "KIMKAI"

const models = require('../models/index')
const users = models.users

login.post('/', async (request, response) => {
    let newLogin = {
        username: request.body.username,
        password: md5(request.body.password)
    } //anjrit malah error makasi bu
    
    // user yang ini manggil user di line 7
    let dataUser = await users.findOne({
        where : newLogin
    })

    if(dataUser){
        let payload = JSON.stringify(dataUser)
        let token = jwt.sign(payload,secretkey)
        return response.json({
            logged : true,
            token : token
        })
    } else {
        return response.json({
            logged: false,
            message: `invalid username or password`
        })
    }
})

// fungsi auth digunakan untuk verivikasi token yang dikirimkan
const auth = (request, response, next) => {
    // kita dapatkan data authorization
    let header = request.headers.authorization
    // header = Bearer jkbfoweiopfjlkejqipdjqeipfjwkknrwjf
    
    // kita ambil data tokennya
    let token = header && header.split(" ")[1]

    if(token == null){
        // jika tokennya null
        return response.status(401).json({
            message : `unauthorized`
        })
    }else{
        let jwtHeader = {
            algorithm: "HS256"
        }

        // verivikasi token yang diberikan
        jwt.verify(token, secretkey, jwtHeader, error => {
            if(error){
                return response.status(401).json({
                    message: `invalid token`
                })
            } else {
                next()
            }
        })
    }
}

module.exports = {login, auth}