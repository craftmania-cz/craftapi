import * as Res from "../../services/response";
import * as log from "signale";
import { getConnection } from "../../services/mysql-connection";
import LevelUtils from "../../utils/LevelUtils";

const con = getConnection();

namespace EconomyTopLevels {

	export async function getTopGlobalLevels(_req: any, res: any) {
		await con.query('SELECT nick, uuid, global_level FROM player_profile ORDER BY global_level DESC LIMIT 50;',
			(error: any, results: any) => {
			if (error) {
				log.error(error);
				return Res.error(res, error);
			}
			if (!results.length) {
				return Res.not_found(res);
			}
			let finalResults: any = [];
			results.forEach((player: any, index: number) => {
				index++;
				finalResults.push({
					"index": index,
					"nick": player.nick,
					"uuid": player.uuid,
					"level": player.global_level
				});
				return;
			});
			Res.success(res, finalResults);
		});
		return;
	}

	export async function getTopCreativeLevels(_req: any, res: any) {
		await con.query('SELECT nick, uuid, creative_level, creative_experience FROM player_profile ORDER BY creative_level DESC LIMIT 50;',
			(error: any, results: any) => {
			if (error) {
				log.error(error);
				return Res.error(res, error);
			}
			if (!results.length) {
				return Res.not_found(res);
			}
			let finalResults: any = [];
			results.forEach((player: any, index: number) => {
				index++;
				finalResults.push({
					"index": index,
					"nick": player.nick,
					"uuid": player.uuid,
					"level": player.creative_level,
					"experience": player.creative_experience,
					"toNextLevel": LevelUtils.getExpFromLevelToNext(player.creative_level++),
					"percentage": calcPercentage(player.creative_experience, LevelUtils.getExpFromLevelToNext(player.creative_level++))
				});
				return;
			});
			Res.success(res, finalResults);
		});
		return;
	}

	export async function getTopSurvivalLevels(_req: any, res: any) {
		await con.query('SELECT nick, uuid, survival_level, survival_experience FROM player_profile ORDER BY survival_level DESC LIMIT 50;',
			(error: any, results: any) => {
				if (error) {
					log.error(error);
					return Res.error(res, error);
				}
				if (!results.length) {
					return Res.not_found(res);
				}
				let finalResults: any = [];
				results.forEach((player: any, index: number) => {
					index++;
					finalResults.push({
						"index": index,
						"nick": player.nick,
						"uuid": player.uuid,
						"level": player.survival_level,
						"experience": player.survival_experience,
						"toNextLevel": LevelUtils.getExpFromLevelToNext(player.survival_level++),
						"percentage": calcPercentage(player.survival_experience, LevelUtils.getExpFromLevelToNext(player.survival_level++))
					});
					return;
				});
				Res.success(res, finalResults);
			});
		return;
	}

	export async function getTopSkyblockLevels(_req: any, res: any) {
		await con.query('SELECT nick, uuid, skyblock_level, skyblock_experience FROM player_profile ORDER BY skyblock_level DESC LIMIT 50;',
			(error: any, results: any) => {
				if (error) {
					log.error(error);
					return Res.error(res, error);
				}
				if (!results.length) {
					return Res.not_found(res);
				}
				let finalResults: any = [];
				results.forEach((player: any, index: number) => {
					index++;
					finalResults.push({
						"index": index,
						"nick": player.nick,
						"uuid": player.uuid,
						"level": player.skyblock_level,
						"experience": player.skyblock_experience,
						"toNextLevel": LevelUtils.getExpFromLevelToNext(player.skyblock_level++),
						"percentage": calcPercentage(player.skyblock_experience, LevelUtils.getExpFromLevelToNext(player.skyblock_level++))
					});
					return;
				});
				Res.success(res, finalResults);
			});
		return;
	}

	export async function getTopVanillaLevels(_req: any, res: any) {
		await con.query('SELECT nick, uuid, vanilla_level, vanilla_experience FROM player_profile ORDER BY vanilla_level DESC LIMIT 50;',
			(error: any, results: any) => {
				if (error) {
					log.error(error);
					return Res.error(res, error);
				}
				if (!results.length) {
					return Res.not_found(res);
				}
				let finalResults: any = [];
				results.forEach((player: any, index: number) => {
					index++;
					finalResults.push({
						"index": index,
						"nick": player.nick,
						"uuid": player.uuid,
						"level": player.vanilla_level,
						"experience": player.vanilla_experience,
						"toNextLevel": LevelUtils.getExpFromLevelToNext(player.vanilla_level++),
						"percentage": calcPercentage(player.vanilla_experience, LevelUtils.getExpFromLevelToNext(player.vanilla_level++))
					});
					return;
				});
				Res.success(res, finalResults);
			});
		return;
	}

	export async function getTopSkycloudLevels(_req: any, res: any) {
		await con.query('SELECT nick, uuid, skycloud_level, skycloud_experience FROM player_profile ORDER BY skycloud_level DESC LIMIT 50;',
			(error: any, results: any) => {
				if (error) {
					log.error(error);
					return Res.error(res, error);
				}
				if (!results.length) {
					return Res.not_found(res);
				}
				let finalResults: any = [];
				results.forEach((player: any, index: number) => {
					index++;
					finalResults.push({
						"index": index,
						"nick": player.nick,
						"uuid": player.uuid,
						"level": player.skycloud_level,
						"experience": player.skycloud_experience,
						"toNextLevel": LevelUtils.getExpFromLevelToNext(player.skycloud_level++),
						"percentage": calcPercentage(player.skycloud_experience, LevelUtils.getExpFromLevelToNext(player.skycloud_level++))
					});
					return;
				});
				Res.success(res, finalResults);
			});
		return;
	}

	const calcPercentage = (first: number, second: number) => {
		return first / (second / 100);
	};

}

export default EconomyTopLevels;
