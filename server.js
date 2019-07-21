const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = '712d10f254a02367f8264c5e7554a929'

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
    res.render("index", { weather: null, error: null});
});

app.post("/", function(req, res){
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    request(url, function(err, response, body) {
        if(err) {
            res.render('index', { weather: null, error: "Deu erro na api" });
        } else {
            let weather = JSON.parse(body);

            if(weather.main == undefined) {
                res.render('index', { weather: null, error: "Deu erro na api" });
            } else {
                let text = `A temperatura é ${weather.main.temp} graus em ${weather.name}`
                res.render('index', {weather: text, error: null });
            }
        }
    });
});

app.listen(3000, function() {
    console.log("Servidor iniciado...");
})