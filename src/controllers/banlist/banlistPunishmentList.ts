import * as Res from "../../services/response";
import { SQLManager } from "../../managers/SQLManager";
import * as log from "signale";
import { convertStringToNumber, resolveBoolean } from "../../utils/VariableUtils";
import { IBanlistLog, IPaginateObject } from "./IBanlistLog";

namespace Banlist {

	const punishmentType: string[] = ['bans', 'mutes', 'kicks', 'warnings'];

	const remapBanlistObject = (sqlObject: IBanlistLog) => {
		return {
			id: sqlObject.id,
			uuid: sqlObject.uuid,
			name: sqlObject.name,
			reason: sqlObject.reason,
			ipban: resolveBoolean(sqlObject.ipban),
			time: sqlObject.time,
			until: sqlObject.until,
			active: resolveBoolean(sqlObject.active),
			punisher: {
				name: sqlObject.banned_by_name,
				uuid: sqlObject.banned_by_uuid,
			},
			removed: {
				name: sqlObject.removed_by_name,
				date: sqlObject.removed_by_date,
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
			.paginate({perPage: 40, currentPage: pageNumber, isLengthAware: true})
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
