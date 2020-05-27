import * as jwt from "jsonwebtoken";
import { IConfig } from "config";
import { getConnection } from "../../services/mysql-connection";
import * as log from "signale";

const con = getConnection();
const config: IConfig = require("config");
const bcrypt = require('bcrypt');

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
				let token = jwt.sign({username: username}, config.get('app.token'), { expiresIn: '6h', algorithm: "HS512" }); // expires in 6 hours

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

export async function checkExists(name: string): Promise<boolean> {
	return new Promise((resolve: any, reject: any) => {
		con.query("SELECT nick FROM minigames.at_table WHERE nick = '" + name + "';",
			(error: any, results: any) => {
				if (error) {
					log.error(error);
					reject(false);
				}
				if (!results.length) {
					resolve(false);
				}
				resolve(true);
			});
	});
}

async function fetchEncryptedPassword(name: string): Promise<string> {
	return new Promise((resolve: any, reject: any) => {
		con.query("SELECT craftbox_password FROM minigames.at_table WHERE nick = '" + name + "';",
			(error: any, results: any) => {
				if (error) {
					log.error(error);
					reject();
				}
				if (!results.length) {
					reject();
				}
				resolve(results[0].craftbox_password);
			});
	});
}

export default LoginGenerator;
