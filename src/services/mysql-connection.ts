import config = require('../../config-rewrapper');
import { Connection, createPool, Pool } from 'mysql';
import * as log from 'signale';

let con: Pool;

function printErrorAndMessage(callback: any, err: any, getconnection: boolean): void {
	log.fatal('/!\\ Cannot establish a connection with the database. /!\\ (' + err.code + ')');
	log.fatal(err);
	if (getconnection) {
		callback.getConnection();
	}
}

namespace Connection {
	export function getConnection(): Pool {
		// @ts-ignore
		let self = this;
		if (con) { return con; }
		con = createPool({
			connectionLimit: 10,
			host: config.mysql.host,
			user: config.mysql.user,
			password: config.mysql.password,
			database: config.mysql.database
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
