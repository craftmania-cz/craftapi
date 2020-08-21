import * as Res from "../../services/response";
import * as log from "signale";
import { SQLManager } from "../../managers/SQLManager";

namespace AdminList {

	export async function getAdminList(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid", "rank").from("minigames.at_table")
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any) => {
			finalResults.push({
				"nick": data.nick,
				"uuid": data.uuid,
				"rank": data.rank
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}
}

export default AdminList;
