import * as Res from "../../services/response";
import * as log from 'signale';
import { SQLManager } from "../../managers/SQLManager";

namespace UniquePlayers {

	export async function getAmount(_req: any, res: any) {
		const data = await SQLManager.knex.raw('SELECT COUNT(*) AS total FROM player_profile;')
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let dataObject = data[0][0];

		/*
			Tato hodnota je schválně fake, z důvodu že za dobu pěti let, server prošel různými wipy, změnami v ukládání dat
			a jiných změn, co celkově ovlivnili výsledek. Tato fake hodnota, je tedy součet všech starých registrací z
			AuthMe + AutoLogin v období let 2013 - 2019 (listopad).
		*/
		let fakeAmount = 1117223;

		// Finální výsledek
		Res.success(res, {"amount": dataObject.total + fakeAmount});
		return;
	}
}

export = UniquePlayers;
