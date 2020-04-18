const request=require('request')

const geocode=(address,callback)=>{

  const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibGFhbHNoYWl0YWFuIiwiYSI6ImNrOTE4d3Z2dDAwbGQzbW8xYzljeGF2cm0ifQ.I1QqmHynva8ng26O4cfcYw&limit=1'

  request({url, json: true}, (error,{body})=>{

    if(error){
      callback('Unable to connect to the network', undefined)
    } else if (body.features.length===0){

      callback('Unable to find the location. Try another search', undefined)
    } else {
      const {center,place_name}=body.features[0]
        callback(undefined, {

      lattitude: center[1],
      longitude: center[0],
      location: place_name
    })
    }
  })
}

module.exports=geocode
