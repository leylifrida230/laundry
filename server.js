const express = require("express")
const app = express()

// panggil router member
const member = require('./routers/member')
const paket = require('./routers/paket')

app.use('/member', member)
app.use('/paket/', paket)

app.listen(8000, () => {
    console.log('Server run on port 8000')
})