import * as Res from "../../services/response";
import * as log from "signale";
import { SQLManager } from "../../managers/SQLManager";

namespace Achievements {

	export async function getAchievementLog(_req: any, res: any) {
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
				"ach_id": null,
				"ach_name": data.ach_name,
				"ach_value": data.ach_value,
				"server": data.ach_server,
				"date": data.date
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}
}

export default Achievements;
