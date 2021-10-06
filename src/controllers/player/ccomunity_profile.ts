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
			"registred": playerObject.registred,
			"last_online": playerObject.last_online,
			"last_server": playerObject.last_server,
			"is_online": resolveBoolean(playerObject.is_online),
			"played_time": playerObject.played_time,
			"mc_version": playerObject.mc_version,
			"gender": playerObject.gender,
			"economy": {
				"craftcoins": playerObject.craftcoins,
				"crafttokens": playerObject.crafttokens,
				"votetokens": playerObject.votetokens_2,
				"karma": playerObject.karma,
				"quest_points": playerObject.achievement_points,
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
				"anarchy_level": playerObject.anarchy_level,
				"anarchy_experience": playerObject.anarchy_experience,
				"old_servers_level": playerObject.skycloud_level + playerObject.hardcore_vanilla_level,
				"old_servers_experience": playerObject.skycloud_experience + playerObject.hardcore_vanilla_experience
			},
			"votes": {
				"total": playerObject.total_votes,
				"month": playerObject.month_votes,
				"week": playerObject.week_votes,
				"last_vote": playerObject.last_vote,
				"vote_pass": playerObject.vote_pass
			},
			"social": {
				"status": playerObject.status
			},
			"discord": {
				"id": playerObject.discord_user_id,
				"voice_activity": +(playerObject.discord_voice_activity / 1000).toFixed(),
				"month_voice_activity": +(playerObject.month_discord_voice_activity / 1000).toFixed(),
				"text_activity": playerObject.discord_text_activity,
				"booster": resolveBoolean(playerObject.discord_booster)
			},
			"tags": JSON.parse(playerObject.tags),
			"lobby": {
				"seen_latest_news": playerObject.seen_latest_news,
				"seen_changelog_time": playerObject.seen_changelog_time,
				"bonus": {
					"streak": playerObject.lobby_bonus_streak,
					"claimed": {
						"daily": resolveBoolean(playerObject.lobby_bonus_claimed_daily),
						"playtime_1d": resolveBoolean(playerObject.lobby_bonus_claimed_playtime_1d),
						"playtime_7d": resolveBoolean(playerObject.lobby_bonus_claimed_playtime_7d),
						"playtime_14d": resolveBoolean(playerObject.lobby_bonus_claimed_playtime_14d),
						"playtime_30d": resolveBoolean(playerObject.lobby_bonus_claimed_playtime_30d),
						"playtime_halfyear": resolveBoolean(playerObject.lobby_bonus_claimed_playtime_halfyear),
						"monthly_vip": resolveBoolean(playerObject.lobby_bonus_claimed_monthly_vip),
						"extra": resolveBoolean(playerObject.lobby_bonus_claimed_extra),
						"discord_connect": resolveBoolean(playerObject.lobby_bonus_claimed_discord_connect),
						"discord_booster": resolveBoolean(playerObject.lobby_bonus_claimed_discord_booster),
						"discord_voice_actvity_1h": resolveBoolean(playerObject.lobby_bonus_claimed_discord_voice_actvity_1h),
						"discord_voice_actvity_10h": resolveBoolean(playerObject.lobby_bonus_claimed_discord_voice_actvity_10h),
						"discord_voice_actvity_24h": resolveBoolean(playerObject.lobby_bonus_claimed_discord_voice_actvity_24h),
					}
				}
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
