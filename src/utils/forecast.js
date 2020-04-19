const request=require('request')

const forecast=(lat,long, callback)=>{
  const url='http://api.weatherstack.com/current?access_key=bf2fec59783baa5486082f8405b99b5b&query='+lat+','+long+'&units=m'

request({url, json: true},(error,{body})=>{
    if(error){
      callback('Please check that you have a valid Connection',undefined)
    } else if (body.error){
      callback('Unable to find location',undefined)
    }
    else{
      const {weather_descriptions, temperature, feelslike, humidity}= body.current
      callback(undefined,'The weather outside looks like '+weather_descriptions[0]+'. It is currently '+temperature+' degrees out and it feels like '+feelslike+'. The current Humidity is '+humidity+'%.');
    }
  })
}
module.exports=forecast
