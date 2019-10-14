console.log('client side java scrips file loaded')
const weather = document.querySelector('form')
const address = (document.querySelector('input').value)
const msg1= document.querySelector('#message1')
const msg2= document.querySelector('#message2')



weather.addEventListener('submit',(e)=>
{ 
    e.preventDefault()
    const address = (document.querySelector('input').value)
    

    msg1.textContent = 'Loading...'
    msg2.textContent = ''
 console.log('entry : ',address )  
 if (isNaN(address)){
    fetch('http://localhost:3000/weather?address='+address).then((response)=>{
    response.json().then((data)=>{
        console.log('web-server:public: js:app.js---fetching from API ')
    if (data.error){
        console.log('error')
        msg1.textContent='We can not find anything for '+ address+' .Please retry'
    }
    else{
        console.log('i have received'+data.tempreature )
        msg1.textContent='Temperature '+data.tempreature 
        msg2.textContent= 'Address '+address

           
    }
    })})
    }
    else{
        console.log('error : Input issue string not found')
    }
 
})