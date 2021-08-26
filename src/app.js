const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()

//Define paths for express config
const publicdirectory = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setup static directory
app.use(express.static(publicdirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Aravind'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Aravind'
    })
})
app.get('/help',(req,res)=>{
   res.render('help',{
      title:'Help page',
      helptext:'This page can get you the help you need',
      name:'Aravind'  
})
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide the address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastdata)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forecastdata,
            location,
            address:req.query.address
        })
    })
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404-page',{
        title:'404',
        errormsg:'help article not found',
        name:'Aravind'
    })
})

app.get('*',(req,res)=>{
   res.render('404-page',{
       title:'Weather app',
       errormsg:'Page not found',
       name:'Aravind'
   })
})
app.listen(3000,()=>{
    console.log('server is running on port 3000 ')
})