import * as Knex from 'knex';
import { IConfig } from "config";

export class SQLManager {
	public static knex: Knex;

	private static i: SQLManager;

	public static getInstance(): SQLManager {
		if (!SQLManager.i) {
			SQLManager.i = new SQLManager();
		}

		return SQLManager.i;
	}

	constructor() {
		const config: IConfig = require("config");
		SQLManager.knex = Knex({
			client: 'mysql2',
			connection: {
				host: config.get('mysql.host'),
				user: config.get('mysql.username'),
				password: config.get('mysql.password'),
				database: config.get('mysql.database'),
				port: config.get('mysql.port'),
			},
			pool: {
				min: 1,
				max: 10,
			},
		});
		this.setup();
	}

	public async setup() {
		await SQLManager.knex.raw('SET NAMES utf8');
	}
}
