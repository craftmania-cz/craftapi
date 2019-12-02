import * as Res from "../../services/response";
import { getConnection } from '../../services/mysql-connection';
import * as log from 'signale';

const con = getConnection();

namespace UniquePlayers {

	export async function getAmount(_req: any, res: any) {
		await con.query('SELECT COUNT(*) AS total FROM player_profile;', (error: any, results: any) => {
			if (error) {
				log.error(error);
				return Res.error(res, error);
			}
			if (!results.length) {
				return Res.not_found(res);
			}
			let dataObject = results[0];

			/*
				Tato hodnota je schválně fake, z důvodu že za dobu pěti let, server prošel různými wipy, změnami v ukládání dat
				a jiných změn, co celkově ovlivnili výsledek. Tato fake hodnota, je tedy součet všech starých registrací z
				AuthMe + AutoLogin v období let 2013 - 2019 (listopad).
			 */
			let fakeAmount = 1117223;

			// Finální výsledek
			Res.success(res, {"amount": dataObject.total + fakeAmount});
		});
		return;
	}
}

export = UniquePlayers;
