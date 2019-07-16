import { getConnection } from '../../services/mysql-connection';
import * as Res from "../../services/response";
import * as log from 'signale';

const con = getConnection();

namespace CcomunityAllPlayers {

	let cache: any = null;

	export async function getAllPlayersWithLevel(_req: any, res: any) {
		if (cache == null) {
			console.log('New querry');
			await con.query('SELECT id, nick, global_level FROM player_profile;', (error: any, results: any) => {
				if (error) {
					log.error(error);
					return Res.error(res, error);
				}
				if (!results.length) {
					return Res.not_found(res);
				}
				cache = results;
				Res.success(res, results);
			});
			setTimeout(() => { // Reset cache kazdych 12h
				cache = null;
			}, 43200000);
		} else {
			console.log('From cache');
			Res.success(res, cache);
		}

	}
}

export = CcomunityAllPlayers;
