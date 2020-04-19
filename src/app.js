const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app=express();

const port=process.env.PORT || 3000

const Path=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')



app.set('views',viewsPath)


app.use(express.static(Path))
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)


app.get('',(req,res)=>{
  res.render('index',{
    title: 'Weather',
    name: 'Shubham'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title: 'About me',
    name: 'Shubham'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    Helptext: 'This is some helpful text',
    title: 'Help',
    name: 'Shubham'
  })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error: 'Enter a location'
    })
  }

  geocode(req.query.address,(error,{lattitude,longitude, location}={})=>{
    if(error){
      return res.send({error})
    }

    forecast(lattitude,longitude,(error,forecastData)=>{
      if(error){
        res.send(error)
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})


app.get('/products',(req,res)=>{
  if (!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    })
  }
  res.send({
    products: []
  })
})


app.get('/help/*',(req,res)=>{
  res.render('404',{
    title: '404',
    ErrorMessage: 'Help Subpage not found',
    name: 'Shubham'
  })
})


app.get('/*',(req,res)=>{
  res.render('404',{
    title: '404',
    ErrorMessage: 'Page not found',
    name: 'Shubham'
  })
})



app.listen(port)
