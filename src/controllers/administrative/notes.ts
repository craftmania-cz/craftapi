import { SQLManager } from "../../managers/SQLManager";
import * as log from "signale";
import * as Res from "../../services/response";
import TokenAuth from "../../utils/authentification/tokenAuth";
import { AccessControl } from "accesscontrol";
import Grants from "../../utils/authentification/Grants";

const ac = new AccessControl(new Grants().getGrants);

namespace Notes {

	export async function getAllNotes(req: any, res: any) {
		const role = await TokenAuth.getRoleFromToken(req);
		const permission = ac.can(role).read('notes');
		if (!permission.granted) {
			return Res.noPerms(res);
		}

		const data = await SQLManager.knex.select("*").from("bungeecord.notes_data").orderBy("id", "DESC")
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (data.length <= 0) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any) => {
			finalResults.push({
				"id": data.id,
				"player": data.player,
				"note": data.note,
				"admin": data.admin,
				"date": new Date(data.date).getTime()
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getNoteById(req: any, res: any) {
		const role = await TokenAuth.getRoleFromToken(req);
		const permission = ac.can(role).read('notes');
		if (!permission.granted) {
			return Res.noPerms(res);
		}

		const paramIdOrPlayer = req.params.id;
		let data = null;

		if (isNaN(paramIdOrPlayer)) {
			// Select by name (string)
			data = await SQLManager.knex.select("*").from("bungeecord.notes_data").where("player", paramIdOrPlayer)
				.on('query-error', (error: any) => {
					log.error(error);
					return Res.error(res, error);
				});
		} else {
			// Select by ID
			data = await SQLManager.knex.select("*").from("bungeecord.notes_data").where("id", paramIdOrPlayer)
				.on('query-error', (error: any) => {
					log.error(error);
					return Res.error(res, error);
				});
		}

		if (data.length <= 0) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((data: any) => {
			finalResults.push({
				"id": data.id,
				"player": data.player,
				"note": data.note,
				"admin": data.admin,
				"date": new Date(data.date).getTime()
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function postNewNote(req: any, res: any) {
		const role = await TokenAuth.getRoleFromToken(req);
		const permission = ac.can(role).create('notes');
		if (!permission.granted) {
			return Res.noPerms(res);
		}

		const player = req.body.player;
		const note = req.body.note;
		const admin = req.body.admin;

		if (player && note && admin) {
			const data = await SQLManager.knex.insert([{player: player, note: note, admin: admin, date: new Date()}]).into("bungeecord.notes_data")
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
			return Res.bad_request(res, "Neplatně zadané argumenty player, note nebo admin!");
		}
	}

	export async function editNoteById(req: any, res: any) {
		const role = await TokenAuth.getRoleFromToken(req);
		const permission = ac.can(role).update('notes');
		if (!permission.granted) {
			return Res.noPerms(res);
		}

		const noteId = req.params.id;
		if (isNaN(noteId)) {
			return Res.bad_request(res, "ID musí být číslo!");
		}
		const player = req.body.player;
		const note = req.body.note;
		const admin = req.body.admin;
		if (player && note && admin) {
			const data = await SQLManager.knex("bungeecord.notes_data").update({player: player, note: note, admin: admin}).where("id", noteId)
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
			return Res.bad_request(res, "Neplatně zadané argumenty player, note nebo admin!");
		}

	}

	export async function deleteById(req: any, res: any) {
		const role = await TokenAuth.getRoleFromToken(req);
		const permission = ac.can(role).delete('notes');
		if (!permission.granted) {
			return Res.noPerms(res);
		}

		const noteId = req.params.id;

		if (isNaN(noteId)) {
			return Res.bad_request(res, "ID musí být číslo!");
		}

		const data = await SQLManager.knex("bungeecord.notes_data").where("id", noteId).del()
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

export default Notes;
