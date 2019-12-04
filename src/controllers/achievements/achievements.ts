import * as Res from "../../services/response";
import * as log from "signale";
import { getConnection } from "../../services/mysql-connection";

const con = getConnection();

namespace Achievements {

	export async function getAchievementLog(_req: any, res: any) {
		await con.query('SELECT * FROM player_achievement_log ORDER BY date DESC LIMIT 100;',
			(error: any, results: any) => {
				if (error) {
					log.error(error);
					return Res.error(res, error);
				}
				if (!results.length) {
					return Res.not_found(res);
				}
				let finalResults: any = [];
				results.forEach((data: any) => {
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
			});
		return;
	}
}

export default Achievements;
