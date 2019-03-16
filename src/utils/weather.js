const request = require('request');

var getWeather = (lat,long,callback) =>{
    request({
        url: `https://api.darksky.net/forecast/79a4a61a6c8ef3a2eadd1de594042859/${lat},${long}`,
        json: true
    },(error,response,body)=>{
        if(error){
            callback('unable to connect to weather API server');
            //console.log('unable to connect to weather API server')
        }else if (response.statusCode === 200){     
            const result = {
                current: body.currently.temperature,
                feelsLike: body.currently.apparentTemperature
            }
            callback(undefined,result);
        }else{
            callback('location not found');
            //console.log('location not found');
        }
    });
}
    

module.exports = {
    getWeather
}