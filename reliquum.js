var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

// link API into pipeline
// currently commented out to reduce console noise
//app.use(vhost('api.*', rest.rester(apiOptions)));










//Error problem
//Senza questa parte di codice il sito funziona senza autenticazione

















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
app.get('/jquery-test', function(req, res){
 res.render('jquery-test');
});
app.get('/favicon', function(req, res){
 res.render('favicon');
});
app.get('/nursery-rhyme', function(req, res){
	res.render('nursery-rhyme');
});
app.get('/ringraziamento', function(req, res){
	res.render('ringraziamento');
});

app.get('/data/nursery-rhyme', function(req, res){
	res.json({
		animal: 'squirrel',
		bodyPart: 'tail',
		adjective: 'bushy',
		noun: 'heck',
	});
});


// middleware to add weather data to context
app.use(function(req, res, next){
 if(!res.locals.partials) res.locals.partials = {};
   res.locals.partials.weatherContext = getWeatherData();
   next();
});

app.use(require('body-parser')());


app.use(require('body-parser')());
app.get('/newsletter', function(req, res){
 // we will learn about CSRF later...for now, we just
 // provide a dummy value
 res.render('newsletter', { csrf: 'CSRF token goes here' });
});
app.post('/process', function(req, res){
 console.log('Form (from querystring): ' + req.query.form);
 console.log('CSRF token (from hidden form field): ' + req.body._csrf);
 console.log('Name (from visible form field): ' + req.body.name);
 console.log('Email (from visible form field): ' + req.body.email);
 res.redirect(303, '/ringraziamento');
});






// set up handlebars view engine
var handlebars = require('express3-handlebars').create({
 defaultLayout:'main',
 helpers: {
 section: function(name, options){
 if(!this._sections) this._sections = {};
 this._sections[name] = options.fn(this);
 return null;
 }
 }
});

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



app.get('/account', function(req, res){
 if(!req.session.passport.user)
 return res.redirect(303, '/unauthorized');
 res.render('account');
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
