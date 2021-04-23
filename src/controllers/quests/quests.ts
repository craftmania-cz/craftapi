import * as Res from "../../services/response";
import * as log from "signale";
import { SQLManager } from "../../managers/SQLManager";

namespace Quests {

	export async function getQuestLog(_req: any, res: any) {
		const data = await SQLManager.knex.select("*")
			.from("minigames.player_achievement_log").orderBy("date", "DESC").limit(100)
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
				"quest_id": null,
				"quest_name": data.ach_name,
				"quest_value": data.ach_value,
				"server": data.ach_server,
				"date": data.date
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}
}

export default Quests;
