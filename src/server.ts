'use strict';
import * as http from 'http';
import * as debug from 'debug';
import * as fs from 'fs';
import App from './App';
import { callServer } from "./utils/ping";
import { IConfig } from "config";
import { Logger } from "./utils/Logger";
import { generateSkyblockLeaderboard } from "./controllers/islands/BSkyblockTops";
import { SQLManager } from "./managers/SQLManager";
import { generateGlobalStats } from "./controllers/server/globalStats";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

const config: IConfig = require("config");

if (!fs.existsSync('/config/default.json') && fs.existsSync('/config/default.json.example')) {
	console.error('You forgot renaming the file .default.json.example to .default.json. Exiting now.');
	process.exit(1);
}

debug('ts-express:server');

// Load basic environment variables
const port = process.env.PORT || config.get('app.port') || 3000;
const stage = process.env.ENVIRONMENT || config.get('app.environment') || 'development';

App.set('port', port);

// Default logger
const log = Logger('app:start');

const logo = () => {
	log.info(' ');
	log.info('CraftAPI 2.0 starting...');
	log.info('');
};

const server = http.createServer(App);
server.listen(port);
logo();

if (config.get('app.environment') === "production") {
	log.info("Sentry will be activated!");
	Sentry.init({
		dsn: config.get('sentry.dsn'),
		tracesSampleRate: 0.7,
		integrations: [
			new Sentry.Integrations.Http({ tracing: true }),
		]
	});
} else {
	log.warn("Sentry is disabled due to testing version.");
}

log.info('MySQL connection starting...');
SQLManager.getInstance();
log.verbose('MySQL connection completed');

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
	log.info(`Listening on port ${bind}`);
	log.info(`App is running as ${stage.toString().toLocaleLowerCase()} environment`);
	log.info(`Home url: http://localhost:${bind}`);
	if (stage !== 'production') {
		log.warn('Press CTRL-C to stop');
	}

	setIntervalNoDelay(callServer, 10000); // 10 vteřin
	setIntervalNoDelay(generateSkyblockLeaderboard, 60000 * 60); // 1 hodina
	setIntervalNoDelay(generateGlobalStats, 60000 * 60); // 1 hodina
}
