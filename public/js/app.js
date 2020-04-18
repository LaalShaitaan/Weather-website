console.log('Client side javascript is loaded')

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

messageOne.textContent='From Javascript'
messageTwo.textContent=''


weatherForm.addEventListener('submit',(event)=>{
  event.preventDefault()
  const location = search.value;

  messageOne.textContent='Loading'
  messageTwo.textContent='Please Wait'

  fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{

      if(data.error){
        messageOne.textContent=data.error
        messageTwo.textContent='Please try again'

      } else{
        messageOne.textContent=(data.location)
        messageTwo.textContent=(data.forecast)
      }
    })
  })
})
