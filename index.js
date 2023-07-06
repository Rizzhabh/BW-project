const express = require('express')
const path = require('path')
const con = require('./connection')
const app = express()
const mysql = require('mysql2')
const port = 3000
const ejs = require('ejs')



app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine' , 'ejs')



app.get('/', (req, res) => {
    res.render('pages/home.ejs')
})

app.get('/home', (req, res) => { 
    res.render('pages/home.ejs')
})


app.get('/sellitems', (req, res) => {
    res.render('pages/sellitems.ejs')
})

app.post('/sellitems', (req, res) => {
    var type = req.body.ftype
    var model = req.body.fmodel
    var add = req.body.fadd
    var price = req.body.fprice
    var mobno = req.body.fmobno
    var damaged = req.body.fno
    var negotiable = req.body.fyes1

    con.connect((err) => {
        if (err) throw err;

        var sql = "INSERT INTO sellitems(TypeOfItem,Model,Address,Price,MobileNo,Damaged,Negotiable) VALUES ('"+type+"', '"+model+"','"+add+"','"+price+"','"+mobno+"','"+damaged+"','"+negotiable+"')";
        con.query(sql, (err, result) => {
            if (err) throw err 
            res.render('pages/itemreg.ejs')
        })

    })

})

app.get('/viewitems', (req, res) => {
    const con2 = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '', 
        database: 'sell_items'
    })  
 
    con2.query("SELECT * FROM sellitems",(err,result) =>{
        res.render('pages/viewitems.ejs',{result:result});
    })
}) 

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`) 
})   