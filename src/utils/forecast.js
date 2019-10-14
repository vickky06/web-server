const request = require('request');

const forecast = (data,callback)=>{
    
    //console.log(data)
    lat = data.latitude
    lon = data.longitude
    dd = lat+','+lon
    
    const url = 'https://api.darksky.net/forecast/adbd0172fe4e65c30b038d09f9e0f828/'+encodeURIComponent(dd)+'?units=si'
    //console.log(url)
    request({url: url,json : true},(error, response)=>{
        //console.log('forecasting')

        if(error){
            console.log('Error 1')
            callback('Unable to connect ')
          }
          else if(response.body.currently.temperature.length  === 0 )
          {
            console.log('Error 2 :web-server:src:forecast')
           callback('No data found',undefined,'here') 
          }
          else {

            console.log('No error' ,response.body.currently.temperature)
            callback(undefined,{
                tempreature: response.body.currently.temperature


            })
          }
    })

}


module.exports = forecast