const request = require('request');

const geocode = (address,callback) =>{
    //console.log('Inside Geocode '+address+' passed')
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoidmlja3kwNiIsImEiOiJjazE5MXVuZjExczY3M21weW02NGc2bHdxIn0.rgvhSgRqeAMAgLxrse90ig'
    //console.log(url)
    request({url: url,json : true},(error, response)=>
    { //console.log('inside request')
      if(error){
        //console.log('Error 1')
        callback('Unable to connect ')
      }
      else if(response.body.features.length  === 0 )
      {
        console.log('Error 2')
        callback('No data found',undefined,'here') 
      }
      
      else{
       
        console.log('FOund me')
        // const Latcords = (JSON.parse(response.body).features[0].center[1])
        //   const Loncords = (JSON.parse(response.body).features[0].center[0])
        //   console.log('Latitude', Latcords)
        //   console.log('Longitude',Loncords)
          callback(undefined,{
            latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0],
            location: response.body.features[0].place_name
          })
      }
  
    })
  }



  module.exports = geocode