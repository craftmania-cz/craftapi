import * as Res from "../../services/response";
import * as log from "signale";
import { getConnection } from "../../services/mysql-connection";

const con = getConnection();

namespace Economy {

	export async function getEconomyLog(_req: any, res: any) {
		await con.query('SELECT * FROM player_changelog ORDER BY time DESC LIMIT 100;',
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
			});
		return;
	}

}

export default Economy;
