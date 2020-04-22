// ~/index.js
// to be run from 'Fraudtech/public/'

const fs = require('fs');
const http = require('http');
// const path = require('path');
// const mysql = require('mysql');
const url = require('url');

const errFile = "./404.html";
const errMsg = "<!DOCTYPE html><head><title>Fraudtech | 404</title></head><bo" +
	       `dy>Error 404 - file not found. <a href="./index.html">Click h` +
	       "ere</a> to be directed to the Request for enhancement form.</" + 
	       "</body></html>"
const hostname = '142.93.198.131';
const logfile = '../log/public.txt'
const port = 5000;

var currDateTime = new Date(Date.now());
var timestamp = '';

/**
 * Stream-based HTTP server function
 *
 *const server = http.createServer((req, res) => {
 *	const filename = 'index.html';
 *	const filepath = path.join('/', rootdir, filename);
 *	const stream = fs.createReadStream(filepath);
 *	stream.pipe(res);
 *	console.log(`Server attempting to serve file '${filename}'`);
 *})
 */



/**
 * File-based HTTP server function
 */

const server = http.createServer((req, res) => {
 	appendLogs(req.rawHeaders);
	const myUrl = new url.URL(req.url, `http://${req.headers.host}`);
	var filename = '.' + myUrl.pathname;
	if (filename == './') filename = './index.html';
	fs.readFile(filename, function(err, data) {
		if (err) {
			appendLogs(`File, '${filename}', requested - Serving file, '${errFile}'`);
			fs.readFile(errFile, function(er, dat) {
				res.writeHead(404, {'Content-Type': 'text/html'});
				if (er){
					appendLogs('File, ' + errFile + ', requested - Serving generic 404 message'); 
					res.write(errMsg);
					res.end();
				}
				else {
					res.write(dat);
					res.end();
				}
			});
		}
		else {
			appendLogs(`Serving file, '${filename}'`);
//			const stream = fs.createReadStream(filename);
//			stream.pipe(res);
//			res.writeHead(200, {'Content-Type' : req.getHeader('Content-Type')}); 	
			res.write(data);
			res.end();
		}
	});
});




/**
 * Initiate server listening
 */

server.listen(port, hostname, () => {
	appendLogs(`Application server initiated, accessible via http://${hostname}:${port}/`);
});




/**
 * Append line to console and logfile
 */

function appendLogs (ln){
	currDateTime.setTime(Date.now());
	timestamp = '[' + currDateTime.toString() + '] ';
	console.log(timestamp + ln);
	fs.appendFile(logfile, timestamp + ln, function (err) {
		if (err) {
			console.log(timestamp + 'An error was encountered while attempting to append a line to the log file located at: \'' + logfile + '\'\n');
		}
	});
}
