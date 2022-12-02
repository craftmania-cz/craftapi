import * as Res from "../../services/response";
import { SQLManager } from "../../managers/SQLManager";
import * as log from "signale";
import { convertStringToNumber, resolveBoolean } from "../../utils/VariableUtils";
import { IBanlistLog, IPaginateObject } from "./IBanlistLog";
import * as dayjs from 'dayjs';

const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

namespace Banlist {

	const punishmentType: string[] = ['bans', 'mutes', 'kicks', 'warnings'];

	const parseRemovedDate = (removedDate: any) => {
		if (removedDate === null) {
			return null;
		}
		if (removedDate === "#expired") {
			return "#expired";
		}
		return dayjs(removedDate, "YYYY-MM-DD HH:mm:ss"); // 2021-04-18 11:34:42
	};

	const remapBanlistObject = (sqlObject: IBanlistLog) => {
		return {
			id: sqlObject.id,
			type: sqlObject.type,
			uuid: sqlObject.uuid,
			name: sqlObject.name,
			reason: sqlObject.reason,
			ipban: resolveBoolean(sqlObject.ipban),
			time: dayjs(sqlObject.time).toISOString(),
			until: sqlObject.until === -1 ? null : dayjs(sqlObject.until).toISOString(),
			active: resolveBoolean(sqlObject.active),
			punisher: {
				name: sqlObject.banned_by_name,
				uuid: sqlObject.banned_by_uuid,
			},
			removed: {
				name: sqlObject.removed_by_name,
				date: parseRemovedDate(sqlObject.removed_by_date),
			}
		};
	};

