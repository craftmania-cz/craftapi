import * as jwt from "jsonwebtoken";
import { IConfig } from "config";
import * as log from "signale";
import { SQLManager } from "../../managers/SQLManager";
import RankList from "../RankList";

const config: IConfig = require("config");
const bcrypt = require('bcryptjs');

class LoginGenerator {

	public async login (req: any, res: any) {
		let username = req.body.username;
		let password = req.body.password;

		if (username && password) {

			// Check pokud user exisuje
			let exists = await checkExists(username);
			if (!exists) {
				res.json({
					success: false,
					message: 'Neznámé uživatelské jméno!'
				});
				return;
			}

			// Fetch hesla z databáze
			const encryptedPassword = await fetchEncryptedPassword(username);
			if (encryptedPassword === null) {
				res.json({
					success: false,
					message: 'Uživatel nemá nastavené žádné heslo!'
				});
				return;
			}

			// Bcrypt kontrola
			const validPassword = await bcrypt.compare(password, encryptedPassword);

			if (validPassword) {
				// Fetch permisions
				const sqlRole = await fetchUserRole(username);

				let token = jwt.sign({username: username, role: sqlRole},
					config.get('app.token'), { expiresIn: '6h', algorithm: "HS512" }); // expires in 6 hours

				// return the JWT token for the future API calls
				res.json({
					success: true,
					message: 'Přihlášení bylo úspěšné!',
					token: token
				});
			} else {
				res.json({
					success: false,
					message: 'Nesprávně zadané heslo!'
				});
			}
		} else {
			res.json({
				success: false,
				message: 'Nezadal(a) jsi jméno nebo heslo!'
			});
		}
	}
}

export async function checkExists(name: string): Promise<boolean> { //TODO: Check
	return new Promise(async (resolve: any, reject: any) => {
		const data = await SQLManager.knex.select("nick").from("minigames.at_table").where("nick", name)
			.on('query-error', (error: any) => {
				log.error(error);
				reject(false);
			});
		if (!data.length) {
			resolve(false);
		}
		resolve(true);
	});
}

async function fetchEncryptedPassword(name: string): Promise<string> {
	return new Promise(async (resolve: any, reject: any) => {
		const data = await SQLManager.knex.select("craftbox_password").from("minigames.at_table").where("nick", name)
			.on('query-error', (error: any) => {
				log.error(error);
				reject();
			});
		if (!data.length) {
			reject();
		}
		resolve(data[0].craftbox_password);
	});
}

async function fetchUserPermissions(name: string): Promise<any> {
	return new Promise(async (resolve: any, reject: any) => {
		const data = await SQLManager.knex.select("craftbox_perms").from("minigames.at_table").where("nick", name)
			.on('query-error', (error: any) => {
				log.error(error);
				reject();
			});
		if (!data.length) {
			reject();
		}
		resolve(JSON.parse(data[0].craftbox_perms));
	});
}

async function fetchUserRole(name: string): Promise<string> {
	return new Promise(async (resolve: any, reject: any) => {
		const data = await SQLManager.knex.select("rank").from("minigames.at_table").where("nick", name)
			.on('query-error', (error: any) => {
				log.error(error);
				reject();
			});
		if (!data.length) {
			reject();
		}
		const rankNumber = data[0].rank;
		const rankAsString = new RankList(rankNumber).getRankAsRole();
		resolve(rankAsString);
	});
}

export default LoginGenerator;
