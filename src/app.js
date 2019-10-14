const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('../../weather-app/utils/geocode')
const forecast = require('../../weather-app/utils/forecast')
const app = express()
const partialsPath =path.join(__dirname,'../tempelates/partials')
//console.log(__dirname)
//console.log(path.join(__dirname,'../tempelates/views'))
app.set('view engine','hbs') 
app.set('views',path.join(__dirname,'../tempelates/views'))//handleBars
hbs.registerPartials(partialsPath)
app.use(express.static(path.join(__dirname,'../public')))


//console.log(partialsPath)



app.get('',(req,res)=>
{
    res.render('index',{
        title: 'WEATHER APP TITLE',
        ending : 'Home Ending',
        name : 'Vicky'

    })
})

app.get('/about',(req,res)=>
{
    res.render('about',{
        title: 'WEATHER APP About',
        name: 'about',
        ending : 'About Ending',
    })
})

app.get('/weather',(req,res)=>
{
    if(!req.query.address){
        return res.send({
            error: 'Please provde your address'
        })}
        console.log(req.query.address)
        address = req.query.address 
        
        geocode(address,(error, data)=>{
            if (error){
                console.log('web-server:src:app.js:geocode calling')
                console.log(error)
                res.send({
                    error: error
                })
               
            }
           // console.log('error',error)
            //console.log(data)
            //console.log('data')
            
            forecast(data, (error,data)=>{
                console.log('Trying to forecast : step1')
                if (error){
                    
                    console.log(error)
                    console.log(error)
                    return error
                }
              console.log(address,':', data.tempreature)
              res.send({
                address : req.query.address ,
                tempreature : data.tempreature
            })
            
              
            })
          })
         // tempreature = data.tempreature
        
    }
    
)

app.get('/products',(req,res)=>
{  if(!req.query.search){

    return  res.send({
        error: 'Provide a search Term'
    })
}

    
     console.log(req.query.search)
  
    res.send({
        products: req.query.search
    })
})
app.get('*',(req,res)=>
{
    res.send("404")
})





app.listen(3000,()=>
{
    console.log("3000 is up")
})