const request = require(`request`);

 var geocodeAddress = (address,callback)=>{
    request({
        url: `https://open.mapquestapi.com/geocoding/v1/address?key=eLi5YYIO3pKAEx7m0pMusnxRkAUIgCfb&location=${address}`,
        json: true
    }, (error,response,body)=>{
        if(error){
            callback('unable to connect to server');
        } else if(!body.results[0].locations[0].adminArea5){
            callback('address not found');
        } else{
            callback( undefined, {
                address: body.results[0].providedLocation.location + body.results[0].locations[0].postalCode + body.results[0].locations[0].adminArea4 + body.results[0].locations[0].adminArea5,
                latitude: body.results[0].locations[0].displayLatLng.lat,
                longitude: body.results[0].locations[0].displayLatLng.lng
            })
        }
    });
}

module.exports = {
    geocodeAddress
}

