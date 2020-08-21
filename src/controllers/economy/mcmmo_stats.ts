import * as log from "signale";
import * as Res from "../../services/response";
import { SQLManager } from "../../managers/SQLManager";

namespace Mcmmo_stats {

	export async function getTop50Swords(_req: any, res: any) {
		const data = await SQLManager.knex.raw('SELECT ms.swords, mu.user, mu.uuid FROM survival.mcmmo_skills ms INNER JOIN survival.mcmmo_users mu ON mu.id = ms.user_id ORDER BY ms.swords DESC LIMIT 50;')
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": data.user,
				"uuid": data.uuid,
				"value": data.swords
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTop50Taming(_req: any, res: any) {
		const data = await SQLManager.knex.raw('SELECT ms.taming, mu.user, mu.uuid FROM survival.mcmmo_skills ms INNER JOIN survival.mcmmo_users mu ON mu.id = ms.user_id ORDER BY ms.taming DESC LIMIT 50;')
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": data.user,
				"uuid": data.uuid,
				"value": data.taming
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTop50Mining(_req: any, res: any) {
		const data = await SQLManager.knex.raw('SELECT ms.mining, mu.user, mu.uuid FROM survival.mcmmo_skills ms INNER JOIN survival.mcmmo_users mu ON mu.id = ms.user_id ORDER BY ms.mining DESC LIMIT 50;')
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": data.user,
				"uuid": data.uuid,
				"value": data.mining
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTop50Woodcutting(_req: any, res: any) {
		const data = await SQLManager.knex.raw('SELECT ms.woodcutting, mu.user, mu.uuid FROM survival.mcmmo_skills ms INNER JOIN survival.mcmmo_users mu ON mu.id = ms.user_id ORDER BY ms.woodcutting DESC LIMIT 50;')
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": data.user,
				"uuid": data.uuid,
				"value": data.woodcutting
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTop50Repair(_req: any, res: any) {
		const data = await SQLManager.knex.raw('SELECT ms.repair, mu.user, mu.uuid FROM survival.mcmmo_skills ms INNER JOIN survival.mcmmo_users mu ON mu.id = ms.user_id ORDER BY ms.repair DESC LIMIT 50;')
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": data.user,
				"uuid": data.uuid,
				"value": data.repair
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTop50Unarmed(_req: any, res: any) {
		const data = await SQLManager.knex.raw('SELECT ms.unarmed, mu.user, mu.uuid FROM survival.mcmmo_skills ms INNER JOIN survival.mcmmo_users mu ON mu.id = ms.user_id ORDER BY ms.unarmed DESC LIMIT 50;')
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": data.user,
				"uuid": data.uuid,
				"value": data.unarmed
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTop50Herbalism(_req: any, res: any) {
		const data = await SQLManager.knex.raw('SELECT ms.herbalism, mu.user, mu.uuid FROM survival.mcmmo_skills ms INNER JOIN survival.mcmmo_users mu ON mu.id = ms.user_id ORDER BY ms.herbalism DESC LIMIT 50;')
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": data.user,
				"uuid": data.uuid,
				"value": data.herbalism
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTop50Excavation(_req: any, res: any) {
		const data = await SQLManager.knex.raw('SELECT ms.excavation, mu.user, mu.uuid FROM survival.mcmmo_skills ms INNER JOIN survival.mcmmo_users mu ON mu.id = ms.user_id ORDER BY ms.excavation DESC LIMIT 50;')
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": data.user,
				"uuid": data.uuid,
				"value": data.excavation
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTop50Archery(_req: any, res: any) {
		const data = await SQLManager.knex.raw('SELECT ms.archery, mu.user, mu.uuid FROM survival.mcmmo_skills ms INNER JOIN survival.mcmmo_users mu ON mu.id = ms.user_id ORDER BY ms.archery DESC LIMIT 50;')
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": data.user,
				"uuid": data.uuid,
				"value": data.archery
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTop50Axes(_req: any, res: any) {
		const data = await SQLManager.knex.raw('SELECT ms.axes, mu.user, mu.uuid FROM survival.mcmmo_skills ms INNER JOIN survival.mcmmo_users mu ON mu.id = ms.user_id ORDER BY ms.axes DESC LIMIT 50;')
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": data.user,
				"uuid": data.uuid,
				"value": data.axes
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTop50Acrobatics(_req: any, res: any) {
		const data = await SQLManager.knex.raw('SELECT ms.acrobatics, mu.user, mu.uuid FROM survival.mcmmo_skills ms INNER JOIN survival.mcmmo_users mu ON mu.id = ms.user_id ORDER BY ms.acrobatics DESC LIMIT 50;')
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": data.user,
				"uuid": data.uuid,
				"value": data.acrobatics
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTop50Fishing(_req: any, res: any) {
		const data = await SQLManager.knex.raw('SELECT ms.fishing, mu.user, mu.uuid FROM survival.mcmmo_skills ms INNER JOIN survival.mcmmo_users mu ON mu.id = ms.user_id ORDER BY ms.fishing DESC LIMIT 50;')
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": data.user,
				"uuid": data.uuid,
				"value": data.fishing
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTop50Alchemy(_req: any, res: any) {
		const data = await SQLManager.knex.raw('SELECT ms.alchemy, mu.user, mu.uuid FROM survival.mcmmo_skills ms INNER JOIN survival.mcmmo_users mu ON mu.id = ms.user_id ORDER BY ms.alchemy DESC LIMIT 50;')
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": data.user,
				"uuid": data.uuid,
				"value": data.alchemy
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTop50Total(_req: any, res: any) {
		const data = await SQLManager.knex.raw('SELECT ms.total, mu.user, mu.uuid FROM survival.mcmmo_skills ms INNER JOIN survival.mcmmo_users mu ON mu.id = ms.user_id ORDER BY ms.total DESC LIMIT 50;')
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": data.user,
				"uuid": data.uuid,
				"value": data.total
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

}

export default Mcmmo_stats;
