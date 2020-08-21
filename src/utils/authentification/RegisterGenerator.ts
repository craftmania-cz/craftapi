import { checkExists } from "./LoginGenerator";
import { IConfig } from "config";
import * as log from "signale";
import { SQLManager } from "../../managers/SQLManager";

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
		const data = SQLManager.knex("minigames.at_table").update("craftbox_password", password).where("nick", username)
			.on('query-error', (error: any) => {
				log.error(error);
				reject();
			});
		resolve(data);
	});
}

export default RegisterGenerator;
