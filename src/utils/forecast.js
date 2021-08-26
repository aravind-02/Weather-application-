const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=c5f36bb684b94644e03e58c185f06560&query=' + latitude + ',' + longitude + '&units=m'
    request({url,json:true},(error,{body }={})=>{
        if(error){
            callback('unable to connect to weather stack',undefined)
        }else if(body.error){
            callback('coordinates are invalid',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions+ ". The current temperature is "+ body.current.temperature + ' degrees and it feels like ' +body.current.feelslike +' degree with humidity of '+ body.current.humidity +'%')
        }
    })
}
module.exports = forecast