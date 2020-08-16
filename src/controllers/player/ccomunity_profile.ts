import * as Res from "../../services/response";
import * as log from 'signale';
import { resolveBoolean } from "../../utils/VariableUtils";
import { SQLManager } from "../../managers/SQLManager";

namespace Ccomunity {

	const prepareProfileObject = (playerObject: CcomunityProfile) => {
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
				"votetokens": playerObject.votetokens_2,
				"karma": playerObject.karma,
				"achievement_points": playerObject.achievement_points,
				"event_points": playerObject.event_points,
				"bug_points": playerObject.bug_points
			},
			"groups": {
				"vip": JSON.parse(playerObject.groups),
				"last_update": playerObject.groups_last_check
			},
			"ranked": {
				"global_level": playerObject.global_level,
				"survival_level": playerObject.survival_level,
				"survival_experience": playerObject.survival_experience,
				"skyblock_level": playerObject.skyblock_level,
				"skyblock_experience": playerObject.skyblock_experience,
				"creative_level": playerObject.creative_level,
				"creative_experience": playerObject.creative_experience,
				"vanilla_level": playerObject.vanilla_level,
				"vanilla_experience": playerObject.vanilla_experience,
				"prison_level": playerObject.prison_level,
				"prison_experience": playerObject.prison_experience,
				"skycloud_level": playerObject.skycloud_level,
				"skycloud_experience": playerObject.skycloud_experience,
				"hardcore_vanilla_level": playerObject.hardcore_vanilla_level,
				"hardcore_vanilla_experience": playerObject.hardcore_vanilla_experience
			},
			"votes": {
				"total": playerObject.total_votes,
				"month": playerObject.month_votes,
				"week": playerObject.week_votes,
				"last_vote": playerObject.last_vote
			},
			"social": {
				"status": playerObject.status,
				"facebook": playerObject.soc_facebook,
				"twitter": playerObject.soc_twitter,
				"twitch": playerObject.soc_twitch,
				"steam": playerObject.soc_steam,
				"youtube": playerObject.soc_ytb,
				"web": playerObject.soc_web
			},
			"discord": {
				"id": playerObject.discord_user_id
			},
			"tags": JSON.parse(playerObject.tags),
			"lobby": {
				"daily_basic_reward": resolveBoolean(playerObject.lobby_daily_bonus),
				"monthly_vip_reward": resolveBoolean(playerObject.lobby_vip_bonus),
				"seen_latest_news": playerObject.seen_latest_news,
				"seen_changelog_time": playerObject.seen_changelog_time
			},
			"deprecated": {
				"votetokens": playerObject.votetokens,
				"level": playerObject.level,
				"experience": playerObject.experience
			}
		};
	};

	export async function getProfileByName(req: any, res: any) {
		const player = req.params.name;
		const data = await SQLManager.knex.select("*").from("player_profile").where("nick", player)
			.on('query-error', (error: any) => {
			log.error(error);
			return Res.error(res, error);
		});
		if (data.length <= 0) {
			return Res.not_found(res);
		}
		const profileData = data[0] as unknown as CcomunityProfile;
		Res.success(res, prepareProfileObject(profileData));
		return;
	}

	export async function getProfileByUUID(req: any, res: any) {
		const uuid = req.params.uuid;
		const data = await SQLManager.knex.select("*").from("player_profile").where("uuid", uuid)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (data.length <= 0) {
			return Res.not_found(res);
		}
		const profileData = data[0] as unknown as CcomunityProfile;
		Res.success(res, prepareProfileObject(profileData));
		return;
	}
}

export = Ccomunity;
