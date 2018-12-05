
import { Connection, createPool, Pool } from 'mysql';
import * as log from 'signale';
require('dotenv').config();

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
			multipleStatements: true,
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_DATABASE,
			port: 3306
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
