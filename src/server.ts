'use strict';
import * as http from 'http';
import * as debug from 'debug';
import * as fs from 'fs';
import * as log from 'signale';
import App from './App';
import { callServer } from "./utils/ping";
import { IConfig } from "config";

const config: IConfig = require("config");
const Bearer = require('@bearer/node-agent');

if (!fs.existsSync('/config/default.json') && fs.existsSync('/config/default.json.example')) {
	log.fatal('You forgot renaming the file .default.json.example to .default.json. Exiting now.');
	process.exit(1);
}

debug('ts-express:server');

// Load basic environment variables
const port = process.env.PORT || config.get('app.port') || 3000;
const stage = process.env.ENVIRONMENT || config.get('app.environment') || 'development';
const bearerAppToken = process.env.BEARER_APP_TOKEN || config.get('bearerApp.token') || '';

App.set('port', port);

const logo = () => {
	console.log(' ');
	console.log('CraftAPI 2.0 starting...');
	console.log('');
};

const server = http.createServer(App);
server.listen(port);
logo();
server.on('error', onError);
server.on('listening', onListening);

function onError(error: NodeJS.ErrnoException): void {
	if (error.syscall !== 'listen') {
		throw error;
	}
	let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
	switch (error.code) {
		case 'EACCES':
			log.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			log.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}

let setIntervalNoDelay = function(func: any , delay: any) {
	let task = setInterval(func, delay);
	func();
	return task;
};

function onListening(): void {
	let addr = server.address();
	let bind = (typeof addr === 'string') ? `pipe ${addr}` : `${addr.port}`;
	log.success(`Listening on port ${bind}`);
	log.info(`App is running as ${stage.toString().toLocaleLowerCase()} environment`);
	log.info(`Home url: http://localhost:${bind}`);
	if (stage !== 'production') {
		log.note('Press CTRL-C to stop');
	}

	if (config.get("bearerApp.enabled")) {
		Bearer.init({
			secretKey: bearerAppToken,
			stripSensitiveData: true
		}).then(() => {
			log.info('BearerApp has been enabled!');
		});
	}

	setIntervalNoDelay(callServer, 10000);
}
