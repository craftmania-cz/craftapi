import { checkExists } from "./LoginGenerator";
import { IConfig } from "config";
import { getConnection } from "../../services/mysql-connection";
import * as log from "signale";

const con = getConnection();
const config: IConfig = require("config");
const bcrypt = require('bcrypt');

class RegisterGenerator {

	public async register(req: any, res: any) {
		const username = req.body.username;
		const password = req.body.password;
		const adminKey = req.body.adminKey;

		if (adminKey) {

			if (!(adminKey === config.get("app.adminKey"))) {
				res.json({
					success: false,
					message: 'Adminkey se neshoduje s server AdminKey!'
				});
				return;
			}

			if (username && password) {
				let exists = await checkExists(username);
				if (!exists) {
					res.json({
						success: false,
						message: 'Neznámé uživatelské jméno!'
					});
					return;
				}

				let cryptPassword = await bcrypt.hash(password, 10);

				await setupPassword(username, cryptPassword).then(() => {
					res.json({
						success: true,
						message: 'Heslo bylo úspěšně nastaveno!'
					});
				}).catch(() => {
					res.json({
						success: false,
						message: 'Update hesla selhal v API! Zkus to zachvilku!'
					});
				});

			} else {
				res.json({
					success: false,
					message: 'Neplatně zadané argumenty username nebo password!'
				});
			}
		} else {
			res.json({
				success: false,
				message: 'Adminkey chybí v requestu!'
			});
		}
	}
}

async function setupPassword (username: string, password: string): Promise<void> {
	return new Promise((resolve: any, reject: any) => {
		con.query("UPDATE minigames.at_table SET craftbox_password = '" + password + "' WHERE nick = '" + username + "';",
			(error: any, results: any) => {
				if (error) {
					log.error(error);
					reject();
				}
				resolve(results);
			});
	});
}

export default RegisterGenerator;
