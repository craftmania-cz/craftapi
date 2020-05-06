import * as Res from "../../services/response";
import * as log from "signale";
import { getConnection } from "../../services/mysql-connection";

const con = getConnection();

namespace Permissions {

	export async function getAccountPermissions(req: any, res: any) {
		const player = req.params.name;

		await con.query('SELECT craftbox_perms FROM minigames.at_table WHERE nick = ?;', [player], (error: any, results: any) => {
			if (error) {
				log.error(error);
				return Res.error(res, error);
			}
			if (!results.length) {
				return Res.not_found(res);
			}
			Res.success(res, JSON.parse(results[0].craftbox_perms));
		});
		return;
	}
}

export default Permissions;