	/**
	 * Path - /list/:type/:page
	 * @param req
	 * @param res
	 */
	export async function getGlobalList(req: any, res: any) {

		const type = req.params.type;
		if (!type) {
			Res.property_required(res, "type");
			return;
		}
		if (!punishmentType.includes(type)) {
			Res.errorWithText(res, "punishment type is not supported type.");
			return;
		}

		let pageNumber = req.params.page;
		if (!pageNumber) {
			pageNumber = 1;
		}

		if (!isPageNumber(pageNumber)) {
			pageNumber = 1;
		}

		const data = await SQLManager.knex.from(`bungeecord.litebans_${type} as punishment`)
			.innerJoin('bungeecord.litebans_history as history', 'punishment.uuid', '=', 'history.uuid')
			.select(getSelectFields(type))
			.orderBy('punishment.id', 'desc')
			.paginate({ perPage: 40, currentPage: pageNumber, isLengthAware: true })
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});

		if (!data.data.length) {
			return Res.not_found(res);
		}

		let returnArray = [];
		for (let i = 0; i < data.data.length; i++) {
			const objectData = data.data[i] as unknown as IBanlistLog;
			returnArray.push(remapBanlistObject(objectData));
		}

		const pageObject: IPaginateObject = {
			totalItems: data.pagination.total,
			lastPage: data.pagination.lastPage,
			currentPage: convertStringToNumber(data.pagination.currentPage),
			fromItem: data.pagination.from,
			toItem: data.pagination.to,
		};

		Res.successPaginated(res, pageObject, returnArray);
	}

	export async function getPlayerLookup(req: any, res: any) {
		const playerName = req.params.nick;
		if (!playerName) {
			Res.property_required(res, "nick");
			return;
		}

		let pageNumber = req.params.page;
		if (!pageNumber) {
			pageNumber = 1;
		}

		if (!isPageNumber(pageNumber)) {
			pageNumber = 1;
		}

		// NEJVÍC BULLSHIT REQUEST EVER :D
		// @ts-ignore
		const data = await SQLManager.knex.select('a.*').fromRaw('(SELECT \'ban\' AS type,id,uuid,banned_by_name,banned_by_uuid,removed_by_name,removed_by_date,removed_by_uuid,reason,time,until FROM bungeecord.litebans_bans UNION SELECT \'kick\' AS type,id,uuid,banned_by_name,banned_by_uuid,reason,null,null,null,time,until FROM bungeecord.litebans_kicks UNION SELECT \'mute\' AS type,id,uuid,banned_by_name,banned_by_uuid,removed_by_name,removed_by_date,removed_by_uuid,reason,time,until FROM bungeecord.litebans_mutes UNION SELECT \'warn\' AS type,id,uuid,banned_by_name,banned_by_uuid,reason,null,null,null,time,until FROM bungeecord.litebans_warnings) AS a')
			.join('bungeecord.litebans_history', 'bungeecord.litebans_history.uuid', '=', 'a.uuid')
			.where('bungeecord.litebans_history.name', '=', playerName)
			.orderBy('a.time', 'desc')
			.paginate({ perPage: 50, currentPage: pageNumber, isLengthAware: true })
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});

		let returnArray = [];
		for (let i = 0; i < data.data.length; i++) {
			const objectData = data.data[i] as unknown as IBanlistLog;
			returnArray.push(remapBanlistObject(objectData));
		}

		const pageObject: IPaginateObject = {
			totalItems: data.pagination.total,
			lastPage: data.pagination.lastPage,
			currentPage: convertStringToNumber(data.pagination.currentPage),
			fromItem: data.pagination.from,
			toItem: data.pagination.to,
		};

		Res.successPaginated(res, pageObject, returnArray);
	}

	export async function getAtLookup(req: any, res: any) {
		const playerName = req.params.nick;
		if (!playerName) {
			Res.property_required(res, "nick");
			return;
		}

		let pageNumber = req.params.page;
		if (!pageNumber) {
			pageNumber = 1;
		}

		if (!isPageNumber(pageNumber)) {
			pageNumber = 1;
		}

		// NEJVÍC BULLSHIT REQUEST EVER :D
		// @ts-ignore
		const data = await SQLManager.knex.select('a.*').fromRaw('(SELECT \'ban\' AS type,id,uuid,banned_by_name,banned_by_uuid,removed_by_name,removed_by_date,removed_by_uuid,reason,time,until FROM bungeecord.litebans_bans UNION SELECT \'kick\' AS type,id,uuid,banned_by_name,banned_by_uuid,reason,null,null,null,time,until FROM bungeecord.litebans_kicks UNION SELECT \'mute\' AS type,id,uuid,banned_by_name,banned_by_uuid,removed_by_name,removed_by_date,removed_by_uuid,reason,time,until FROM bungeecord.litebans_mutes UNION SELECT \'warn\' AS type,id,uuid,banned_by_name,banned_by_uuid,reason,null,null,null,time,until FROM bungeecord.litebans_warnings) AS a')
			.join('bungeecord.litebans_history', 'bungeecord.litebans_history.uuid', '=', 'a.banned_by_uuid')
			.where('bungeecord.litebans_history.name', '=', playerName)
			.orderBy('a.time', 'desc')
			.paginate({ perPage: 50, currentPage: pageNumber, isLengthAware: true })
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});

		let returnArray = [];
		for (let i = 0; i < data.data.length; i++) {
			const objectData = data.data[i] as unknown as IBanlistLog;
			returnArray.push(remapBanlistObject(objectData));
		}

		const pageObject: IPaginateObject = {
			totalItems: data.pagination.total,
			lastPage: data.pagination.lastPage,
			currentPage: convertStringToNumber(data.pagination.currentPage),
			fromItem: data.pagination.from,
			toItem: data.pagination.to,
		};

		Res.successPaginated(res, pageObject, returnArray);
	}

	function getSelectFields(type: string): Array<string> {
		const selectFieldsArray = [
			'punishment.id',
			'punishment.uuid',
			'history.name',
			'punishment.reason',
			'punishment.banned_by_uuid',
			'punishment.banned_by_name',
			'punishment.ipban',
			'punishment.time',
			'punishment.until',
			'punishment.active'
		];
		if (type !== 'kicks') {
			selectFieldsArray.push(
				'punishment.removed_by_date',
				'punishment.removed_by_name',
				'punishment.removed_by_uuid'
			);
		}
		return selectFieldsArray;
	}

	function isPageNumber(keyToTest: any) {
		return /^[0-9]+$/.test(keyToTest);
	}
}

export default Banlist;
