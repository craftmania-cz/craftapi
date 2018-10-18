
import * as http from 'http';
import * as debug from 'debug';
import * as log from 'signale';
import * as config from 'config';

import App from './App';

debug('ts-express:server');

// Load basic environment variables
const port = config.get('port') || 3000;
const stage = config.get('environment') || 'develop';

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

function onListening(): void {
	let addr = server.address();
	let bind = (typeof addr === 'string') ? `pipe ${addr}` : `${addr.port}`;
	log.success(`Listening on port ${bind}`);
	log.info(`App is running as ${stage.toString().toLocaleLowerCase()} environment`);
	log.info(`Home url: http://localhost:${bind}`);
	if (stage !== 'production') {
		log.note('Press CTRL-C to stop');
	}
}
