var express = require('express');
var app = express();
var logger = require('./helpers/logger');
var config = require('config');
var bodyParser = require('body-parser');
var yaml = require('js-yaml');
var fs = require('fs');

// body parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// add-on swagger-editor
app.use('/swagger', express.static('./node_modules/swagger-editor'));
app.use('/', express.static('./docs'));
app.get('/docs', function(req, res){
    var docs = yaml.safeLoad(fs.readFileSync('./docs/swagger.yml', 'utf8'));
    res.send(JSON.stringify(docs));
});

// import routers
app.use(require('./apis'));

app.get('/hello', function(req, res) {
	res.send(JSON.stringify({'Hello': 'world'}));
});

var server = app.listen(config.get('server.port'), config.get('server.host'), function() {
	var host = server.address().address;
	var port = server.address().port;
	logger.info('Server start at http://%s:%s', config.get('server.host'), config.get('server.port'));
});