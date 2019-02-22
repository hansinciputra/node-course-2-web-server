const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//call express in a variable
var app = express();

hbs.registerPartials(__dirname + '/views/partial');

app.set('view engine', 'hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();

    console.log(`${now} :`);
    fs.appendFile('log.log',`${now} :${req.method} ${req.url}`+ `\n`, (err)=>{
        if(err){
            console.log("error, unable to append to server");
        }
    });
    next();
});

//maintenance code
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        wellcomeMSG: 'Welcome to this site',
        currentYear: new Date().getFullYear()
    });
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
        msg:'wellcome to about page',
        currentYear: new Date().getFullYear()
    });
})

app.get('/bad',(req,res)=>{
    res.send({
        404: 'url not found'
    });
});

app.listen(3000);
console.log("server run at port 3000");