import * as Res from "../../services/response";
import * as log from "signale";
import LevelUtils from "../../utils/LevelUtils";
import EconomyLevelPlayer from "../../utils/interfaces/EconomyLevelPlayer";
import { SQLManager } from "../../managers/SQLManager";

namespace EconomyTopLevels {

	const calcPercentage = (first: number, second: number) => {
		return first / (second / 100);
	};

	export async function getTopGlobalLevels(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "global_level", "groups")
			.from("player_profile").orderBy("global_level", "DESC").limit(50)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((player: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"level": player.global_level,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTopCreativeLevels(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "creative_level", "creative_experience", "groups")
			.from("player_profile").orderBy("creative_level", "DESC").orderBy("creative_experience", "DESC").limit(50)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((player: EconomyLevelPlayer, index: number) => {
			index++;
			const levelPercentage = calcPercentage(player.creative_experience, LevelUtils.getExpFromLevelToNext(player.creative_level));
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"level": player.creative_level,
				"experience": player.creative_experience,
				"toNextLevel": LevelUtils.getExpFromLevelToNext(player.creative_level),
				"percentage": levelPercentage,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTopSurvivalLevels(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "survival_level", "survival_experience", "groups")
			.from("player_profile").orderBy("survival_level", "DESC").orderBy("survival_experience", "DESC").limit(50)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((player: EconomyLevelPlayer, index: number) => {
			index++;
			const levelPercentage = calcPercentage(player.survival_experience, LevelUtils.getExpFromLevelToNext(player.survival_level));
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"level": player.survival_level,
				"experience": player.survival_experience,
				"toNextLevel": LevelUtils.getExpFromLevelToNext(player.survival_level),
				"percentage": levelPercentage,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
	}

	export async function getTopSkyblockLevels(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "skyblock_level", "skyblock_experience", "groups")
			.from("player_profile").orderBy("skyblock_level", "DESC").orderBy("skyblock_experience", "DESC").limit(50)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((player: EconomyLevelPlayer, index: number) => {
			index++;
			const levelPercentage = calcPercentage(player.skyblock_experience, LevelUtils.getExpFromLevelToNext(player.skyblock_level));
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"level": player.skyblock_level,
				"experience": player.skyblock_experience,
				"toNextLevel": LevelUtils.getExpFromLevelToNext(player.skyblock_level),
				"percentage": levelPercentage,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTopVanillaLevels(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "vanilla_level", "vanilla_experience", "groups")
			.from("player_profile").orderBy("vanilla_level", "DESC").orderBy("vanilla_experience", "DESC").limit(50)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((player: EconomyLevelPlayer, index: number) => {
			index++;
			const levelPercentage = calcPercentage(player.vanilla_experience, LevelUtils.getExpFromLevelToNext(player.vanilla_level));
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"level": player.vanilla_level,
				"experience": player.vanilla_experience,
				"toNextLevel": LevelUtils.getExpFromLevelToNext(player.vanilla_level),
				"percentage": levelPercentage,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
	}

	export async function getTopSkycloudLevels(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "skycloud_level", "skycloud_experience", "groups")
			.from("player_profile").orderBy("skycloud_level", "DESC").orderBy("skycloud_experience", "DESC").limit(50)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((player: EconomyLevelPlayer, index: number) => {
			index++;
			const levelPercentage = calcPercentage(player.skycloud_experience, LevelUtils.getExpFromLevelToNext(player.skycloud_level));
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"level": player.skycloud_level,
				"experience": player.skycloud_experience,
				"toNextLevel": LevelUtils.getExpFromLevelToNext(player.skycloud_level),
				"percentage": levelPercentage,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTopHardcoreVanillaLevels(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "hardcore_vanilla_level", "hardcore_vanilla_experience", "groups")
			.from("player_profile").orderBy("hardcore_vanilla_level", "DESC").orderBy("hardcore_vanilla_experience", "DESC").limit(50)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((player: EconomyLevelPlayer, index: number) => {
			index++;
			const levelPercentage = calcPercentage(player.hardcore_vanilla_experience,
				LevelUtils.getExpFromLevelToNext(player.hardcore_vanilla_level));
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"level": player.hardcore_vanilla_level,
				"experience": player.hardcore_vanilla_experience,
				"toNextLevel": LevelUtils.getExpFromLevelToNext(player.hardcore_vanilla_level),
				"percentage": levelPercentage,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTopPrisonLevels(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "prison_level", "prison_experience", "groups")
			.from("player_profile").orderBy("prison_level", "DESC").orderBy("prison_experience", "DESC").limit(50)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((player: EconomyLevelPlayer, index: number) => {
			index++;
			const levelPercentage = calcPercentage(player.prison_experience,
				LevelUtils.getExpFromLevelToNext(player.prison_level));
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"level": player.prison_level,
				"experience": player.prison_experience,
				"toNextLevel": LevelUtils.getExpFromLevelToNext(player.prison_level),
				"percentage": levelPercentage,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

}

export default EconomyTopLevels;
