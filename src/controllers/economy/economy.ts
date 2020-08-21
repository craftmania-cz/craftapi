import * as Res from "../../services/response";
import * as log from "signale";
import { SQLManager } from "../../managers/SQLManager";

namespace Economy {

	export async function getEconomyLog(_req: any, res: any) {
		const data = await SQLManager.knex.select("*")
			.from("minigames.player_changelog").orderBy("time", "DESSC").limit(100)
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
				"action": data.action.toLocaleUpperCase(),
				"sender": data.sender,
				"server": data.server,
				"old_value": data.old_value,
				"new_value": data.new_value,
				"date": data.time
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

}

export default Economy;
