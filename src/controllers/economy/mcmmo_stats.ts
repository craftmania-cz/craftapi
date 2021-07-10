import * as log from "signale";
import * as Res from "../../services/response";
import { SQLManager } from "../../managers/SQLManager";

namespace Mcmmo_stats {

	export async function getMcMMOStatistics(req: any, res: any) {

		const serverType: string = req.params.server;
		const abilityType: string = req.params.abilityType;

		if (serverType === null) {
			Res.property_required(res, "Missing server type in URL.");
			return;
		}

		if (abilityType === null) {
			Res.property_required(res, "Missing McMMO ability type in URL.");
			return;
		}

		const data = await SQLManager.knex.raw('SELECT ms.' + abilityType + ' AS value, mu.user, mu.uuid FROM ' + serverType + '.mcmmo_skills ms INNER JOIN ' + serverType + '.mcmmo_users mu ON mu.id = ms.user_id ORDER BY value DESC LIMIT 50;')
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data[0].forEach((data: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": data.user,
				"uuid": data.uuid,
				"value": data.value
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}
}

export default Mcmmo_stats;
