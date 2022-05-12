//import
const express = require('express');
const cors = require('cors');
 
//implementasi
const app = express();
app.use(cors());
 
//endpoint admin
const admin = require('./routes/admin');
app.use("/admin", admin)
 
//endpoint member
const member = require('./routes/member');
app.use("/member", member)

//endpoint paket
const paket = require('./routes/paket');
app.use("/paket", paket)

//endpoint paket
const outlet = require('./routes/outlet');
app.use("/outlet", outlet)

//endpoint transaksi
const transaksi = require('./routes/transaksi');
app.use("/transaksi", transaksi)


//run server
app.listen(8080, () => {
    console.log('server run on port 8080')
})
