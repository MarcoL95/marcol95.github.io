import express from 'express';
import hackerQuotes from "hacker-quotes";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {

    // get all quotes
    let quotes = hackerQuotes;

    // pick a random one
    let randomIndex = Math.floor(Math.random() * quotes.length);
    let randomQuote = quotes[randomIndex];
    console.log(randomQuote);

    let url = "https://pixabay.com/api/?key=55253803-a95686a4db1139d542d0bcba8&q=software_development&image_type=photo";
    let response = await fetch(url);
    let data = await response.json();

    let images = data.hits;

    let randomImageIndex = Math.floor(Math.random() * images.length);

    let randomImage = images[randomImageIndex];

    console.log(randomImage);

    res.render("index", {
        quote: randomQuote,
        image: randomImage
});
});

app.get('/waterfall', (req, res) => {
    res.render('waterfall');
});

app.get('/agile', (req, res) => {
    res.render('agile');

});

app.get('/spiral', (req, res) => {
    res.render('spiral');
});

app.get('/rad', (req, res) => {
    res.render('rad');
});


app.listen(3000, () => {
   console.log('server started');
});

