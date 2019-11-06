var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);



app.get('/', function(req, res){
 res.render('home');
});
app.get('/listacibi', function(req, res){
 res.render('listacibi');
});
app.get('/impostazioni', function(req, res){
 res.render('impostazioni');
});
app.get('/manuale', function(req, res){
 res.render('manuale');
});
app.get('/info', function(req, res){
 res.render('info');
});

app.get('/favicon', function(req, res){
 res.render('favicon');
});


// set up handlebars view engine
var handlebars = require('express3-handlebars')
 .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Per mettere più al sicuro il sito
//Con questo non verranno inviate delle informazioni al client
app.disable('x-powered-by');

// Per i file statici es Css , javascript lati client
app.use(express.static(__dirname + '/public'));

// custom 404 page
app.use(function(req, res){
 res.status(404).render('404');
});






//Underground API TEST DEL METEO CHE AL CAPITOLO 19
//verrà spiegato per bene perchè qua è inserito da me

function getWeatherData(){
 return {
 locations: [
 {
 name: 'Portland',
 forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
 iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
 weather: 'Overcast',
 temp: '54.1 F (12.3 C)',
 },
 {
 name: 'Bend',
 forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
 iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
 weather: 'Partly Cloudy',
 temp: '55.0 F (12.8 C)',
 },
 {
 name: 'Manzanita',
 forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
 iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
 weather: 'Light Rain',
 temp: '55.0 F (12.8 C)',
 },
 ],
 };
}



// middleware to add weather data to context
app.use(function(req, res, next){
 if(!res.locals.partials) res.locals.partials = {};
   res.locals.partials.weatherContext = getWeatherData();
   next();
});




// custom 500 page
app.get(function(err, req, res, next){
 console.error(err.stack);
 res.status(500).render('500');
});

app.listen(app.get('port'), function(){
 console.log( 'Express started on http://localhost:' +
 app.get('port') + '; press Ctrl-C to terminate.' );
});
