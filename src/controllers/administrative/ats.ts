import * as Res from "../../services/response";
import * as log from "signale";
import { SQLManager } from "../../managers/SQLManager";
import { resolveBoolean } from "../../utils/VariableUtils";
import TokenAuth from "../../utils/authentification/tokenAuth";
import { AccessControl } from "accesscontrol";
import Grants from "../../utils/authentification/Grants";

const ac = new AccessControl(new Grants().getGrants);

namespace Ats {

	export async function getList(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid", "rank").from("minigames.at_table")
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any) => {
			finalResults.push({
				"nick": data.nick,
				"uuid": data.uuid,
				"rank": data.rank
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getMember(req: any, res: any) {
		const role = await TokenAuth.getRoleFromToken(req);
		const permission = ac.can(role).read('ats');
		if (!permission.granted) {
			return Res.noPerms(res);
		}

		const paramMember = req.params.id;

		const data = await SQLManager.knex.select("*").from("minigames.at_table").where("nick", paramMember)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		const atsMember = data[0];
		const finalObject = {
			nick: atsMember.nick,
			uuid: atsMember.uuid,
			rank: atsMember.rank,
			buildAccess: resolveBoolean(atsMember.pristup_build),
			minHours: atsMember.min_hours,
			total: {
				chatPoints: atsMember.surv_chat_body + atsMember.sky_chat_body + atsMember.crea_chat_body
					+ atsMember.vanilla_chat_body + atsMember.prison_chat_body + atsMember.skycloud_chat_body
					+ atsMember.hardcore_vanilla_chat_body + atsMember.minigames_chat_body,
				activeTime: atsMember.surv_played_time + atsMember.sky_played_time + atsMember.crea_played_time
					+ atsMember.vanilla_played_time + atsMember.prison_played_time + atsMember.skycloud_played_time
					+ atsMember.hardcore_vanilla_played_time + atsMember.build_played_time + atsMember.minigames_played_time
					+ atsMember.events_played_time
			},
			servers: {
				survival: {
					chatPoints: atsMember.surv_chat_body,
					lastActivity: atsMember.surv_pos_aktivita,
					activeTime: atsMember.surv_played_time
				},
				skyblock: {
					chatPoints: atsMember.sky_chat_body,
					lastActivity: atsMember.sky_pos_aktivita,
					activeTime: atsMember.sky_played_time
				},
				creative: {
					chatPoints: atsMember.crea_chat_body,
					lastActivity: atsMember.crea_pos_aktivita,
					activeTime: atsMember.crea_played_time,
				},
				vanilla: {
					chatPoints: atsMember.vanilla_chat_body,
					lastActivity: atsMember.vanilla_pos_aktivita,
					activeTime: atsMember.vanilla_played_time
				},
				prison: {
					chatPoints: atsMember.prison_chat_body,
					lastActivity: atsMember.prison_pos_aktivita,
					activeTime: atsMember.prison_played_time
				},
				skycloud: {
					chatPoints: atsMember.skycloud_chat_body,
					lastActivity: atsMember.skycloud_pos_aktivita,
					activeTime: atsMember.skycloud_played_time
				},
				hardcoreVanilla: {
					chatPoints: atsMember.hardcore_vanilla_chat_body,
					lastActivity: atsMember.hardcore_vanilla_pos_aktivita,
					activeTime: atsMember.hardcore_vanilla_played_time
				},
				build: {
					lastActivity: atsMember.build_pos_aktivita,
					activeTime: atsMember.build_played_time
				},
				minigames: {
					chatPoints: atsMember.minigames_chat_body,
					lastActivity: atsMember.minigames_pos_aktivita,
					activeTime: atsMember.minigames_played_time
				},
				eventServer: {
					lastActivity: atsMember.events_pos_aktivita,
					activeTime: atsMember.events_played_time
				}
			}
		};
		Res.success(res, finalObject);
		return;
	}

	export async function postNewMember(req: any, res: any) {
		const role = await TokenAuth.getRoleFromToken(req);
		const permission = ac.can(role).create('ats');
		if (!permission.granted) {
			return Res.noPerms(res);
		}

		const nick = req.body.nick;
		const uuid = req.body.uuid;

		// Optionals
		const rank = req.body.rank;
		const minHours = req.body.minHours;
		const resolveRank = rank !== null ? rank : 2;
		const resolveMinHours = minHours !== null ? minHours : 30;

		if (nick && uuid) {
			const data = await SQLManager.knex.insert([{nick: nick, uuid: uuid, rank: resolveRank, min_hours: resolveMinHours}]).into("minigames.at_table")
				.on('query-error', (error: any) => {
					log.error(error);
					return Res.error(res, error);
				});
			if (data.length <= 0) {
				return Res.bad_request(res, "Insert do DB selhal");
			}
			Res.success(res, data[0]);
			return;
		} else {
			return Res.bad_request(res, "Neplatně zadané argumenty player nebo uuid!");
		}
	}

	export async function editMemberByNick(req: any, res: any) {
		const role = await TokenAuth.getRoleFromToken(req);
		const permission = ac.can(role).update('ats');
		if (!permission.granted) {
			return Res.noPerms(res);
		}

		const nick = req.params.id;
		if (!isNaN(nick)) {
			return Res.bad_request(res, "ID musí být jméno člena AT!");
		}

		const newNick = req.body.newNick;
		const uuid = req.body.uuid;
		const rank = req.body.rank;
		const minHours = req.body.minHours;
		const buildAccess = req.body.buildAccess;
		const boxPerms = req.body.boxPerms;

		let finalObject: any = {};
		if (newNick !== null) {
			finalObject.nick = newNick;
		}
		if (uuid !== null) {
			finalObject.uuid = uuid;
		}
		if (rank !== null) {
			finalObject.rank = rank;
		}
		if (minHours !== null) {
			finalObject.min_hours = minHours;
		}
		if (buildAccess !== null) {
			finalObject.pristup_build = buildAccess;
		}
		if (boxPerms !== null) {
			finalObject.craftbox_perms = JSON.stringify(boxPerms);
		}

		if (nick) {
			const data = await SQLManager.knex("minigames.at_table").update(finalObject).where("nick", nick)
				.on('query-error', (error: any) => {
					log.error(error);
					return Res.error(res, error);
				});
			if (data <= 0) {
				return Res.bad_request(res, "Update v DB selhal!");
			}
			Res.success(res, data);
			return;
		} else {
			return Res.bad_request(res, "Neplatně zadané argumenty nick, uuid nebo rank!");
		}

	}

	export async function deleteMember(req: any, res: any) {
		const role = await TokenAuth.getRoleFromToken(req);
		const permission = ac.can(role).delete('ats');
		if (!permission.granted) {
			return Res.noPerms(res);
		}

		const nick = req.params.id;
		if (!isNaN(nick)) {
			return Res.bad_request(res, "ID musí být jméno člena AT!");
		}

		const data = await SQLManager.knex("minigames.at_table").where("nick", nick).del()
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (data <= 0) {
			return Res.errorWithText(res, "Vybrané ID se v databázi nenachází!");
		}
		Res.success(res, data);
		return;
	}
}

export default Ats;
