
import { Connection, createPool, Pool } from 'mysql';
import * as log from 'signale';
import { IConfig } from 'config';

let con: Pool;

function printErrorAndMessage(callback: any, err: any, getconnection: boolean): void {
	log.fatal('/!\\ Cannot establish a connection with the database. /!\\ (' + err.code + ')');
	log.fatal(err);
	if (getconnection) {
		callback.getConnection();
	}
}

namespace Connection {

	// Config
	const config: IConfig = require("config");

	export function getConnection(): Pool {
		// @ts-ignore
		let self = this;
		if (con) { return con; }
		con = createPool({
			connectionLimit: 10,
			multipleStatements: true,
			host: config.get('mysql.host'),
			user: config.get('mysql.username'),
			password: config.get('mysql.password'),
			database: config.get('mysql.database'),
			port: config.get('mysql.port')
		});

		con.on('error', (error: any) => {
			switch (error.code) {
				case 'PROTOCOL_CONNECTION_LOST':
					printErrorAndMessage(self, error, true);
					break;
				case 'PROTOCOL_ENQUEUE_AFTER_QUIT':
					printErrorAndMessage(self, error, true);
					break;
				case 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR':
					printErrorAndMessage(self, error, true);
					break;
				case 'PROTOCOL_ENQUEUE_HANDSHAKE_TWICE':
					printErrorAndMessage(self, error, false);
					break;
				default:
					log.fatal('/!\\ Cannot establish a connection with the database. /!\\ (' + error.code + ')');
					log.fatal(error);
					self.getConnection();
					break;
			}
		});
		return con;
	}
}

export = Connection;
