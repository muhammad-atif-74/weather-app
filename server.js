const dotenv = require('dotenv')
const express = require('express')
const axios = require('axios')

dotenv.config({ path: '.env' })

const PORT = process.env.PORT || 3000
console.log(PORT)

const app = express()
app.use(express.json())
app.use(express.static('public'))

// console.log(process.env.WEATHER_API)

app.post('/weather', (req, res) => {

    // console.log(req.body.latitude)
    // console.log(req.body.longitude)

    axios({
        method: 'get',
        url: `https://weatherapi-com.p.rapidapi.com/current.json?q=${req.body.latitude},${req.body.longitude}`,
        responseType: 'json',
        headers: {
            'X-RapidAPI-Key': '6628636acfmshfb689e43398bedcp1d7fb8jsn39c9e159d65f',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    })
        .then(response => {
            const weatherData = response.data;

            // Send the extracted data as JSON in the response
            res.json({
                data: weatherData
            });
        })
        .catch(err => {
            console.log("error: " + err)
        })
})

app.listen(PORT, () => {
    console.log("Server Started")
})
