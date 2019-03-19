const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const geoCode = require('./utils/geocodeAddress');
const weather = require('./utils/weather');

//set the port according to heroku port or if nothing use 3000
const port = process.env.PORT || 3000;

//call express in a variable
var app = express();
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPartialPath = path.join(__dirname,'../views/partial');

hbs.registerPartials(viewPartialPath);

app.set('view engine', 'hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();

    //console.log(`${now} : ${req.method}`);
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

app.use(express.static(publicDirectoryPath));

//root(home) page
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

//weather
app.get('/weather',(req,res)=>{
    console.log(req.query.address);
    if(!req.query.address){
        return res.send({
            error: "no address is supplied"
        });
    }
    geoCode.geocodeAddress(req.query.address,(err,result)=>{
        if(err){
            console.log("error getting long and lat of the address");
            return res.send({
                103: err
            });
        }else{
            console.log(result);
            weather.getWeather(result.latitude,result.longitude,(error,result)=>{
                if(error){
                    console.log("error getting weather forecast");
                    return res.send({
                        103:error
                    });
                }else{
                    console.log(result);
                    res.send({
                        address: req.query.address,
                        weather:result.current
                    });
                }
            })

        }
    })
    /*
    res.send({
        address: req.query.address
    });
    */

    
});

app.get('/bad',(req,res)=>{
    res.send({
        404: 'url not found'
    });
});

app.listen(port);
console.log(`server run at port ${port}`);