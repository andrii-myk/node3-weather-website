console.log('Client side javascript file is loaded!')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?adress=' + location.trim()).then(
    (res) => {
        res.json().then((data) => {
            if (data.error){
                console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    }
)
})