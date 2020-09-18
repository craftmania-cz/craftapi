import * as Res from "../../services/response";
import * as log from "signale";
import TokenAuth from "../../utils/authentification/tokenAuth";
import { SQLManager } from "../../managers/SQLManager";
import * as jwt from "jsonwebtoken";
import { IConfig } from "config";

const config: IConfig = require("config");

namespace Permissions {

	export async function getAccountPermissions(req: any, res: any) {
		const perms = await TokenAuth.checkPerms(req, ["CRAFTBOX:MANAGER", "CRAFTBOX:GET_PERMISSIONS"]);
		if (!perms) { return Res.noPerms(res); }

		const player = req.params.name;

		const data = await SQLManager.knex.select("craftbox_perms")
			.from("minigames.at_table").where("nick", player)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		Res.success(res, JSON.parse(data[0].craftbox_perms));
		return;
	}

	export async function checkIfTokensIsValid(req: any, res: any) {

		const token = req.body.token;

		if (token) {
			// @ts-ignore
			jwt.verify(token, config.get('app.token'), (err: any, decoded: object | string) => {
				if (err) {
					return res.status(401).json({
						status: 401,
						success: false,
						message: 'Token je neplatný'
					});
				} else {
					return res.status(200).json({
						status: 200,
						success: true,
						messaage: 'Token je platný.'
					});
				}
			});
		} else {
			return Res.bad_request(res, "Nezadal jsi token do těla requestu!");
		}

	}
}

export default Permissions;
