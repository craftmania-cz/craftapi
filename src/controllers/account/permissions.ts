import * as Res from "../../services/response";
import * as log from "signale";
import TokenAuth from "../../utils/authentification/tokenAuth";
import { SQLManager } from "../../managers/SQLManager";

namespace Permissions {

	export async function getAccountPermissions(req: any, res: any) {

		const perms = await TokenAuth.checkPerms(req, ["CRAFTBOX:ADMIN", "CRAFTBOX:PERMISSIONS"]);
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
}

export default Permissions;
