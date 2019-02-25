import { getConnection } from '../../services/mysql-connection';
import * as Res from "../../services/response";
import * as log from 'signale';
import { resolveBoolean } from "../../utils/VariableUtils";

const con = getConnection();

namespace Ccomunity {

	const prepareProfileObject = (playerObject: ccomunity_profile) => {
		return {
			"id": playerObject.id,
			"discriminator": playerObject.discriminator,
			"nick": playerObject.nick,
			"uuid": playerObject.uuid,
			"web_group": playerObject.web_group,
			"registred": playerObject.registred,
			"last_online": playerObject.last_online,
			"last_server": playerObject.last_server,
			"is_online": resolveBoolean(playerObject.is_online),
			"played_time": playerObject.played_time,
			"mc_version": playerObject.mc_version,
			"economy": {
				"craftcoins": playerObject.craftcoins,
				"crafttokens": playerObject.crafttokens,
				"votetokens": playerObject.votetokens,
				"karma": null,
				"achievment_points": null,
			},
			"ranked": {
				"level": playerObject.level,
				"experience": playerObject.experience,
				"total_experience": null,
			},
			"votes": {
				"total": playerObject.total_votes,
				"month": playerObject.month_votes,
				"week": playerObject.week_votes,
				"last_vote": playerObject.last_vote
			},
			"social": {
				"facebook": playerObject.soc_facebook,
				"twitter": playerObject.soc_twitter,
				"twitch": playerObject.soc_twitch,
				"steam": playerObject.soc_steam,
				"youtube": playerObject.soc_ytb,
				"web": playerObject.soc_web
			}
		}
	};

	export async function getProfileByName(req: any, res: any) {

		const player = req.params.name;

		await con.query('SELECT * FROM player_profile WHERE nick = ?;', [player], (error: any, results: any) => {
			if (error) {
				log.error(error);
				return Res.error(res, error);
			}
			if (!results.length) {
				return Res.not_found(res);
			}
			let dataObject = results[0] as ccomunity_profile;
			Res.success(res, prepareProfileObject(dataObject));
		});
		return;
	}

	export async function getProfileByUUID(req: any, res: any) {

		const uuid = req.params.uuid;

		await con.query('SELECT * FROM player_profile WHERE uuid = ?;', [uuid], (error: any, results: any) => {
			if (error) {
				log.error(error);
				return Res.error(res, error);
			}
			if (!results.length) {
				return Res.not_found(res);
			}
			let dataObject = results[0] as ccomunity_profile;
			Res.success(res, prepareProfileObject(dataObject));
		});
		return;
	}
}

export = Ccomunity;
